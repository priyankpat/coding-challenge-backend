import { Request, Response } from 'express';
import Sequelize from 'sequelize';
import { validate } from 'uuid';
import { cache } from '../connectors';
import { Event, Person } from '../models';
import { Weather } from '../services';
import { logger, validateDateBetweenTwoDates } from '../utils';
import addDays from '../utils/addDaysToDate';

const Op = Sequelize.Op;

const getPagination = (page: any, size: any) => {
	const limit = size ? +size : 5;
	const offset = page ? page * limit : 0;

	return { limit, offset };
};

const getPagingData = (data: any, page: any, limit: number) => {
	const { count: totalItems, rows: events } = data;
	const currentPage = page ? +page : 0;
	const totalPages = Math.ceil(totalItems / limit);

	return { totalItems, events, totalPages, currentPage };
};

export const allEvents = async (req: Request, res: Response) => {
	const { page, size, from, until } = req.query;

	const startDate = from ? new Date(from as string) : new Date();
	const endDate = until ? new Date(until as string) : null;

	// Construct conditions for start and end date based on the from and until inputs
	let condition = {};
	if (startDate && endDate) {
		condition = { date: { [Op.between]: [startDate, endDate] } };
	} else if (startDate && !endDate) {
		condition = { date: { [Op.gte]: startDate } };
	} else if (!startDate && endDate) {
		condition = { date: { [Op.lte]: endDate } };
	}

	const { limit, offset } = getPagination(page, size);

	try {
		const events = await Event.findAndCountAll({
			where: condition,
			limit,
			offset,
			include: [Person],
		});

		const cleanedData = events.rows.map((event) => {
			return {
				id: event.id,
				name: event.name,
				isOutside: event.isOutside,
				city: event.city,
				country: event.country,
				remote: event.remote,
				eventDate: event.date,
				organizers: event.organizers?.map((organizer) => ({
					id: organizer.id,
					name: organizer.name,
				})),
			};
		});
		const response = getPagingData(
			{ count: events.count, rows: cleanedData },
			page,
			limit
		);

		res.send(response);
	} catch (ex: any) {
		logger.error('Failed to query the events', ex);
		res.status(500).send({
			message: ex.message || 'An error occured while querying all events.',
		});
	}
};

export const eventDetails = async (req: Request, res: Response) => {
	const eventId = req.params.eventId;

	if (!eventId) {
		return res.status(404).send({
			message: 'event id is not specified',
		});
	}

	if (!validate(eventId)) {
		return res.status(404).send({
			message: 'event id is not a valid format',
		});
	}

	let event = null,
		forecast = null;
	const searchCache = await cache.get(eventId);
	if (searchCache) {
		event = JSON.parse(searchCache);
		logger.log('info', `Found ${eventId} in cache`);
	} else {
		logger.log('info', `Event ${eventId} not found in cache`);
		event = await Event.findOne({ where: { id: eventId }, include: [Person] });

		if (event) {
			await cache.set(eventId, JSON.stringify(event));
		}
	}

	if (!event) {
		return res.status(404).send({
			message: `event by ${eventId} is not found`,
		});
	}

	if (
		event.isOutside &&
		event.city &&
		validateDateBetweenTwoDates(new Date(), addDays(new Date(), 7), new Date(event.date))
	) {
		const weather = new Weather();
		try {
			forecast = await weather.getWeatherForecast(
				event.city.toLowerCase(),
				new Date(event.date)
			);
		} catch (ex) {
			logger.error(
				`Failed to gather weather forecast for event ${event.id}`,
				ex
			);
		}
	}

	const response = {
		id: event.id,
		name: event.name,
		isOutside: event.isOutside,
		city: event.city,
		country: event.country,
		remote: event.remote,
		eventDate: event.date,
		attendees: [],
		organizers: event.organizers?.map((organizer: Person) => ({
			id: organizer.id,
			name: organizer.name,
		})),
		weather: forecast
			? {
					...forecast,
			  }
			: null,
	};

	res.send(response);
};

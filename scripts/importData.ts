// Load all the configuration from .env file
require('dotenv').config();

import data from '../data/data.json';
import { sync } from '../src/connectors';
import { Event, EventOrganizer, Person } from '../src/models';
import { logger } from '../src/utils';

interface IOrganizer {
	id?: string;
	name: string;
}

interface IEvent {
	id?: string;
	name: string;
	isOutside: boolean;
	location: string;
	date: number;
	organizer: IOrganizer;
}

const addDays = (date: Date, dayToAdd: number): Date => {
	const result = new Date(date);
	result.setDate(result.getDate() + dayToAdd);
	return result;
}

// Import all the unique Organizers into the table
const importOrganizers = async (events: IEvent[]) => {
	const organizersFromEvents = events.map((event) => event?.organizer?.name);
	const uniqueOrganizers = new Set(organizersFromEvents);

	const people: IOrganizer[] = [];
	for (const name of uniqueOrganizers) {
		const [person, _] = await Person.findOrCreate({ where: { name } });
		people.push({
			id: person.id,
			name: person.name,
		});
	}

	return people;
};

// Import all the events into the table
const importEvents = async (events: IEvent[], organizers: IOrganizer[]) => {
	// Build events information by doing some transform of the data
	const eventsData = events.map((event) => {
		let city = '',
			country = '',
			remote = false;

		// Find the organizerId based on the name of the organizer
		const organizerId = organizers.find(
			(organizer) => organizer.name === event.organizer.name
		)?.id as string;

		// Split the location information into city and country
		// Set the remote flag if the location includes REMOTE value
		if (event.location.includes('|')) {
			const locationSplit = event.location.split('|');
			city = locationSplit[1] ? locationSplit[1] : '';
			country = locationSplit[0] ? locationSplit[0] : '';
		} else {
			if (event.location === 'REMOTE') {
				remote = true;
			}
		}

		// Build an object of Event
		return {
			name: event.name,
			organizerId,
			isOutside: event.isOutside || false,
			location: event.location || 'CAN|TORONTO',
			city,
			country,
			remote,
			date: new Date(event.date || addDays(new Date(), 5).toISOString()),
		};
	});

	// Iterate through all the events and insert it into the table
	for (const event of eventsData) {
		const eventData = await Event.create(event);

		// Create Event-Person association
		await EventOrganizer.create({
			eventId: eventData.id,
			personId: event.organizerId,
		});
	}
};

export const importData = async () => {
	// Import the data in json format and save in database
	await sync();

	logger.info('Connected to the database.');

	const start = Date.now();

	// Import all the organizers into the table
	const organizers = await importOrganizers(data);

	// Import all the events into the table
	await importEvents(data, organizers);

	const end = Date.now();

	const duration = end - start;
	logger.log('info', 'Completed the load process in %d ms.', duration);
};

importData();

import { Router } from 'express';
import { allEvents, eventDetails } from '../dao';

export const eventRoutes = (app: any) => {
	const router = Router();

	router.get('/', allEvents);

	router.get('/:eventId', eventDetails);

	app.use('/api/events', router);
}
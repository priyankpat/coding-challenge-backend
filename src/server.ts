import { Server } from 'http';
import app from './app';
import { cache, sync } from './connectors';
import { eventRoutes } from './routes';
import { environmentConfigs, logger } from './utils';

export default async (): Promise<Server> => {
	const port = environmentConfigs.serverPort;

	// Sync the defined models
	await sync();
	await cache.connect();

	eventRoutes(app);

	app.get('/', (req, res) => {
		res.json({ message: 'Welcome to the event planner application.' });
	})

	const server: any = app.listen(port, () => {
		logger.log('info', 'Running on environment: %s', environmentConfigs.environment);
		logger.log('info', 'Example app listening at http://localhost:%s', port);
		return server;
	});

	return server;
};

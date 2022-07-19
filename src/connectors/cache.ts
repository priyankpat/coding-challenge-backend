import { createClient } from 'redis';
import { environmentConfigs, logger } from '../utils';

export const cache = createClient({
	socket: {
		host: environmentConfigs.cacheHost,
		port: environmentConfigs.cachePort
	},
	password: environmentConfigs.cachePassword
});

cache.on('error', (err) => logger.error('Failed to connect to the cache server.', err));

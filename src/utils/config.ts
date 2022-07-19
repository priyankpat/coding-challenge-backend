import { IConfig } from '../types';

export const environmentConfigs: IConfig = {
	environment: process.env.ENVIRONMENT || 'dev',
	dbHost: process.env.DB_HOST || '',
	dbPort: Number(process.env.DB_PORT || '0'),
	dbUser: process.env.DB_USER || '',
	dbPassword: process.env.DB_PASS || '',
	dbName: process.env.DB_NAME || '',
	cacheHost: process.env.CACHE_HOST || '',
	cachePort: Number(process.env.CACHE_PORT || '0'),
	cacheUser: process.env.CACHE_USER || '',
	cachePassword: process.env.CACHE_PASS || '',
	serverPort: Number(process.env.SERVER_PORT || '4040'),
	weatherAPIKey: process.env.WEATHER_API_KEY || '',
};

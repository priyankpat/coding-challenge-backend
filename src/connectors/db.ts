import { Sequelize } from 'sequelize-typescript';
import * as models from '../models';
import { environmentConfigs, logger } from '../utils';

export const db: Sequelize = new Sequelize({
	dialect: 'postgres',
	database: environmentConfigs.dbName,
	host: environmentConfigs.dbHost,
	port: environmentConfigs.dbPort,
	username: environmentConfigs.dbUser,
	password: environmentConfigs.dbPassword,
	models: Object.values(models),
	logging: false,
});

export const sync = async () => {
	// Test if the connection is OK
	try {
		await db.authenticate();
		logger.log('info', 'Connection to the database has been established.');
		
		// Sync the defined models
		await db.sync();
	} catch (err) {
		logger.error('Unable to connect to the database', err);
	}
};

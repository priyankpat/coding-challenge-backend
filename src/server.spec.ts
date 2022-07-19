import { jest } from '@jest/globals';
import { Server } from 'http';
import { cache, db } from './connectors';
import start from './server';

jest.setTimeout(10000);

describe('start', () => {
	it('starts server and returns server instance', async () => {
		const app: Server = await start();
		expect(() => app.close()).not.toThrow();
	});

	afterAll(async () => {
		await cache.disconnect();
		await db.close();
	});
});

import { jest } from '@jest/globals';
import express from 'express';
import request from 'supertest';
import { eventRoutes } from './event.routes';

jest.setTimeout(10000);

describe('event route', () => {
	let app;

	beforeEach(() => {
		app = express();
		expect(app).toBeTruthy();

		eventRoutes(app);
	});

	it('responds to /api/events', async () => {
		const res = await request(app).get('/api/events');
		expect(res.statusCode).toBe(200);
	});

	it('responds to /api/events/:eventId with a 406', async () => {
		const res = await request(app).get('/api/events/id');
		expect(res.statusCode).toBe(406);
		expect(res.text).toBeTruthy();

		const body = JSON.parse(res.text);
		expect(body.message).toBeTruthy();
		expect(body.message).toEqual('event id is not a valid format');
	});

	it('responds to /api/events/:eventId with a 500', async () => {
		const res = await request(app).get('/api/events/e534d825-41a0-4728-a5d1-ce699bb77a39');
		expect(res.statusCode).toBe(500);
		expect(res.text).toBeTruthy();

		const body = JSON.parse(res.text);
		expect(body.message).toBeTruthy();
		expect(body.message).toEqual('something went wrong when trying to get the event details.');
	});
});
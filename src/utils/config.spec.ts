describe('config', () => {
	it('should contain environment configs', async () => {
		expect(process.env.hasOwnProperty('ENVIRONMENT')).toBeTruthy();
		expect(process.env.hasOwnProperty('DB_HOST')).toBeTruthy();
		expect(process.env.hasOwnProperty('DB_PORT')).toBeTruthy();
		expect(process.env.hasOwnProperty('DB_USER')).toBeTruthy();
		expect(process.env.hasOwnProperty('DB_PASS')).toBeTruthy();
		expect(process.env.hasOwnProperty('DB_NAME')).toBeTruthy();
		expect(process.env.hasOwnProperty('CACHE_HOST')).toBeTruthy();
		expect(process.env.hasOwnProperty('CACHE_PORT')).toBeTruthy();
		expect(process.env.hasOwnProperty('CACHE_USER')).toBeTruthy();
		expect(process.env.hasOwnProperty('CACHE_PASS')).toBeTruthy();
		expect(process.env.hasOwnProperty('WEATHER_API_KEY')).toBeTruthy();
		expect(process.env.hasOwnProperty('SERVER_PORT')).toBeTruthy();
	});
});
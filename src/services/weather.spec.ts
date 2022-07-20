import { Weather } from './weather.service';

describe('weather', () => {
	let weather;

	beforeEach(() => {
		weather = new Weather();
		expect(weather).toBeTruthy();
	});

	it('should return weather forecast for Toronto', async () => {
		const forecastResult = await weather.getForecast('Toronto');

		expect(forecastResult).toBeTruthy();

		const { location, current, forecast } = forecastResult;

		expect(location).toBeTruthy();
		expect(location.name).toEqual('Toronto')

		expect(forecast.forecastday).toBeTruthy();
		expect(forecast.forecastday).not.toEqual([]);
	});
});
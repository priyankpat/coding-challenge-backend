import { WeatherForecast } from '../types';
import { environmentConfigs } from '../utils';

const axios = require('axios').default;

export class Weather {
	async getWeatherForecast(city: string, date: Date) {
		const dateToSearch = date.toISOString().split('T')[0];
		const forecastResult = await this.getForecast(city);

		console.log(dateToSearch);
		console.log(forecastResult.forecast.forecastday);

		const forecastForDate = forecastResult.forecast.forecastday.find((day) => day.date === dateToSearch);

		if (!forecastForDate) {
			throw `Forecast not found for ${dateToSearch}`;
		}

		const forecastDay = forecastForDate.day;
		return {
			temperatureInDegreesCelsius: forecastDay.avgtemp_c,
			chanceOfRain: forecastDay.daily_chance_of_rain
		};
	}

	private async getForecast(city: string): Promise<WeatherForecast> {
		// const encodedURI = encodeURI(`http://api.weatherapi.com/v1/forecast.json?key=${environmentConfigs.weatherAPIKey}&days=7`);
		const response = await axios.get('http://api.weatherapi.com/v1/forecast.json', {
			params: {
				key: environmentConfigs.weatherAPIKey,
				days: 7,
				q: city,
			}
		});
		return response.data;
	}
}
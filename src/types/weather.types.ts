export interface WeatherDayForecast {
	date: string;
	day: {
		avgtemp_c: number;
		daily_chance_of_rain: number;
	}
}

export interface WeatherForecast {
	forecast: {
		forecastday: WeatherDayForecast[];
	}
}
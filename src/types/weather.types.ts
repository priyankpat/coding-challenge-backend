interface WeatherDayForecast {
	date: string;
	day: {
		avgtemp_c: number;
		daily_chance_of_rain: number;
	}
}

interface WeatherForecast {
	forecast: {
		forecastday: WeatherDayForecast[];
	}
}
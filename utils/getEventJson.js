import addDays from './addDaysToDate';

const events = [
	{
		name: 'Sherpa event: bowling',
		isOutside: false,
		location: 'CAN|TORONTO',
	},
	{
		name: 'Sherpa event: day at the beach',
		isOutside: true,
		location: 'CAN|TORONTO',
	},
	{
		name: 'Peter & Lucy wedding!',
		isOutside: true,
		location: 'THA|BANGKOK',
	},
	{
		name: 'Scotiabank corporate event',
		isOutside: true,
		location: 'USA|DETROIT',
	},
	{
		name: 'Angular conference',
		isOutside: false,
		location: 'USA|NEW_YORK',
	},
	{
		name: 'Sherpa event: online trivia',
		isOutside: false,
		location: 'REMOTE',
	},
	{
		name: 'Sherpa event: Softball',
		isOutside: true,
		location: 'CAN|TORONTO',
	},
];

const organizers = [
	{
		name: 'Harriet Smith',
	},
	{
		name: 'Azhar Khan',
	},
];

const getRandomIntInRange = (min, max) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getEvents = () =>
	events.map((event, i) => ({
		...event,
		date: addDays(new Date(), getRandomIntInRange(1, 10)).getTime(),
		organizer: organizers[i < 2 ? i : getRandomIntInRange(0, 1)],
	}));

console.log(JSON.stringify(getEvents(), null, 2)); //eslint-disable-line

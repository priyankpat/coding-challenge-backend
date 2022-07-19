import addDaysToDate from "./addDaysToDate";
import { validateDateBetweenTwoDates } from './date';

describe('date', () => {
	it('should add 7 days', async () => {
		const date = addDaysToDate(new Date('2022-07-19'), 7);
		expect(date).toBeTruthy();
		expect(date).toEqual(new Date('2022-07-26'));
	});

	it('should return true if dates are within range', async() => {
		const fromDate = new Date('2022-07-19');
		const toDate = new Date('2022-07-26');
		const dateToCheck1 = new Date('2022-07-21');
		const dateToCheck2 = new Date('2022-07-27');

		expect(validateDateBetweenTwoDates(fromDate, toDate, dateToCheck1)).toEqual(true);
		expect(validateDateBetweenTwoDates(fromDate, toDate, dateToCheck2)).toEqual(false);
	});

});

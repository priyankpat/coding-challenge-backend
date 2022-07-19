/**
 * date: Date to add number of days with
 * dayToAdd: Number of days to add
 */
export default (date: Date, dayToAdd: number): Date => {
	const result = new Date(date);
	result.setDate(result.getDate() + dayToAdd);
	return result;
}
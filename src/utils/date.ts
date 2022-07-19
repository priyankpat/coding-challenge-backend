export const validateDateBetweenTwoDates = (fromDate: Date, toDate: Date, givenDate: Date) => {
	fromDate.setHours(0, 0, 0);
	toDate.setHours(0, 0, 0);
	givenDate.setHours(0, 0, 0);
	return givenDate >= fromDate && givenDate <= toDate;
}

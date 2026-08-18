export type Percentage1 = number;
export type Percentage100 = number;

export const getPercentageFormat = (value: Percentage1, digits = 1): string => {
	const formatter = new Intl.NumberFormat("en-US", {
		style: "percent",
		minimumFractionDigits: digits,
		maximumFractionDigits: digits,
	});
	return formatter.format(value);
};

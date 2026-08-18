// Percentage 0-1
export type Percentage1 = number;

// Percentage 0-100
export type Percentage100 = number;

export const getPercentageFormat = (value: Percentage1, digits = 2): string => {
	const formatter = new Intl.NumberFormat("en-US", {
		style: "percent",
		minimumFractionDigits: digits,
		maximumFractionDigits: digits,
	});
	return formatter.format(value);
};

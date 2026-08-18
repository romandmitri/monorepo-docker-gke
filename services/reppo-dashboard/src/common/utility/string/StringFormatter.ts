export abstract class StringFormatter {
	static truncate = (input: string | undefined, left: number = 3, right: number = left): string | undefined => {
		const filler = "...";
		const minLength = left + filler.length + right;
		if (!input || input.length <= minLength) return input;
		let output = "";
		if (left > 0) output += input.slice(0, left);
		output += filler;
		if (right > 0) output += input.slice(-right);
		return output;
	};
}

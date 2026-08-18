export class BufferHelper {
	static jsonToBase64 = (data: any): string => {
		if (data == undefined) return "";
		const json = JSON.stringify(data, null, "\t");
		return Buffer.from(json).toString("base64");
	};
}

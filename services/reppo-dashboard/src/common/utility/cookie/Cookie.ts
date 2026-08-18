export class Cookie {
	static get = (name: string): string | undefined => {
		// consoleLog("Cookie.get", name);
		// if (typeof document == undefined) return;
		const match = document.cookie.split("; ").find((row) => row.startsWith(`${name}=`));
		if (!match) return;
		const [key, value] = match.split("=");
		// consoleLog("Cookie.get.VALUE", name, {value: value});
		return value ?? undefined;
	};
}

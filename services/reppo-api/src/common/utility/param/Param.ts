type queryMap = {
	[key in string]: string | string[] | undefined | number;
};

export const getQueryString = (base: string, map: queryMap): string => {
	const p = new URLSearchParams();
	for (let k in map) {
		const v = map[k];
		if (v == undefined) {
			continue;
		}
		if (Array.isArray(v)) {
			v.forEach((v) => p.append(k, v));
		}
		p.set(k, v + "");
	}
	const out = p.toString();
	if (!out.length) {
		return base + "";
	}
	return base + "?" + out;
};

export const getQueryKey = (k: string, v?: string) => {
	return (prev: URLSearchParams): URLSearchParams => {
		if (v == undefined || v == "") {
			prev.delete(k);
		} else {
			prev.set(k, v);
		}
		return prev;
	};
};

export const parseAsArray = <Type extends string>(v?: Type | Type[]): Type[] => {
	if (!v) return [];
	if (typeof v == "string") return [v];
	if (Array.isArray(v)) return v;
	return [];
};

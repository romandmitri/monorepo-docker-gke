import { LocationCountryIsoCode } from "@/src/common/components/location/LocationCountryIsoCode.ts";
import { Badge, badgeVariants } from "@/src/common/components/shadcn/badge.tsx";
import { VariantProps } from "class-variance-authority";
import { Country } from "country-state-city";
import { useMemo } from "react";

type Props = {
	countryIsoCode?: LocationCountryIsoCode;
} & VariantProps<typeof badgeVariants>;

export const LocationCountryIndicator = (p: Props) => {
	const countryIsoCode = p.countryIsoCode;
	if (!countryIsoCode) return null;

	const variant = p.variant ?? "blank";

	const country = useMemo(() => Country.getCountryByCode(countryIsoCode), [countryIsoCode]);
	if (country) {
		// TODO: reidenzon - Add the flag?!
		return <Badge variant={variant}>{`${country.name} (${country.isoCode})`}</Badge>;
	}

	return <Badge variant={variant}>{countryIsoCode}</Badge>;
};

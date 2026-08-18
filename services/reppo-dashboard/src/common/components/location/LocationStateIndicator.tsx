import { LocationCountryIsoCode } from "@/src/common/components/location/LocationCountryIsoCode.ts";
import { LocationStateIsoCode } from "@/src/common/components/location/LocationStateIsoCode.ts";
import { Badge, badgeVariants } from "@/src/common/components/shadcn/badge.tsx";
import { VariantProps } from "class-variance-authority";
import { State } from "country-state-city";
import { useMemo } from "react";

type Props = {
	countryIsoCode?: LocationCountryIsoCode;
	stateIsoCode?: LocationStateIsoCode;
} & VariantProps<typeof badgeVariants>;

export const LocationStateIndicator = (p: Props) => {
	const countryIsoCode = p.countryIsoCode;
	const stateIsoCode = p.stateIsoCode;
	if (!countryIsoCode || !stateIsoCode) return null;

	const variant = p.variant ?? "blank";

	const state = useMemo(() => State.getStateByCodeAndCountry(stateIsoCode, countryIsoCode), [stateIsoCode]);
	if (state) {
		// TODO: reidenzon - Add the flag?!
		return <Badge variant={variant}>{`${state.name} (${state.isoCode})`}</Badge>;
	}

	return <Badge variant={variant}>{stateIsoCode}</Badge>;
};

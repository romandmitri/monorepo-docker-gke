import { LocationCountryIndicator } from "@/src/common/components/location/LocationCountryIndicator.tsx";
import { LocationCountryIsoCode, LocationCountryIsoCodes } from "@/src/common/components/location/LocationCountryIsoCode.ts";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/src/common/components/shadcn/select.tsx";
import { Country } from "country-state-city";
import { useMemo } from "react";

interface Props {
	isDisabled?: boolean;
	countryIsoCode?: LocationCountryIsoCode;
	onChange?: (v: LocationCountryIsoCode) => void;
}

export const LocationCountrySelect = (p: Props) => {
	const countryIsoCode = p.countryIsoCode;
	const countries = useMemo(
		() =>
			Country.getAllCountries().filter((v) =>
				[
					//
					LocationCountryIsoCodes.Canada,
					LocationCountryIsoCodes.UnitedStates,
				].includes(v.isoCode as LocationCountryIsoCodes),
			),
		[],
	);

	const handleChange = (v: LocationCountryIsoCode) => {
		p.onChange?.(v);
	};

	return (
		<Select
			//
			value={countryIsoCode ?? ""}
			onValueChange={(v) => handleChange(v as LocationCountryIsoCode)}
		>
			<SelectTrigger disabled={p.isDisabled} className={"w-full"}>
				<LocationCountryIndicator countryIsoCode={countryIsoCode} />
				<div></div>
			</SelectTrigger>
			<SelectContent>
				{countries.map((c) => {
					return (
						<SelectItem key={c.isoCode} value={c.isoCode}>
							<LocationCountryIndicator countryIsoCode={c.isoCode} />
						</SelectItem>
					);
				})}
			</SelectContent>
		</Select>
	);
};

import { LocationCountryIsoCode } from "@/src/common/components/location/LocationCountryIsoCode.ts";
import { LocationStateIndicator } from "@/src/common/components/location/LocationStateIndicator.tsx";
import { LocationStateIsoCode } from "@/src/common/components/location/LocationStateIsoCode.ts";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/src/common/components/shadcn/select.tsx";
import { State } from "country-state-city";
import { useMemo } from "react";

interface Props {
	isDisabled?: boolean;
	countryIsoCode?: LocationCountryIsoCode;
	stateIsoCode?: LocationStateIsoCode;
	onChange?: (v: LocationStateIsoCode) => void;
}

export const LocationStateSelect = (p: Props) => {
	const countryIsoCode = p.countryIsoCode;
	const stateIsoCode = p.stateIsoCode;
	const countries = useMemo(() => State.getStatesOfCountry(countryIsoCode), [countryIsoCode]);

	const handleChange = (v: LocationStateIsoCode) => {
		p.onChange?.(v);
	};

	return (
		<Select
			//
			value={stateIsoCode ?? ""}
			onValueChange={(v) => handleChange(v as LocationStateIsoCode)}
		>
			<SelectTrigger disabled={p.isDisabled} className={"w-full"}>
				<LocationStateIndicator countryIsoCode={countryIsoCode} stateIsoCode={stateIsoCode} />
				<div></div>
			</SelectTrigger>
			<SelectContent>
				{countries.map((c) => {
					return (
						<SelectItem key={c.isoCode} value={c.isoCode}>
							<LocationStateIndicator countryIsoCode={countryIsoCode} stateIsoCode={c.isoCode} />
						</SelectItem>
					);
				})}
			</SelectContent>
		</Select>
	);
};

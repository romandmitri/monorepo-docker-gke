import { LocationStateIsoCode } from "@/src/common/utility/location/LocationStateIsoCode.js";
import { Country, ICountry } from "country-state-city";

export type LocationCountryIsoCode = ICountry["isoCode"];

export const getLocationCountryName = (c: LocationStateIsoCode): string => {
	return Country.getCountryByCode(c)?.name ?? c;
};

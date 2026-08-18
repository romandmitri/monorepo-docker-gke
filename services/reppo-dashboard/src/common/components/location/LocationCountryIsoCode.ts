import { ICountry } from "country-state-city";
import { CountryCode } from "libphonenumber-js";

export type LocationCountryIsoCode = ICountry["isoCode"] | CountryCode;

export enum LocationCountryIsoCodes {
	Canada = "CA",
	UnitedStates = "US",
}

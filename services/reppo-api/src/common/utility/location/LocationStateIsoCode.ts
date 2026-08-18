import { IState, State } from "country-state-city";

export type LocationStateIsoCode = IState["isoCode"];

export const getLocationStateName = (s: LocationStateIsoCode, c: LocationStateIsoCode): string => {
	return State.getStateByCodeAndCountry(s, c)?.name ?? s;
};

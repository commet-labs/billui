import { Country, type ICountry, type IState, State } from "country-state-city";

/** All countries sorted alphabetically */
export const COUNTRIES: ICountry[] = Country.getAllCountries().sort((a, b) =>
  a.name.localeCompare(b.name),
);

/** Get states/provinces for a country by ISO code */
export function getStatesForCountry(countryCode: string): IState[] {
  return State.getStatesOfCountry(countryCode);
}

export type { ICountry, IState };

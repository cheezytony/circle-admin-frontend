import { defineStore } from 'pinia';
import phones from '~~/assets/json/phones';
import allCountries from '~~/assets/json/countries';
import flags from '~~/assets/json/flags';

export type Country = {
  name: string;
  countryCode: string;
  dialCode: string;
  flag: {
    emoji: string;
    unicode: string;
  };
};

export const useCountries = defineStore('countries', () => {
  const countries = Object.keys(allCountries).map((countryCode) => {
    const name = allCountries[countryCode];
    const dialCode = phones[countryCode];
    const flag = flags[countryCode];
    return { name, countryCode, dialCode, flag };
  });
  return { countries };
});

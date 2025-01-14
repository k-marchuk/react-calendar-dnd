import { HolidayResponse } from '@src/types/Holiday';

const API_URL: string =
  'https://date.nager.at/api/v3/NextPublicHolidaysWorldwide';

export const fetchWorldwideHolidays = async (): Promise<
  HolidayResponse[] | undefined
> => {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) throw new Error('Bad fetch response');

    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

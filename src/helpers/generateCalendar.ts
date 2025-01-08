import { Day } from '../types/Date';

export const generateCalendar = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const lastDayOfMonth = new Date(year, month + 1, 0);

  const daysInMonth: Day[] = [];

  for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
    daysInMonth.push({
      day: day,
      month: month,
      year: year,
    });
  }

  return daysInMonth;
};

import {
  compareAsc,
  getDate,
  getMonth,
  getYear,
  isSameMonth,
  isSameWeek,
  parse,
  setDate,
  setMonth,
  setYear,
} from "date-fns";
import { SheetDatum } from "./google_sheets";

/**
 * Converts the google sheet date string to an actual date
 *
 * @param value a string in the format `2024-09-19`
 * @returns a date from that string
 */
export const createDate = (value: string) =>
  parse(value, "yyyy-MM-dd", new Date());

/**
 * Takes a list of data for a particular week and returns the score for that week
 *
 * @param data a list of google sheet data from google sheets for a particular week
 * @returns the score for that week
 */
export const getWeeklyScore = (data: SheetDatum[]) => {
  const weeklySum = data.reduce(
    (sum, datum) =>
      sum +
      datum.movePoints +
      datum.standPoints +
      datum.exercisePoints +
      datum.bonusPoints,
    0
  );

  const hasBonusPoints =
    data.length === 7 && data.every((datum) => datum.bonusPoints === 1);
  const extraBonusPoints = hasBonusPoints ? 5 : 0;

  return weeklySum + extraBonusPoints;
};

/**
 * Takes a list of data and optionally a reference data and returns only records
 * belonging to that week
 *
 * @param data A list of data to filter to the week of date
 * @param referenceDate optional, if you want to get data for a past week
 * @returns a list of the data from that week
 */
export const getWeeksRecords = (
  data: SheetDatum[],
  referenceDate = new Date()
) =>
  data
    .filter((datum) => isSameWeek(referenceDate, createDate(datum.date)))
    .sort((a, b) => compareAsc(createDate(a.date), createDate(b.date)));

/**
 * Takes a list of data and optionally a reference data and returns only records
 * belonging to that month
 *
 * @param data A list of data to filter to the month of date
 * @param referenceDate optional, if you want to get data for a past month
 * @returns a list of the data from that month
 */
export const getMonthsRecords = (
  data: SheetDatum[],
  referenceDate = new Date()
) =>
  data
    .filter((datum) => isSameMonth(referenceDate, createDate(datum.date)))
    .sort((a, b) => compareAsc(createDate(a.date), createDate(b.date)));

/**
 * Given a day in a month, gets a list of "reference" days for that month, i.e.
 * days that can be used to find scores for weeks
 *
 * @param today a day in the month trying to get reference days for
 * @returns a list of reference dates
 */
export const getReferenceDatesForMonth = (today: Date) => {
  const year = getYear(today);
  const month = getMonth(today);
  const day = getDate(today);

  return [1, 8, 15, 22, 29]
    .filter((v) => v < day)
    .map((day) => {
      const newDate = new Date();
      return setDate(setMonth(setYear(newDate, year), month), day);
    });
};

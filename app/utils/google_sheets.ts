import { JWT } from "google-auth-library";
import {
  GoogleSpreadsheet,
  type GoogleSpreadsheetRow,
} from "google-spreadsheet";

/**
 * Get the google doc with some validation that we have the appropriate ENV vars
 */
const getGoogleSheet = async () => {
  const {
    GOOGLE_SERVICE_ACCOUNT_EMAIL,
    GOOGLE_PRIVATE_KEY,
    GOOGLE_SPREADSHEET_ID,
  } = process.env;

  if (
    !GOOGLE_SERVICE_ACCOUNT_EMAIL ||
    !GOOGLE_PRIVATE_KEY ||
    !GOOGLE_SPREADSHEET_ID
  ) {
    throw new Error(
      "GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY, and GOOGLE_SPREADSHEET_ID env vars are required"
    );
  }

  const serviceAccountAuth = new JWT({
    email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
    // https://stackoverflow.com/a/74668003
    key: GOOGLE_PRIVATE_KEY.split(String.raw`\n`).join("\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const doc = new GoogleSpreadsheet(GOOGLE_SPREADSHEET_ID, serviceAccountAuth);

  await doc.loadInfo();

  return doc;
};

type RowData = {
  date: string;
  person: "Alex" | "Darby" | "Mom" | "Dad" | "Jon" | "Keely";
  movePoints: number;
  standPoints: number;
  exercisePoints: number;
  bonusPoints: number;
  steps: number;
};

/**
 * Add a row to the google doc. Takes a day's workout data and saves it. If the
 * date already exists, it updates that row instead.
 *
 * @param row The values to add to the spreadsheet row
 */
export const addRow = async (row: RowData) => {
  const doc = await getGoogleSheet();

  const sheet = doc.sheetsByTitle[row.person];

  const data = await sheet.getRows();

  // check if the date already exists
  const rowThatAlreadyExists = data.find(
    (datum) => datum.get("date") === row.date
  );

  // if it does, just update that row instead
  if (rowThatAlreadyExists) {
    rowThatAlreadyExists.assign({
      move: row.movePoints,
      stand: row.standPoints,
      exercise: row.exercisePoints,
      bonus: row.bonusPoints,
      steps: row.steps,
    });
    await rowThatAlreadyExists.save();
  } else {
    // otherwise add a new row with that data
    await sheet.addRow({
      date: row.date,
      move: row.movePoints,
      stand: row.standPoints,
      exercise: row.exercisePoints,
      bonus: row.bonusPoints,
      steps: row.steps,
    });
  }
};

export type SheetDatum = Omit<RowData, "person">;

/**
 * Converts the google sheet row to a usable js object in the form we expect
 */
const normalizeRow = (
  row: GoogleSpreadsheetRow<Record<string, unknown>>
): SheetDatum => ({
  date: row.get("date"),
  movePoints: Number(row.get("move")),
  standPoints: Number(row.get("stand")),
  exercisePoints: Number(row.get("exercise")),
  bonusPoints: Number(row.get("bonus")),
  steps: Number(row.get("steps")),
});

export type AllData = {
  Alex: SheetDatum[];
  Darby: SheetDatum[];
  Mom: SheetDatum[];
  Dad: SheetDatum[];
  Jon: SheetDatum[];
  Keely: SheetDatum[];
};

/**
 * Gets all the data in our spreadsheet, for all people
 */
export const getAllData = async (): Promise<AllData> => {
  const doc = await getGoogleSheet();

  const names = ["Alex", "Darby", "Mom", "Dad", "Jon", "Keely"];

  const data = await Promise.all(
    names.map(async (name) => {
      const sheet = doc.sheetsByTitle[name];
      const data = await sheet.getRows();
      return data.map(normalizeRow);
    })
  );

  return {
    Alex: data[0],
    Darby: data[1],
    Mom: data[2],
    Dad: data[3],
    Jon: data[4],
    Keely: data[5],
  };
};

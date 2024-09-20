import {
  GoogleSpreadsheet,
  type GoogleSpreadsheetRow,
} from "google-spreadsheet";
import { JWT } from "google-auth-library";

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

export const addRow = async (row: RowData) => {
  const doc = await getGoogleSheet();

  const sheet = doc.sheetsByTitle[row.person];
  await sheet.addRow({
    date: row.date,
    move: row.movePoints,
    stand: row.standPoints,
    exercise: row.exercisePoints,
    bonus: row.bonusPoints,
    steps: row.steps,
  });
};

export type SheetDatum = Omit<RowData, "person">;

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

export const getAllData = async () => {
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

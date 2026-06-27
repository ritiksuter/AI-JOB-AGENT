import { google } from "googleapis";

const auth = new google.auth.GoogleAuth({
  keyFile: "./service-account.json",
  scopes: [
    "https://www.googleapis.com/auth/spreadsheets.readonly",
  ],
});

const client = await auth.getClient();

const sheets = google.sheets({
  version: "v4",
  auth: client,
});

export const getJobsFromSheet = async () => {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "Result!A:G",
    });

    const rows = response.data.values || [];

    if (rows.length <= 1) {
      return [];
    }

    return rows.slice(1).map((row) => ({
      title: row[0] || "",
      company: row[1] || "",
      location: row[2] || "",
      link: row[3] || "",
      score: row[4] || "",
      description: row[5] || "",
      coverLetter: row[6] || "",
    }));
  } catch (error) {
    console.error("Google Sheets Error:");
    console.error(error);
    throw error;
  }
};
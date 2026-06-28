import { google } from "googleapis";

const auth = new google.auth.GoogleAuth({
  keyFile: "./service-account.json",
  scopes: [
    "https://www.googleapis.com/auth/spreadsheets",
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
      range: "Result!A:I",
    });

    const rows = response.data.values || [];

    if (rows.length <= 1) {
      return [];
    }

    return rows.slice(1).map((row, index) => ({
      rowNumber: index + 2,
      userId: row[0] || "",
      title: row[1] || "",
      company: row[2] || "",
      location: row[3] || "",
      link: row[4] || "",
      fetchedAt: row[5] || "",
      score: row[6] || "",
      description: row[7] || "",
      coverLetter: row[8] || "",
    }));
  } catch (error) {
    console.error("Google Sheets Error:");
    console.error(error);
    throw error;
  }
};


export const deleteRowsFromSheet = async (rowNumbers) => {
  try {
    if (!rowNumbers.length) return;

    // Delete from bottom to top to avoid row shifting
    const sortedRows = [...rowNumbers].sort((a, b) => b - a);

    const requests = sortedRows.map((rowNumber) => ({
      deleteDimension: {
        range: {
          sheetId: Number(process.env.GOOGLE_SHEET_TAB_ID), // e.g. 0
          dimension: "ROWS",
          startIndex: rowNumber - 1,
          endIndex: rowNumber,
        },
      },
    }));

    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      requestBody: {
        requests,
      },
    });

    console.log(
      `Successfully deleted ${rowNumbers.length} row(s) from Google Sheet.`
    );
  } catch (error) {
    console.error("Delete Rows Error:");
    console.error(error);
    throw error;
  }
};


// const sheets = google.sheets({
//   version: "v4",
//   auth: client,
// });

// const getSheetIds = async () => {
//   const response = await sheets.spreadsheets.get({
//     spreadsheetId: process.env.GOOGLE_SHEET_ID,
//   });

//   response.data.sheets.forEach((sheet) => {
//     console.log(
//       `Title: ${sheet.properties.title}, Sheet ID: ${sheet.properties.sheetId}`
//     );
//   });
// };

// await getSheetIds();
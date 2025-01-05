import { Month } from 'src/shared/types/types';

/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const csv = require('csv-parser');

interface DataRecord {
  name: string;
  year: string;
  category: string;
  subCategory: string;
  month: Month;
  value: number;
}

// Read the CSV file and parse it into JSON
const loadCsv = async (filePath) => {
  const results = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
};

async function createReports(csvFilePath, apiBaseUrl, authToken) {
  /**
   * Process the CSV file to extract unique MONTH and YEAR combinations and send requests
   * to create expense and income reports for each combination.
   *
   * @param {string} csvFilePath - Path to the CSV file.
   * @param {string} apiBaseUrl - Base URL of the API.
   * @param {string} authToken - Authentication token for the API.
   */
  const data = await loadCsv(csvFilePath);
  const uniqueCombinations = Array.from(
    new Set(data.map((row) => `${row.MONTH}-${row.YEAR}`)),
  ).map((combo) => {
    const [MONTH, YEAR] = combo.split('-');
    return { MONTH, YEAR };
  });

  const headers = {
    Authorization: `Bearer ${authToken}`,
    'Content-Type': 'application/json',
  };

  for (const { MONTH, YEAR } of uniqueCombinations) {
    const expensePayload = { forMonth: MONTH, forYear: YEAR };
    const incomePayload = { forMonth: MONTH, forYear: YEAR };

    try {
      await axios.post(`${apiBaseUrl}/expense/expense-report`, expensePayload, {
        headers,
      });
      console.log(`Expense report created for ${MONTH} ${YEAR}.`);
    } catch (error) {
      console.error(
        `Failed to create expense report for ${MONTH} ${YEAR}:`,
        error.response?.data || error.message,
      );
    }

    try {
      await axios.post(`${apiBaseUrl}/income/income-report`, incomePayload, {
        headers,
      });
      console.log(`Income report created for ${MONTH} ${YEAR}.`);
    } catch (error) {
      console.error(
        `Failed to create income report for ${MONTH} ${YEAR}:`,
        error.response?.data || error.message,
      );
    }
  }
}

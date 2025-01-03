import * as Papa from 'papaparse';
import * as fs from 'fs';

const PATH = './scripts/personal-budget-spreadsheet.csv';

const file = fs.readFileSync(PATH, 'utf8');

const result = Papa.parse(file, {
  header: false,
  skipEmptyLines: true,
  dynamicTyping: true,
});

const income = [];

result.data.forEach((row) => {
  if (row[0] === 'INCOME') {
  }
});

const createIncomeGrid = (startLine, stopLine) => {};

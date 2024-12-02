const fs = require("fs");

let buffer, input, rows;

try {
  buffer = fs.readFileSync(__dirname + "/input.txt", "utf8");
} catch (e) {
  throw e;
}

input = buffer.toString();
rows = input.split("\n");

const check_levels = (report) => {
  let direction = true; // ascending
  let valid = true;

  for (let i = 0; i < report.length - 1; i++) {
    // Easy case, check for no change, short circuit if so
    if (report[i] == report[i + 1]) {
      valid = false;
      break;
    }

    if (i == 0) {
      // Define expected direction
      direction = report[i] < report[i + 1];
    }

    // Test!
    valid = direction
      ? report[i] < report[i + 1] && report[i + 1] - report[i] < 4 // Ascending and diff of < 4
      : report[i] > report[i + 1] && report[i] - report[i + 1] < 4; // Descending and diff of < 4

    if (!valid) {
      // short circuit if we found an exception
      break;
    }
  }

  return valid;
};

const safe_reports = rows.reduce((accumulator, row) => {
  if (row === "") return accumulator; // Empty row check, skip
  const report = row.split(" ").map(Number);
  let valid = check_levels(report);
  let end = false;
  let i = 0;

  // We need to check to see if we can have
  // any variation of a report that will solve.
  // Skips if valid record from first attempt.
  while (!end && !valid) {
    valid = check_levels(report.toSpliced(i++, 1));
    end = i === report.length;
  }

  return accumulator + (valid ? 1 : 0);
}, 0);

console.log({ safe_reports });

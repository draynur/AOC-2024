const fs = require("fs");
const stdinBuffer = fs.readFileSync(process.stdin.fd);
const input = stdinBuffer.toString();
const rows = input.split("\n");

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
  const valid = check_levels(report);
  return accumulator + (valid ? 1 : 0);
}, 0);

console.log({ safe_reports });

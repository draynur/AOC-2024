const fs = require("fs");

let buffer, input, rows;

try {
  buffer = fs.readFileSync(__dirname + "/sample.txt", "utf8");
} catch (e) {
  throw e;
}

input = buffer.toString();
rows = input.split("\n");

// console.log({ rows });

// Go through each row, find X.
// Pass x to find xmas function
// Return 1 if found, 0 if not, move on to next X

function find_neighbor(letter, direction, row_index, letter_index) {}

function find_xmas(letter, rows, row_index, letter_index) {
  if (letter != "X") return 0;

  // Letter is X, check in all directions for M
  // Store direction, check A, so on till S
  // Return 1 if found all letters, else 0

  if (
    rows[row_index][letter_index + 1] &&
    rows[row_index][letter_index + 1] == "M"
  ) {
    console.log("Found XM: ", row_index, letter_index);
  }

  if (
    rows[row_index][letter_index - 1] &&
    rows[row_index][letter_index - 1] == "M"
  ) {
    console.log("Found MX: ", row_index, letter_index);
  }

  if (rows[row_index + 1] && rows[row_index + 1][letter_index] == "M") {
    console.log("Found X/M: ", row_index, letter_index);
  }

  if (rows[row_index - 1] && rows[row_index - 1][letter_index] == "M") {
    console.log("Found M/X: ", row_index, letter_index);
  }

  // ? ? ?
  // ? X ?
  // ? ? ?

  return 1;
}

const xmass = rows.reduce((accumulator, row, index) => {
  if (row === "") return accumulator; // Empty row check, skip
  let sum = 0;

  row.split("").forEach((letter, letter_index) => {
    sum += find_xmas(letter, rows, index, letter_index);
  });

  return accumulator + sum;
}, 0);

console.log({ xmass });

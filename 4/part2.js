const fs = require("fs");

let buffer, input, rows;

try {
  buffer = fs.readFileSync(__dirname + "/input.txt", "utf8");
} catch (e) {
  throw e;
}

input = buffer.toString();
rows = input.split("\n");

const multiply_sum = rows.reduce((accumulator, row) => {
  if (row === "") return accumulator; // Empty row check, skip
  let sum = 0;
  return accumulator + sum;
}, 0);

console.log({ multiply_sum });

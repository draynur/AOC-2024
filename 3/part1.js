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
  let results;

  // Match mul(x,y) from row as string
  const regex = /mul\((\d+)\,(\d+)\)/g;
  while ((results = regex.exec(row)) !== null) {
    // Match numbers from mul(x,y) 
    sum += Number(results[1]) * Number(results[2]);
    // console.log(`Found ${results[1]} x ${results[2]} at ${results.index}.`);
  }

  return accumulator + sum;
}, 0);

console.log({ multiply_sum });

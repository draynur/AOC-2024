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
  let sum = 0, results;

  // Match mul(x,y) or don't() or do() from row as string
  const expression_regex = /mul\(\d{1,3}\,\d{1,3}\)|don't\(\)|do\(\)/g;
  let flag = true;

  while ((results = expression_regex.exec(row)) !== null) {
    const expression = results[0];

    if (expression == "do()") {
      flag = true;
    }

    else if (expression == "don't()") {
      flag = false;
    }

    else if (flag) {
      const number_regex = /mul\((\d{1,3})\,(\d{1,3})\)/g;
      const [waste, left_digit, right_digit] = number_regex.exec(expression);
      sum += (left_digit * right_digit);
    }
  }

  return accumulator + sum;
}, 0);

console.log({ multiply_sum });

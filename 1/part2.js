const fs = require("fs");

let buffer, input, rows;

try {
  buffer = fs.readFileSync(__dirname + "/input.txt", "utf8");
} catch (e) {
  throw e;
}

input = buffer.toString();
rows = input.split("\n");

const left_list = [];
const right_list = {};

rows.forEach((row) => {
  if (row === "") {
    return;
  }

  const [left, right] = row.split("   ");

  if (right_list[right]) {
    right_list[right]++;
  } else {
    right_list[right] = 1;
  }

  left_list.push(left);
});

const similarity_score = left_list.reduce((accumulator, item) => {
  return accumulator + (right_list[item] ? Number(item) * Number(right_list[item]) : 0)
}, 0);

console.log({ similarity_score });

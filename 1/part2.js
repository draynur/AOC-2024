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
  let score = 0;

  if (right_list[item]) {
    score = Number(item) * Number(right_list[item]);
  }
  return accumulator + score;
}, 0);

console.log({ similarity_score });

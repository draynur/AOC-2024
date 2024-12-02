const fs = require("fs");
const stdinBuffer = fs.readFileSync(process.stdin.fd);
const input = stdinBuffer.toString();
const rows = input.split("\n");

const left_list = [];
const right_list = [];

rows.forEach((row) => {
  if (row === "") {
    return;
  }
  const nums = row.split("   ");
  left_list.push(Number(nums[0]));
  right_list.push(Number(nums[1]));
});

left_list.sort();
right_list.sort();

const total_distance = left_list.reduce((accumulator, item, index) => {
  return accumulator + Math.abs(right_list[index] - item);
}, 0);

console.log({ total_distance });

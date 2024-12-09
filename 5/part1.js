const fs = require("fs");
const filename = "input.txt";

var buffer, rows;

try {
  buffer = fs.readFileSync(__dirname + "/" + filename, "utf8");
} catch (e) {
  throw e;
}

rows = buffer.toString().split("\n");

var after_check_object = {}, flag = false, valid_instructions = 0;

for (let i = 0; i < rows.length - 1; i++) {
  let row = rows[i];

  if (row == "") {
    flag = true;
    continue;
  }

  if (!flag) {
    // Store rules
    const [a, b] = row.split("|");
    if (after_check_object[a] == undefined) {
      after_check_object[a] = {
        after: [b]
      };
    } else {
      if (!after_check_object[a].after.includes(b)) {
        after_check_object[a].after.push(b);
      }
    }
  } else {
    let numbers = row.split(",");
    let valid_instruction = true;

    for (let j = 0; j < rows.length - 1; j++) {
      let number = numbers[j];
      let remainder_numbers = numbers.slice(j + 1);

      for (let k = 0; k < remainder_numbers.length; k++) {
        if (!after_check_object[number] || !after_check_object[number].after.includes(remainder_numbers[k])) {
          valid_instruction = false;
          break;
        }
      }

      if (valid_instruction === false) {
        break;
      }
    }

    if (valid_instruction) {
      // console.log("Valid instruction list! ", { numbers, valid_instruction });
      valid_instructions += Number(numbers[Math.floor(numbers.length / 2)]);
    }

  }
}

// console.table(rows);
// console.dir(after_check_object, { depth: null });
console.log({ valid_instructions });

const fs = require("fs");

var buffer, input, rows;

try {
  buffer = fs.readFileSync(__dirname + "/sample.txt", "utf8");
} catch (e) {
  throw e;
}

input = buffer.toString();
rows = input.split("\n").map(el => el.split(""));

console.table(rows);

function find_next_letter(letter_index, row_index, letter, vertical_direction = false, horizontal_direction = false) {
  // ? ? ?
  // ? X ?
  // ? ? ?

  if (letter === "X") {
    // console.log("Row Bounds: ", row_index - 1, row_index + 1)
    // console.log("Letter Bounds: ", letter_index - 1, letter_index + 1)
    for (let i = letter_index - 1; i <= letter_index + 1; i++) {
      // console.log({ i });
      for (let j = row_index - 1; j <= row_index + 1; j++) {
        // console.log({ j });
        // console.log('Find debug: ', { i, j });
        if (rows[j] && rows[j][i]) { // Bounds exist
          // console.log("Row indices: ", i, j);
          switch (rows[j][i]) {
            case "M":
              console.log(`Successfully found the M @ ${j} x ${i}`);
              // console.log(`          Checking for A @ ${j + (j - row_index)} x ${i + (i - letter_index)}, debug: `, { i, j, letter_index, row_index });
              return find_next_letter(i + (i - letter_index), j + (j - row_index), "A", j - row_index, i - letter_index);
            default:
              return 0;
          }
        } else {
          return 0;
        }
      }
    }
  } else {
    if (horizontal_direction !== false && vertical_direction !== false) {
      if (rows[row_index] && rows[row_index][letter_index]) {
        // It exists
        if (rows[row_index][letter_index] === letter) {
          switch (rows[row_index][letter_index]) {
            case "M":
              console.log(`Successfully found the M @ ${row_index} x ${letter_index}`);
              return find_next_letter(letter_index + horizontal_direction, row_index + vertical_direction, "A", vertical_direction, horizontal_direction);
            case "A":
              console.log(`Successfully found the A @ ${row_index} x ${letter_index}`);
              return find_next_letter(letter_index + horizontal_direction, row_index + vertical_direction, "S", vertical_direction, horizontal_direction);
            case "S":
              console.log(`Successfully found the S @ ${row_index} x ${letter_index}`);
              console.log('!');
              return 1;
            default:
              return 0;
          }
        }
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  }
}

const found_xmas = rows.reduce((accumulator, row, row_index) => {
  if (row === "") return accumulator; // Empty row check, skip

  let result = row.reduce((acc, letter, letter_index) => {
    return acc + find_next_letter(letter_index, row_index, letter);
  }, 0);

  return accumulator + result;
}, 0);

console.log({ xmass: found_xmas });

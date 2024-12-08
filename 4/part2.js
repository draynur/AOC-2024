const fs = require("fs");
const filename = "input.txt";

var buffer, input, rows;

try {
  buffer = fs.readFileSync(__dirname + "/" + filename, "utf8");
} catch (e) {
  throw e;
}

input = buffer.toString();
rows = input.split("\n").map(el => el.split(""));

function find_xmas(letter, i, j) {
  let total = 0;
  if (letter !== 'A') return total; // This aint it fam

  // If the coords exists, check for the letter
  // M ? S
  // ? A ?
  // M ? S
  if (rows[i - 1] && rows[i - 1][j - 1] && rows[i - 1][j - 1] === "M") {
    if (rows[i - 1] && rows[i - 1][j + 1] && rows[i - 1][j + 1] === "S") {
      if (rows[i + 1] && rows[i + 1][j - 1] && rows[i + 1][j - 1] === "M") {
        if (rows[i + 1] && rows[i + 1][j + 1] && rows[i + 1][j + 1] === "S") {
          total++;
        }
      }
    }
  }

  // M ? M
  // ? A ?
  // S ? S
  if (rows[i - 1] && rows[i - 1][j - 1] && rows[i - 1][j - 1] === "M") {
    if (rows[i - 1] && rows[i - 1][j + 1] && rows[i - 1][j + 1] === "M") {
      if (rows[i + 1] && rows[i + 1][j - 1] && rows[i + 1][j - 1] === "S") {
        if (rows[i + 1] && rows[i + 1][j + 1] && rows[i + 1][j + 1] === "S") {
          total++;
        }
      }
    }
  }

  // S ? S
  // ? A ?
  // M ? M
  if (rows[i - 1] && rows[i - 1][j - 1] && rows[i - 1][j - 1] === "S") {
    if (rows[i - 1] && rows[i - 1][j + 1] && rows[i - 1][j + 1] === "S") {
      if (rows[i + 1] && rows[i + 1][j - 1] && rows[i + 1][j - 1] === "M") {
        if (rows[i + 1] && rows[i + 1][j + 1] && rows[i + 1][j + 1] === "M") {
          total++;
        }
      }
    }
  }

  // S ? M
  // ? A ?
  // S ? M
  if (rows[i - 1] && rows[i - 1][j - 1] && rows[i - 1][j - 1] === "S") {
    if (rows[i - 1] && rows[i - 1][j + 1] && rows[i - 1][j + 1] === "M") {
      if (rows[i + 1] && rows[i + 1][j - 1] && rows[i + 1][j - 1] === "S") {
        if (rows[i + 1] && rows[i + 1][j + 1] && rows[i + 1][j + 1] === "M") {
          total++;
        }
      }
    }
  }


  return total;
}

let found_xmass = 0;

for (let i = 0; i < rows.length; i++) {
  for (let j = 0; j < rows[i].length; j++) {
    found_xmass += find_xmas(rows[i][j], i, j);
  }
}

console.log({ found_xmass });

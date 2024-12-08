const fs = require("fs");

var buffer, input, rows;

try {
  buffer = fs.readFileSync(__dirname + "/input.txt", "utf8");
} catch (e) {
  throw e;
}

input = buffer.toString();
rows = input.split("\n").map(el => el.split(""));

function find_xmas(letter, i, j) {
  let total = 0;
  if (letter !== 'X') return total; // This aint it fam

  // If the coords exists, check for the letter
  // S ? ? ? ? ? ?
  // ? A ? ? ? ? ?
  // ? ? M ? ? ? ?
  // ? ? ? X ? ? ?
  // ? ? ? ? ? ? ?
  // ? ? ? ? ? ? ?
  // ? ? ? ? ? ? ?
  if (rows[i - 1] && rows[i - 1][j - 1] && rows[i - 1][j - 1] === "M") {
    if (rows[i - 2] && rows[i - 2][j - 2] && rows[i - 2][j - 2] === "A") {
      if (rows[i - 3] && rows[i - 3][j - 3] && rows[i - 3][j - 3] === "S") {
        total++;
      }
    }
  }

  // ? ? ? S ? ? ?
  // ? ? ? A ? ? ?
  // ? ? ? M ? ? ?
  // ? ? ? X ? ? ?
  // ? ? ? ? ? ? ?
  // ? ? ? ? ? ? ?
  // ? ? ? ? ? ? ?
  if (rows[i - 1] && rows[i - 1][j] && rows[i - 1][j] === "M") {
    if (rows[i - 2] && rows[i - 2][j] && rows[i - 2][j] === "A") {
      if (rows[i - 3] && rows[i - 3][j] && rows[i - 3][j] === "S") {
        total++;
      }
    }
  }

  // ? ? ? ? ? ? S
  // ? ? ? ? ? A ?
  // ? ? ? ? M ? ?
  // ? ? ? X ? ? ?
  // ? ? ? ? ? ? ?
  // ? ? ? ? ? ? ?
  // ? ? ? ? ? ? ?
  if (rows[i - 1] && rows[i - 1][j + 1] && rows[i - 1][j + 1] === "M") {
    if (rows[i - 2] && rows[i - 2][j + 2] && rows[i - 2][j + 2] === "A") {
      if (rows[i - 3] && rows[i - 3][j + 3] && rows[i - 3][j + 3] === "S") {
        total++;
      }
    }
  }

  // ? ? ? ? ? ? ?
  // ? ? ? ? ? ? ?
  // ? ? ? ? ? ? ?
  // ? ? ? X M A S
  // ? ? ? ? ? ? ?
  // ? ? ? ? ? ? ?
  // ? ? ? ? ? ? ?
  if (rows[i] && rows[i][j + 1] && rows[i][j + 1] === "M") {
    if (rows[i] && rows[i][j + 2] && rows[i][j + 2] === "A") {
      if (rows[i] && rows[i][j + 3] && rows[i][j + 3] === "S") {
        total++;
      }
    }
  }

  // ? ? ? ? ? ? ?
  // ? ? ? ? ? ? ?
  // ? ? ? ? ? ? ?
  // ? ? ? X ? ? ?
  // ? ? ? ? M ? ?
  // ? ? ? ? ? A ?
  // ? ? ? ? ? ? S
  if (rows[i + 1] && rows[i + 1][j + 1] && rows[i + 1][j + 1] === "M") {
    if (rows[i + 2] && rows[i + 2][j + 2] && rows[i + 2][j + 2] === "A") {
      if (rows[i + 3] && rows[i + 3][j + 3] && rows[i + 3][j + 3] === "S") {
        total++;
      }
    }
  }

  // ? ? ? ? ? ? ?
  // ? ? ? ? ? ? ?
  // ? ? ? ? ? ? ?
  // ? ? ? X ? ? ?
  // ? ? ? M ? ? ?
  // ? ? ? A ? ? ?
  // ? ? ? S ? ? ?
  if (rows[i + 1] && rows[i + 1][j] && rows[i + 1][j] === "M") {
    if (rows[i + 2] && rows[i + 2][j] && rows[i + 2][j] === "A") {
      if (rows[i + 3] && rows[i + 3][j] && rows[i + 3][j] === "S") {
        total++;
      }
    }
  }

  // ? ? ? ? ? ? ?
  // ? ? ? ? ? ? ?
  // ? ? ? ? ? ? ?
  // ? ? ? X ? ? ?
  // ? ? M ? ? ? ?
  // ? A ? ? ? ? ?
  // S ? ? ? ? ? ?
  if (rows[i + 1] && rows[i + 1][j - 1] && rows[i + 1][j - 1] === "M") {
    if (rows[i + 2] && rows[i + 2][j - 2] && rows[i + 2][j - 2] === "A") {
      if (rows[i + 3] && rows[i + 3][j - 3] && rows[i + 3][j - 3] === "S") {
        total++;
      }
    }
  }

  // ? ? ? ? ? ? ?
  // ? ? ? ? ? ? ?
  // ? ? ? ? ? ? ?
  // S A M X ? ? ?
  // ? ? ? ? ? ? ?
  // ? ? ? ? ? ? ?
  // ? ? ? ? ? ? ?
  if (rows[i] && rows[i][j - 1] && rows[i][j - 1] === "M") {
    if (rows[i] && rows[i][j - 2] && rows[i][j - 2] === "A") {
      if (rows[i] && rows[i][j - 3] && rows[i][j - 3] === "S") {
        total++;
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

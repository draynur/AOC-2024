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
  let results, expressions = [], donts = [], dos = [];

  // Match mul(x,y) from row as string
  const expression_regex = /mul\((\d+)\,(\d+)\)/g;
  const dont_regex = /don't\(\)/g;
  const do_regex = /do\(\)/g;


  /*
   {
    expressions: [
        14,   58,   75,  149,  168,  191,  235,  250,  291,  318,
       356,  391,  409,  420,  445,  459,  487,  499,  533,  555,
       570,  583,  595,  633,  664,  683,  706,  727,  759,  791,
       808,  832,  849,  884,  911,  941,  971,  984, 1009, 1045,
      1063, 1077, 1143, 1165, 1193, 1209, 1235, 1264, 1286, 1305,
      1332, 1351, 1397, 1422, 1448, 1462, 1488, 1501, 1589, 1619,
      1659, 1713, 1746, 1758, 1769, 1791, 1803, 1834, 1874, 1892,
      1908, 1922, 1949, 1967, 2016, 2037, 2052, 2093, 2131, 2217,
      2236, 2268, 2281, 2301, 2331, 2369, 2406, 2432, 2452, 2484,
      2509, 2540, 2558, 2572, 2584, 2609, 2636, 2678, 2693, 2721,
      ... 11 more items
    ],
    donts: [
       113,  183, 1319,
      1547, 1601, 1679,
      1728, 1821, 1935,
      2116, 2175, 2477
    ],
    dos: [ 213, 441, 743, 861, 957, 1475 ]
  }

  */

  while ((results = expression_regex.exec(row)) !== null) {
    expressions.push(results);
  }

  while ((results = dont_regex.exec(row)) !== null) {
    donts.push(results.index);
  }

  while ((results = do_regex.exec(row)) !== null) {
    dos.push(results.index);
  }


  // Find safe zones? 0 -> first dont -> first do -> second dont

  let do_index = 0, dont_index = 0;

  for (let i = 0; i < expressions.length; i++) {
    const expression = expressions[i];
    const expression_index = expression.index

    if (expression_index < donts[dont_index]) {
      while (donts[dont_index] < expression_index && dont_index < donts.length) {
        dont_index++;
      }

      if (!(expression_index < donts[dont_index])) {
        sum += Number(expression[1]) * Number(expression[2])
      }
      // sum += Number(expression[1]) * Number(expression[2])
      // if (dos[do_index] < expression_index && do_index < dos.length) {
      //   do_index++;
      // }
      // while (dos[do_index] < expression_index && do_index < dos.length) {
      //   do_index++;
      // }
    } else {
      if (expression_index > dos[do_index]) {

        while (donts[dont_index] < expression_index && dont_index < donts.length) {
          dont_index++;
        }

        if (!(expression_index < donts[dont_index])) {
          sum += Number(expression[1]) * Number(expression[2])
        }

      } else {
        while (dos[do_index] < expression_index && do_index < dos.length) {
          do_index++;
        }

        if (expression_index > dos[do_index]) {
          sum += Number(expression[1]) * Number(expression[2])
        }
      }
    }
  }
  // console.log({ expressions, donts, dos });

  return accumulator + sum;
}, 0);

console.log({ multiply_sum });

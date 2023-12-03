// You try to ask why they can't just use a weather machine ("not powerful enough") and where they're even sending you ("the sky") and why your map looks mostly blank ("you sure ask a lot of questions") and hang on did you just say the sky ("of course, where do you think snow comes from") when you realize that the Elves are already loading you into a trebuchet ("please hold still, we need to strap you in").

// As they're making the final adjustments, they discover that their calibration document (your puzzle input) has been amended by a very young Elf who was apparently just excited to show off her art skills. Consequently, the Elves are having trouble reading the values on the document.

// The newly-improved calibration document consists of lines of text; each line originally contained a specific calibration value that the Elves now need to recover. On each line, the calibration value can be found by combining the first digit and the last digit (in that order) to form a single two-digit number.
require('path');
const fs = require('fs');

const test = __dirname + '/data/day1/test.txt';
const test_2 = __dirname + '/data/day1/test_day1_2.txt';
const input = __dirname + '/data/day1/input.txt';

const numbersSpelled = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

async function readThisFile(filePath, cb) {
  return await fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error(`Got an error trying to read the file: ${err.message}`);
    }
    cb(data.toString().trim().split('\n'));
  });
}

async function setup() {
  readThisFile(input, getStringInput);
}

setup();

function getStringInput(arrayInput) {
  let total = 0;
  for (const stringInput of arrayInput) {
    const numbersInput = getNumbersInput(stringInput);
    total += concatFirstAndLast(numbersInput);
  }
  console.log(total);
}

function getNumbersInput(stringInput) {
  const charList = stringInput.trim().split('');
  const numbersInput = [];
  for (let index = 0; index < charList.length; index++) {
    const char = charList[index];
    // Piece for part 2 //
    const number = numberSpelled(stringInput, index);
    if (number) {
      numbersInput.push(number);
      continue
    } else
    // -- end -- //
    if (!isNaN(char)) {
      numbersInput.push(char);
    };
  }
  return numbersInput;
}

function numberSpelled(stringInput,index) {
  for (const number of numbersSpelled) {
    if (stringInput.startsWith(number, index)) {
      return spelledToNumber(number);
    };
  }
}

function concatFirstAndLast(numbersInput) {
  const firstNumber = numbersInput[0];
  const lastNumber = numbersInput[numbersInput.length - 1];
  return Number(firstNumber + lastNumber);
}

// Piece for part 2 //
function spelledToNumber(spelled) {
  switch (spelled) {
    case "one":
      return '1'
    case "two":
      return '2'
    case "three":
      return '3'
    case "four":
      return '4'
    case "five":
      return '5'
    case "six":
      return '6'
    case "seven":
      return '7'
    case "eight":
      return '8'
    case "nine":
      return '9'
    default:
      0;
  }
}
// -- end -- //
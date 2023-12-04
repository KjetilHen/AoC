// --- Day 3: Gear Ratios ---

// You and the Elf eventually reach a gondola lift station; he says the gondola lift will take you up to the water source, but this is as far as he can bring you. You go inside.

// It doesn't take long to find the gondolas, but there seems to be a problem: they're not moving.

// "Aaah!"

// You turn around to see a slightly-greasy Elf with a wrench and a look of surprise. "Sorry, I wasn't expecting anyone! The gondola lift isn't working right now; it'll still be a while before I can fix it." You offer to help.

// The engineer explains that an engine part seems to be missing from the engine, but nobody can figure out which one. If you can add up all the part numbers in the engine twoDimArray, it should be easy to work out which part is missing.

// The engine twoDimArray (your puzzle input) consists of a visual representation of the engine. There are lots of numbers and symbols you don't really understand, but apparently any number adjacent to a symbol, even diagonally, is a "part number" and should be included in your sum. (Periods (.) do not count as a symbol.)

// Here is an example engine twoDimArray:

// 467..114..
// ...*......
// ..35..633.
// ......#...
// 617*......
// .....+.58.
// ..592.....
// ......755.
// ...$.*....
// .664.598..

// In this twoDimArray, two numbers are not part numbers because they are not adjacent to a symbol: 114 (top right) and 58 (middle right). Every other number is adjacent to a symbol and so is a part number; their sum is 4361.

// Of course, the actual engine twoDimArray is much larger. What is the sum of all of the part numbers in the engine twoDimArray?

require('path');
const fs = require('fs');



const test = fs.readFileSync('data/day3/test_1.txt').toString();
// const test_2 = fs.readFileSync('data/day3/test_2.txt');
const input = fs.readFileSync('data/day3/input.txt').toString();

function execute() {
    const twoDimArray = toTwoDimArray(input);
    // console.log(
        calculateTotal(twoDimArray)
        // );
};

execute();

function toTwoDimArray(input) {
    const twoDimArray = [];
    const lines = input.split('\n'); // to array of lines
    for (let index = 0; index < lines.length; index++) {
        twoDimArray.push(lines[index].trim().split(''));
    }
    return twoDimArray;
}

function calculateTotal(twoDimArray) {
    const dx = [-1, -1, -1, 0, 0, 1, 1, 1];
    const dy = [-1, 0, 1, -1, 1, -1, 0, 1];
    let totalSum = 0;

    let gears = [];
    let gearParts = [];
    for (let i = 0; i < twoDimArray.length; i++) {
        let j = 0;
        while (j < twoDimArray[i].length) {
            if (twoDimArray[i][j] === '*') { // check if it's an asterisk
                gears.push({x: i, y: j});
                j++;
            } else if (!isNaN(twoDimArray[i][j])) {
                let numStr = '';
                let numberObject = {
                    'indexes': []
                }
                while (j < twoDimArray[i].length && !isNaN(twoDimArray[i][j])) {
                    numStr += twoDimArray[i][j];
                    numberObject['indexes'].push({x: i, y: j});
                    j++;
                }
                let num = Number(numStr);
                numberObject['number'] = num;
                gearParts.push(numberObject);
            }
            else {
                j++;
            }
        }
    }
    for (let i = 0; i < gears.length; i++) {
        const gear = gears[i];
        gear['parts'] = []
        for (let k = 0; k < 8; k++) { // check all 8 directions
            let ni = gear.x + dx[k];
            let nj = gear.y + dy[k]; // adjust column index because we've moved past the number
            for (let i = 0; i < gearParts.length; i++) {
                const parts = gearParts[i];
                if (ni >= 0 && ni < twoDimArray.length && nj >= 0 && nj < 140 && parts['indexes'].some((index) => index.x === ni && index.y === nj)) {
                    if (!gear['parts'].includes(parts.number)) gear['parts'].push(parts.number);
                }
            }
        }
    }
    console.log(gears.filter((gear) => gear.parts.length === 2).reduce((acc, current) => {
        return acc + (current.parts[0] * current.parts[1]);
    }, 0));
}




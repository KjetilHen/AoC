require('path');
const fs = require('fs');

const test = fs.readFileSync('data/day11/test_1.txt').toString();
const input = fs.readFileSync('data/day11/input.txt').toString();

let universe;
let expandedUniverse;

function execute(input) {
    universe = toUniverse(input);
    expandedUniverse = toExpandedUniverse(universe);
    rotateTwoDimArray(expandedUniverse);
}

execute(test);

function toUniverse(input) {
    const splitInRows = input.split("\r\n");
    return splitInRows.map(row => Array.from(row));
}

function toExpandedUniverse(input) {
    let copy = input.slice();
    for (let x = 0; x < copy.length; x++) { // loop through rows
        const row = copy[x];
        if (row.every(item => item === ".")) {
            copy = insertRow(copy, x, row);
            x++;
        }
    }

    return copy;
}

function insertRow(array, index, newItem) {
    return [  // part of the array before the specified index
        ...array.slice(0, index),
        // inserted item
        newItem,
        // part of the array after the specified index
        ...array.slice(index)
    ];
}

function rotateTwoDimArray(input) {
    console.table(input);
    let rotatedArray = [...input];
    for (let y = 0; y < input.length; y++) {
        for (let x = 0; x < input[y].length; x++) {
            rotatedArray[(input[y].length - 1) - x][(input.length - 1) - y] = input[y][x];
            // console.log("🚀 ~ file: day11_1.js:51 ~ rotateTwoDimArray ~ y + (input.length - 1) - y:", (input.length - 1) - y)
            // console.log("🚀 ~ file: day11_1.js:51 ~ rotateTwoDimArray ~ x + (input[y].length - 1) - x:", (input[y].length - 1) - x)
        }
    }

    console.table(rotatedArray);
}


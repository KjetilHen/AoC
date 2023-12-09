// --- Part Two ---

// Of course, it would be nice to have even more history included in your report. Surely it's safe to just extrapolate backwards as well, right?

// For each history, repeat the process of finding differences until the sequence of differences is entirely zero. Then, rather than adding a zero to the end and filling in the next values of each previous sequence, you should instead add a zero to the beginning of your sequence of zeroes, then fill in new first values for each previous sequence.

// In particular, here is what the third example history looks like when extrapolating back in time:

// 5  10  13  16  21  30  45
//   5   3   3   5   9  15
//    -2   0   2   4   6
//       2   2   2   2
//         0   0   0

// Adding the new values on the left side of each sequence from bottom to top eventually reveals the new left-most history value: 5.

// Doing this for the remaining example data above results in previous values of -3 for the first history and 0 for the second history. Adding all three new values together produces 2.

// Analyze your OASIS report again, this time extrapolating the previous value for each history. What is the sum of these extrapolated values?

require('path');
const fs = require('fs');

const test = fs.readFileSync('data/day9/test_1.txt').toString();
const input = fs.readFileSync('data/day9/input.txt').toString();

function execute(input) {
    // loop 1: door input
    // elke regel naar array van getallen
    // end loop 1
    const histories = input.split('\r\n').map(toNumberArray);
    // console.log("🚀 ~ file: day9_2.js:32 ~ execute ~ histories:", histories)
    total = 0;
    for (let i = 0; i < histories.length; i++) {
        // if (i > 0) break;
        const historyAndPredictions = getPredictions(histories[i], []);
        total += extrapolatedValuesSum(historyAndPredictions);
    };
    console.log(total);
    // loop 2: door array van getallen
    //   verschil = getallen[i] - getallen[i-1]
    //   push verschil
    // allSame true  stop; false recurse door arrary verschillen
}

function allSame(numbers) {
    return numbers.every((number, i, arr) => number === arr[0]);
}

function toNumberArray(input) {
    return input.split(' ').map(Number);
}

function extrapolatedValuesSum(predictions) {
    let sumExtrapolatedValues = 0;
    for (let index = predictions.length - 1; index >= 0; index--) {
            const prediction = predictions[index];
            const lastPrediction = predictions[index + 1]?.[0] ?? 0;
            const extrapolated = prediction[0] - lastPrediction;
            predictions[index].unshift(extrapolated);
            if (index === 0) {
                sumExtrapolatedValues += extrapolated;
            }
    }
    return sumExtrapolatedValues;
}

function getPredictions(history, historyAndPredictions) {
    historyAndPredictions.push(history);
    if (allSame(history)) {
        return historyAndPredictions;
    };
    const predictions = [];
    for (let i = 1; i < history.length; i++) {
        const number = history[i];
        const diff = number - history[i - 1];
        predictions.push(diff);
    }
    return getPredictions(predictions, historyAndPredictions);
}

console.time("Total runtime");
execute(input);
console.timeEnd("Total runtime");
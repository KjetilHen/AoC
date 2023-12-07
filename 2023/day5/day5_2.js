// --- Part Two ---

// Everyone will starve if you only plant such a small number of seeds. Re-reading the almanac, it looks like the seeds: line actually describes ranges of seed numbers.

// The values on the initial seeds: line come in pairs. Within each pair, the first value is the start of the range and the second value is the length of the range. So, in the first line of the example above:

// seeds: 79 14 55 13

// This line describes two ranges of seed numbers to be planted in the garden. The first range starts with seed number 79 and contains 14 values: 79, 80, ..., 91, 92. The second range starts with seed number 55 and contains 13 values: 55, 56, ..., 66, 67.

// Now, rather than considering four seed numbers, you need to consider a total of 27 seed numbers.

// In the above example, the lowest location number can be obtained from seed number 82, which corresponds to soil 84, fertilizer 84, water 84, light 77, temperature 45, humidity 46, and location 46. So, the lowest location number is 46.

// Consider all of the initial seed numbers listed in the ranges on the first line of the almanac. What is the lowest location number that corresponds to any of the initial seed numbers?
require('path');
const fs = require('fs');

const test = fs.readFileSync('data/day5/test_1.txt').toString();
// const test_2 = fs.readFileSync('data/day4/test_2.txt');
const input = fs.readFileSync('data/day5/input.txt').toString();


function execute(input) {
    const [ seeds, ...maps ] = input.trim().split('\r\n\r\n');
    console.log("🚀 ~ file: day5_2.js:28 ~ execute ~ getSeedRanges(seeds)):", getSeedRanges(seeds));
    getLocation(maps.map(parseMapToNumbers), getSeedRanges(seeds));
}

function getSeedRanges(seedsAsString) {
    return seedsAsString.match(/\d+ \d+/g).map((seed) => {
        const [start, length] = seed.split(' ');
        return [Number(start), Number(start) + Number(length) -1]
    });
}

function parseMapToNumbers(map) {
    const preparedMap = map.split("\r\n");
    preparedMap.shift(); // remove title of map
    const mappedToOnlyNumbers = preparedMap.map((item) => (item.match(/\d+/g).map(Number)));
    mappedToOnlyNumbers.sort((a, b) => (a[1] - b[1]));
    return mappedToOnlyNumbers;
}

function getLocation(maps, seeds) {
    let index = 1;
    for (const map of maps) {
        seeds = getNewDestinations(map, seeds);
        console.log(index, seeds);
        index++;
    }seeds.sort((a,b) => a[0] - b[0])
    // return seeds;
}

function getNewDestinations(map, sources) {
    console.log("🚀 ~ file: day5_2.js:53 ~ getNewDestinations ~ map, sources:", sources)
    while (sources.length > 0) {

        const [sStart, sEnd] = sources.pop();
        for (let i = 0; i < map.length; i++) {
            const [mDest, mStart, mLength] = map[i];
            console.log("🚀 ~ file: day5_2.js:58 ~ getNewDestinations ~ lastRange:", [sStart, sEnd])
            // console.log("🚀 ~ file: day5_2.js:60 ~ getNewDestinations ~ mRange:", [mDest, mStart, mLength],"\n")
            const startOverlap = Math.max(sStart, mStart);
            // console.log("🚀 ~ file: day5_2.js:60 ~ getNewDestinations ~ startOverlap:", startOverlap)
            const endOverlap = Math.min(sEnd, mStart + mLength -1);
            // console.log("🚀 ~ file: day5_2.js:62 ~ getNewDestinations ~ endOverlap:", endOverlap)
            if (startOverlap < endOverlap) {
                newRanges.push([startOverlap - mStart + mDest, endOverlap - mStart + mDest])
                console.log("🚀 ~ file: day5_2.js:72 ~ getNewDestinations ~ startOverlap > sStart:", startOverlap > sStart)
                console.log("🚀 ~ file: day5_2.js:76 ~ getNewDestinations ~ mStart + mLength > endOverlap:", mStart + mLength -1 > endOverlap)
                if (startOverlap > sStart) {
                    sources.push([sStart, startOverlap])
                }
                if (mStart + mLength -1 > endOverlap) {
                    sources.push([endOverlap, sEnd])
                }
                break;
            }
            newRanges.push([sStart, sEnd]);
        };
    };
    console.log("🚀 ~ file: day5_2.js:58 ~ getNewDestinations ~ newRanges:", newRanges)

    return sources;
}

console.time('Total runtime');
execute(test);
console.timeEnd('Total runtime');
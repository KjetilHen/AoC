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

function getSeedsAndMap(input) {
    const toArray = input.trim().split('\r\n\r\n');
    const seedRanges = getSeeds(toArray[0]);
    const maps = [];
    for (let i = 1; i < toArray.length; i++) {
        const mappedToObject = mapToObject(toArray[i]);
        const destinations = mapToSourceToDestination(mappedToObject);
        maps.push(destinations);
    }
    return {
        seedRanges,
        maps
    }
}

function getSeeds(seedsAsString) {
    return seeds = seedsAsString.match(/\d+/g).map((string) => +string);
}

function execute(input) {
    const { seedRanges, maps}= getSeedsAndMap(input);
    const rangePairs = toRangPairs(seedRanges);
    let currentSmallest;
    let cycles = 0;
    for (let i = 0; i < rangePairs.length; i++) {
        for (let j = 0; j < rangePairs[i][1]; j++) {
            const temp = getSmallestNumber(maps, j + rangePairs[i][0]);
            if (!currentSmallest) currentSmallest = temp;
            if (temp < currentSmallest ) {
                currentSmallest = temp;
            }
            cycles++
        }
    }
    console.info("Number of Cycles: ", cycles);
    console.info("SmallestNumber: ", currentSmallest);
}

function mapToObject(map) {
    const onlyNumbers = map.split(":\r\n")[1];
    return onlyNumbers.split("\r\n").map((item) => {
        const ranges = item.match(/\d+/g);
        return {
            'destinationRangeStart': +ranges[0],
            'sourceRangeStart': +ranges[1],
            'rangeLength': +ranges[2]
        }
    });
}

function mapToSourceToDestination(mappedObject) {
    return mappedObject.reduce((acc, current) => {
        const element = {
            "startIndexSource": current.sourceRangeStart,
            "endIndexSource": current.sourceRangeStart + current.rangeLength-1,
            "startIndexDestination": current.destinationRangeStart,
            "endIndexDestination": current.destinationRangeStart + current.rangeLength-1};
        acc.push(element);
        return acc;
    },[]);
}

function getSmallestNumber(maps, seed) {
    const seedLocation = [];
    seedLocation.push(seed);
    maps.forEach((map, mapIndex) => {
        toLocation(seedLocation, map, mapIndex);
    });
    return seedLocation.pop()
}

function toLocation(seedLocation, map, mapIndex) {
    const copyOfLocation = [...seedLocation];
    for (let i = 0; i < map.length; i++) {
        const loc = map[i];
        if (copyOfLocation[mapIndex] >= loc.startIndexSource && copyOfLocation[mapIndex] <= loc.endIndexSource) {
            seedLocation.push(loc.startIndexDestination +  (copyOfLocation[mapIndex] - loc.startIndexSource));
            continue;
        }
    }
    if (!seedLocation[mapIndex+1]) seedLocation.push(copyOfLocation[mapIndex]);
    return seedLocation;
}

function toRangPairs(seedRanges) {
    const rangePairs = [];
    for (let index = 0; index < seedRanges.length; index+=2) {
        rangePairs.push(seedRanges.slice(index, index+2))
    }
    return rangePairs;
}

console.time('StartTimer')
execute(test);
console.timeEnd('StartTimer');

// --- Day 8: Haunted Wasteland ---

// You're still riding a camel across Desert Island when you spot a sandstorm quickly approaching. When you turn to warn the Elf, she disappears before your eyes! To be fair, she had just finished warning you about ghosts a few minutes ago.

// One of the camel's pouches is labeled "maps" - sure enough, it's full of documents (your puzzle input) about how to navigate the desert. At least, you're pretty sure that's what they are; one of the documents contains a list of left/right instructions, and the rest of the documents seem to describe some kind of network of labeled nodes.

// It seems like you're meant to use the left/right instructions to navigate the network. Perhaps if you have the camel follow the same instructions, you can escape the haunted wasteland!

// After examining the maps for a bit, two nodes stick out: AAA and ZZZ. You feel like AAA is where you are now, and you have to follow the left/right instructions until you reach ZZZ.

// This format defines each node of the network individually. For example:

// RL

// AAA = (BBB, CCC)
// BBB = (DDD, EEE)
// CCC = (ZZZ, GGG)
// DDD = (DDD, DDD)
// EEE = (EEE, EEE)
// GGG = (GGG, GGG)
// ZZZ = (ZZZ, ZZZ)

// Starting with AAA, you need to look up the next element based on the next left/right instruction in your input. In this example, start with AAA and go right (R) by choosing the right element of AAA, CCC. Then, L means to choose the left element of CCC, ZZZ. By following the left/right instructions, you reach ZZZ in 2 steps.

// Of course, you might not find ZZZ right away. If you run out of left/right instructions, repeat the whole sequence of instructions as necessary: RL really means RLRLRLRLRLRLRLRL... and so on. For example, here is a situation that takes 6 steps to reach ZZZ:

// LLR

// AAA = (BBB, BBB)
// BBB = (AAA, ZZZ)
// ZZZ = (ZZZ, ZZZ)

// Starting at AAA, follow the left/right instructions. How many steps are required to reach ZZZ?

require('path');
const fs = require('fs');

const test = fs.readFileSync('data/day8/test_1.txt').toString();
const test2 = fs.readFileSync('data/day8/test_2.txt').toString();
const test3 = fs.readFileSync('data/day8/test_3.txt').toString();
const input = fs.readFileSync('data/day8/input.txt').toString();

function execute(input) {
    const [instructionsString, ...network] = input.trim().split('\r\n');
    const instructions = stringToArray(instructionsString);
    console.log("🚀 ~ file: day8_2.js:46 ~ execute ~ instructions:", instructions.length);
    const nodes = toNodes(network);

    let keyIndex = 0;
    let startingKeys = [];
    for (const key of nodes.keys()) {
        if (key.endsWith('A')) startingKeys.push(key);
    }

    let steps = 0;
    let stepsPerKey = [];
    let index = 0;
    console.log("🚀 ~ file: day8_2.js:61 ~ execute ~ startValues:", steps, startingKeys);
    while(keyIndex < startingKeys.length) {
        steps++
        const key = startingKeys[keyIndex];
        startingKeys[keyIndex] = nodes.get(key)[instructions[index]];
        if (startingKeys[keyIndex].endsWith('Z')) {
            stepsPerKey.push(steps);
            steps = 0;
            keyIndex++;
        }
        index++;
        if (index === instructions.length) index = 0
    }
    console.log(stepsPerKey, lcm(stepsPerKey, instructions));
}

function toNodes(network) {
    const copy = network.slice();
    copy.shift(); // remove first line, because it's an empty string
    return copy.reduce((acc, current, index) => {
        const [key, L, R] = current.match(/[A-Z0-9]{3}/g);
        acc.set(key, {L, R});
        return acc;
    }, new Map())
}

function lcm(stepsPerKey, instructions) {
    const product = stepsPerKey.reduce((acc, current) =>  acc * (current / instructions.length));
    if (stepsPerKey.every((key) => isPrime(key / instructions.length))) {
        return product
    }
    return 'no effort'
}

function isPrime(number) {
    let isPrime = true;
    for (let i = 2; i < number; i++) {
        if (number % i == 0) {
            isPrime = false;
            break;
        }
    }
    return isPrime;
}

function stringToArray(instructions) {
    return instructions.trim().split('');
}

console.time("Total runtime");
execute(input);
console.timeEnd("Total runtime");

    // instructionLoop: while (!startingNodes.every((node) => node.endsWith('Z'))) {
    //     steps++
    //     for (let j = 0; j < startingNodes.length; j++) {
    //         const key = startingNodes[0];
    //         startingNodes[0] = nodes.get(key)[instructions[i]];
    //     }
    //     console.log("🚀 ~ file: day8_2.js:61 ~ execute ~ startingNodes:", steps, instructions[i], startingNodes)
    // i++;
    // if (i === instructions.length) i = 0
    // }
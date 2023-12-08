// --- Part Two ---

// To make things a little more interesting, the Elf introduces one additional rule. Now, J cards are jokers - wildcards that can act like whatever card would make the hand the strongest type possible.

// To balance this, J cards are now the weakest individual cards, weaker even than 2. The other cards stay in the x order: A, K, Q, T, 9, 8, 7, 6, 5, 4, 3, 2, J.

// J cards can pretend to be whatever card is best for the purpose of determining hand type; for example, QJJQ2 is now considered four of a kind. However, for the purpose of breaking ties between two hands of the x type, J is always treated as J, not the card it's pretending to be: JKKK2 is weaker than QQQQ2 because J is weaker than Q.

// Now, the above example goes very differently:

// 32T3K 765
// T55J5 684
// KK677 28
// KTJJT 220
// QQQJA 483

//     32T3K is still the only one pair; it doesn't contain any jokers, so its strength doesn't increase.
//     KK677 is now the only two pair, making it the second-weakest hand.
//     T55J5, KTJJT, and QQQJA are now all four of a kind! T55J5 gets rank 3, QQQJA gets rank 4, and KTJJT gets rank 5.

// With the new joker rule, the total winnings in this example are 5905.

// Using the new joker rule, find the rank of every hand in your set. What are the new total winnings?

require('path');
const fs = require('fs');

const test = fs.readFileSync('data/day7/test_1.txt').toString();
const input = fs.readFileSync('data/day7/input.txt').toString();

const cardValues = {"A": 14, "K": 13, "Q": 12, "J": 0, "T": 10, "9": 9,"8": 8, "7": 7, "6": 6, "5": 5, "4": 4, "3": 3, "2": 2};

function execute(input) {
    let handBids = input.split("\r\n").map((handBid) =>  {
            const [hand, bid] = handBid.split(" ");
            return {
            hand,
            bid
        };
    });

    handBids = handBids.map((object) => {
        const [type, strength] = getHandValue(object.hand)
        return {
            strength,
            type,
            ...object,
        }
    });
    handBids.sort((a, b) => {
        if (a.strength > b.strength) return 1;
        if (a.strength < b.strength) return -1;
        return getHighestHandBasedOfCardValue(a, b);
    });
    handBids.forEach((hand) => {
        console.log(hand);
    })
    const totalWinnings = handBids.reduce((acc, current, index) => (acc += Number(current.bid) * (index + 1)), 0);
    console.log(totalWinnings);
}

function getHandValue(hand) {
    const valueAppearances = Object.keys(cardValues).reduce((acc, current) =>  {
        const matches = xKind(hand, current);
        if (matches > 0){
            acc[current] = matches;
        }
        return acc
    }, {});
    const valueOfJ = valueAppearances['J'];
    const onlyAppearances = Object.values(valueAppearances);
    if(fiveOfKind(onlyAppearances, valueOfJ)) {
        // console.log("🚀 ~ file: day7_1.js:125 ~ fiveOfKind");
        return ["FiveOfKind", 6]}
    else if(fourOfKind(onlyAppearances,valueOfJ)) {
        // console.log("🚀 ~ file: day7_1.js:116 ~ fourOfKind");
        return ["FourOfKind", 5]}
    else if(fullHouse(onlyAppearances, valueOfJ)) {
        // console.log("🚀 ~ file: day7_1.js:119 ~ fullHouse");
        return ["FullHouse", 4]}
    else if(threeOfKind(onlyAppearances, valueOfJ)) {
        // console.log("🚀 ~ file: day7_1.js:124 ~ threeOfKind");
        return ["ThreeOfKind", 3]}
    else if(twoPair(onlyAppearances, valueOfJ)) {
        // console.log("🚀 ~ file: day7_1.js:128 ~ twoPair");
        return ["Two Pair", 2]}
    else if(onePair(onlyAppearances, valueOfJ)) {
        // console.log("🚀 ~ file: day7_1.js:132 ~ onePair");
        return ["One pair", 1]}
    else if(highestCard(onlyAppearances, valueOfJ)) {
        // console.log("🚀 ~ file: day7_1.js:115 ~ highestCard");
        return ["High card", 0] }
    else {
        return ["no strength", -1]}
}

function fiveOfKind(valueAppearances, valueOfJ) {
    return valueAppearances.includes(5) ||
    (valueOfJ === 1 && valueAppearances.includes(4)) ||
    (valueOfJ === 2 && valueAppearances.includes(3)) ||
    (valueOfJ === 3 && valueAppearances.includes(2)) ||
    (valueOfJ === 4 && valueAppearances.includes(1));
}
function fourOfKind(valueAppearances, valueOfJ) {
    return valueAppearances.includes(4) ||
    (valueOfJ === 1 && valueAppearances.includes(3)) ||
    (valueOfJ === 2 && valueAppearances.filter(value => value === 2).length === 2) ||
    (valueOfJ === 3 && valueAppearances.includes(1));
}
function fullHouse(valueAppearances, valueOfJ) {
    return (valueAppearances.includes(3) && valueAppearances.includes(2)) ||
        valueOfJ === 1 && valueAppearances.filter(value => value === 2).length === 2;
}
function threeOfKind(valueAppearances, valueOfJ) {
    return !valueOfJ && valueAppearances.includes(3) ||
    (valueOfJ === 1 && valueAppearances.includes(2)) ||
    (valueOfJ === 2 && valueAppearances.filter(value => value === 1).length === 3);
}
function twoPair(valueAppearances, valueOJ) {
    return !valueOJ && valueAppearances.filter(value => value === 2).length === 2;
}
function onePair(valueAppearances,valueOfJ) {
    return !valueOfJ && valueAppearances.filter(value => value === 2).length === 1 ||
    (valueOfJ === 1 && valueAppearances.filter(value => value === 1).length === 5);
}

function highestCard(valueAppearances,valueOfJ) {
    return !valueOfJ && valueAppearances.filter(value => value === 1).length === 5;
}

function xKind(hand, cardValue) {
    return hand.match(new RegExp(`${cardValue}`, 'g'))?.length ?? 0;
}

function getHighestHandBasedOfCardValue(handBidA, handBidB) {
    const handASplitted = handBidA.hand.split("");
    const handBSplitted = handBidB.hand.split("");
    for (let index = 0; index < handASplitted.length; index++) {
        if (cardValues[handASplitted[index]] === cardValues[handBSplitted[index]]) continue;
        if (cardValues[handASplitted[index]] < cardValues[handBSplitted[index]]) {return -1}
        if (cardValues[handASplitted[index]] > cardValues[handBSplitted[index]]) {return 1}
    }
}

console.time("Total runtime");
execute(input);
console.timeEnd("Total runtime");
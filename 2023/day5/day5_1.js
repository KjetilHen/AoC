const seedsAsString = `79 14 55 13`;

const seedToSoilMapString = `3356468240 2934525445 29117552
4275689831 4042213712 19277465
949730239 1589971986 381295142
2205130246 3387543719 106537240
2442849314 2188173171 261901063
2027919967 875104547 177210279
4258838211 4278115676 16851620
1969509044 3125327238 8268732
3602491835 652291761 28146990
3630638825 3122528592 2798646
1725486280 3012647256 109881336
3232765106 192460045 36910273
4042213712 4061491177 216624499
2311667486 3256361891 131181828
2849273982 3133595970 102505596
1365732141 2963642997 49004259
3093408594 3494080959 139356512
3385585792 1971267128 216906043
2954083526 56695294 82629774
1331025381 2483732118 34706760
3322810356 2450074234 33657884
3269675379 139325068 53134977
2704750377 680438751 144523605
1977777776 824962356 50142191
929469914 3236101566 20260325
0 1363064706 224603332
1835367616 2800384017 134141428
647524775 2518438878 281945139
2951779578 1587668038 2303948
1414736400 1052314826 310749880
224603332 229370318 422921443
3036713300 0 56695294
`;

const testSeedToSoilString = `
50 98 2
52 50 48
`;

function mapToObject(map) {
    return map.trim().split('\n').map((item) => {
        const ranges = item.split(' ');
        return { 
            'destinationRangeStart': ranges[0],
            'sourceRangeStart': ranges[1],
            'rangeLength': ranges[2]
        }
    });
}

function mapToSourceToDestination(mappedObject) {
    return mappedObject.reduce((acc, current) => {
        const element = {
            "startIndexSource": current.sourceRangeStart, 
            "endIndexSource": (+current.sourceRangeStart + +current.rangeLength-1).toString(), 
            "startIndexDestination": current.destinationRangeStart, 
            "endIndexDestination": (+current.destinationRangeStart + +current.rangeLength-1).toString()};
        acc.push(element);
        return acc;
    },[]);
}

function execute() {
    const mappedToObject = mapToObject(testSeedToSoilString);
    const seedToSoilMap = mapToSourceToDestination(mappedToObject);
    getDestination(seedToSoilMap, seedsAsString);
}

function getDestination(seedToSoilMap, seedsAsString) {
    const seeds = seedsAsString.match(/\d+/g);
    const destinationOfSeeds = [];
    seeds.forEach(element => {
        for (let i = 0; i < seedToSoilMap.length; i++) {
            const seed = seedToSoilMap[i];
            // console.log(+element, +seed.startIndexSource, +seed.endIndexSource);
            if(+element >= +seed.startIndexSource && +element <= +seed.endIndexSource) {
                const diff = +seed.endIndexSource - +element;
                destinationOfSeeds.push([element, (+seed.endIndexDestination - diff).toString()]);
                continue;
            } 
        }
        if (destinationOfSeeds.findIndex((seed) => seed[0] === element) === -1) destinationOfSeeds.push([element, element]);
    });
    console.log(destinationOfSeeds);
}

execute();

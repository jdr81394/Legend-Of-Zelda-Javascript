
const o = undefined;


const openingScreen = {
    assetPath: "./assets/overworld/",
    audioPath: "./assets/audio/overworld.mp3",

    screen: [
        [o, o, o, o, o, o, o, o, { screen: "screenC", type: "door", coX: 8, coY: 11 }, { screen: "screenC", type: "door", coX: 9, coY: 11 }, o, o, o, o, o, o, o, o],
        [o, "1", "1", "1", "1", "1", "1", "1", 0, 0, "1", "1", "1", "1", "1", "1", "1", o],
        [o, "1", "1", "1", "1", { type: "door", tile: 0, coX: 9, coY: 11, screen: "shop" }, "1", "2", 0, 0, "1", "1", "1", "1", "1", "1", "1", o],
        [o, "1", "1", "1", "2", 0, 0, 0, 0, 0, "1", "1", "1", "1", "1", "1", "1", o],
        [o, "1", "1", "2", 0, 0, 0, 0, 0, 0, "1", "1", "1", "1", "1", "1", "1", o],
        [o, "1", "2", 0, 0, 0, 0, 0, 0, 0, "3", "1", "1", "1", "1", "1", "1", o],
        [{ type: "door", screen: "screenA", coX: 16, coY: 6 }, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, { screen: "screenE", type: "door", coX: 1, coY: 6 }],
        [o, "5", "4", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, "5", "5", o],
        [o, "1", "1", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, "1", "1", o],
        [o, "1", "1", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, "1", "1", o],
        [o, "1", "1", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, "1", "1", o],
        [o, "1", "1", "5", "5", "5", "5", "5", "5", "5", "5", "5", "5", "5", "5", "1", "1", o],
        [o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o],
    ]
}

const shop = {
    assetPath: "./assets/shop/", // change this to shop/
    audioPath: "./assets/audio/silence.mp3",
    screen: [
        [o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o],
        [o, "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", o],
        [o, "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", o],
        [o, "1", "1", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, "1", "1", o],
        [o, "1", "1", 0, 0, 0, 0, 0, "0", 0, 0, 0, 0, 0, 0, "1", "1", o],
        [o, "1", "1", 0, 0, 0, 0, 0, { type: "actTile", eventType: "Sword_1", tile1: 0, tile2: 0, remove: false }, 0, 0, 0, 0, 0, 0, "1", "1", o],
        [o, "1", "1", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, "1", "1", o],
        [o, "1", "1", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, "1", "1", o],
        [o, "1", "1", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, "1", "1", o],
        [o, "1", "1", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, "1", "1", o],
        [o, "1", "1", "1", "1", "1", "1", "1", 0, 0, "1", "1", "1", "1", "1", "1", "1", o],
        [o, "1", "1", "1", "1", "1", "1", "1", 0, 0, "1", "1", "1", "1", "1", "1", "1", o],
        [o, o, o, o, o, o, o, o, { screen: "openingScreen", type: "door", coX: 5, coY: 3 }, { screen: "openingScreen", type: "door", coX: 5, coY: 3 }, o, o, o, o, o, o, o, o],
    ]
}




const screenA = {
    assetPath: "./assets/overworld/",
    audioPath: "./assets/audio/overworld.mp3",
    enemies: [{
        x: 1,
        y: 6,
        itemDrop: {
            FIVE_RUPIES: 1

        }
    },
    {
        x: 3,
        y: 3,
        itemDrop: {
            BOMB: 1

        }
    },
    {
        x: 16,
        y: 6,
        itemDrop: {
            ONE_RUPIE: 1

        }
    },

    ],
    screen: [
        [o, o, o, o, o, o, o, o, o, o, o, o, o, { screen: "screenB", type: "door", coX: 13, coY: 11 }, { screen: "screenB", type: "door", coX: 14, coY: 11 }, o, o, o],
        [o, "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", 0, 0, "1", "1", o],
        [o, "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", 0, 0, "1", "1", o],
        [o, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, "1", "1", o],
        [o, 0, 0, 0, 0, 0, 0, 0, "10", 0, 0, 0, 0, 0, 0, "3", "1", o],
        [o, 0, 0, 0, 0, 0, 0, 0, 0, 0, "10", 0, 0, 0, 0, 0, "3", o],
        [o, 0, 0, 0, 0, "10", 0, 0, "10", 0, 0, 0, 0, 0, 0, 0, 0, { screen: "openingScreen", type: "door", coX: 2, coY: 6 }],
        [o, 0, 0, 0, 0, 0, 0, 0, 0, 0, "10", 0, 0, 0, 0, 0, "6", o],
        [o, 0, 0, 0, 0, 0, 0, 0, "10", 0, 0, 0, 0, 0, 0, "6", "1", o],
        [o, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, "1", "1", o],
        [o, "5", "5", "5", "5", "5", "5", "5", "5", "5", "5", "5", "5", "5", "5", "1", "1", o],
        [o, "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", o],
        [o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o],
    ]

}


const screenB = {
    assetPath: "./assets/overworld/",
    audioPath: "./assets/audio/overworld.mp3",
    enemies: [{
        x: 1,
        y: 6,
        itemDrop: {
            FIVE_RUPIES: 1

        }
    },
    {
        x: 3,
        y: 3,
        itemDrop: {
            BOMB: 1

        }
    },
    {
        x: 16,
        y: 6,
        itemDrop: {
            ONE_RUPIE: 1

        }
    },
    {
        x: 14,
        y: 10,
        itemDrop: {
            ONE_RUPIE: 1

        }
    },

    ],
    screen: [
        [o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o],
        [o, "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", o],
        [o, "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", o],
        [o, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, "3", "1", o],
        [o, 0, 0, 0, 0, "11", "11", '11', '11', 0, 0, 0, 0, 0, 0, 0, "3", o],
        [o, 0, 0, 0, 0, 0, 0, 0, 0, 0, "11", "11", "11", 0, 0, 0, 0, { screen: "screenC", type: "door", coX: 1, coY: 5 }],
        [o, 0, 0, 0, 0, "11", "11", "11", "11", 0, 0, 0, 0, 0, 0, 0, 0, { screen: "screenC", type: "door", coX: 1, coY: 5 }],
        [o, 0, 0, 0, 0, 0, 0, 0, 0, 0, "11", "11", "11", 0, 0, 0, 0, { screen: "screenC", type: "door", coX: 1, coY: 6 }],
        [o, 0, 0, 0, 0, "11", "11", "11", "11", 0, 0, 0, 0, 0, 0, 0, 0, { screen: "screenC", type: "door", coX: 1, coY: 7 }],
        [o, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, "6", o],
        [o, "5", "5", "5", "5", "5", "5", "5", "5", "5", "5", "5", "5", 0, 0, "6", "1", o],
        [o, "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", 0, 0, "1", "1", o],
        [o, o, o, o, o, o, o, o, o, o, o, o, o, { screen: "screenA", type: "door", coX: 13, coY: 2 }, { screen: "screenA", type: "door", coX: 14, coY: 2 }, o, o, o],
    ]

}

const screenC = {
    assetPath: "./assets/overworld/",
    audioPath: "./assets/audio/overworld.mp3",
    enemies: [{
        x: 1,
        y: 6,
        itemDrop: {
            FIVE_RUPIES: 1

        }
    },
    {
        x: 3,
        y: 3,
        itemDrop: {
            BOMB: 1

        }
    },
    {
        x: 16,
        y: 6,
        itemDrop: {
            ONE_RUPIE: 1

        }
    },

    ],
    screen: [
        [o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o],
        [o, "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", o],
        [o, "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", o],
        [o, "1", "2", 0, 0, 0, 0, 0, 0, 0, "3", "2", 0, 0, 0, "3", "1", o],
        [o, "2", 0, 0, "10", 0, "10", 0, 0, 0, 0, 0, 0, "10", 0, 0, "3", o],
        [{ screen: "screenB", type: "door", coX: 16, coY: 5 }, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, { screen: "screenD", type: "door", coX: 1, coY: 5 }],
        [{ screen: "screenB", type: "door", coX: 16, coY: 6 }, 0, 0, 0, "10", 0, "10", 0, 0, 0, 0, 0, 0, "10", 0, 0, 0, { screen: "screenD", type: "door", coX: 1, coY: 6 }],
        [{ screen: "screenB", type: "door", coX: 16, coY: 7 }, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, { screen: "screenD", type: "door", coX: 1, coY: 7 }],
        [o, "4", 0, 0, "10", 0, "10", 0, 0, 0, 0, 0, 0, "10", 0, 0, "6", o],
        [o, "1", "4", 0, 0, 0, 0, 0, 0, 0, "6", "4", 0, 0, 0, "6", "1", o],
        [o, "1", "1", "5", "5", "5", "5", "5", 0, 0, "1", "1", "5", "5", "5", "1", "1", o],
        [o, "1", "1", "1", "1", "1", "1", "1", 0, 0, "1", "1", "1", "1", "1", "1", "1", o],
        [o, o, o, o, o, o, o, o, { screen: "openingScreen", type: "door", coX: 8, coY: 1 }, { screen: "openingScreen", type: "door", coX: 9, coY: 1 }, o, o, o, o, o, o, o, o],
    ]
}

const screenD = {
    assetPath: "./assets/overworld/",
    audioPath: "./assets/audio/overworld.mp3",
    enemies: [{
        x: 1,
        y: 6,
        itemDrop: {
            FIVE_RUPIES: 1

        }
    },
    {
        x: 3,
        y: 3,
        itemDrop: {
            BOMB: 1

        }
    },
    {
        x: 16,
        y: 6,
        itemDrop: {
            ONE_RUPIE: 1

        }
    },
    {
        x: 14,
        y: 10,
        itemDrop: {
            ONE_RUPIE: 1

        }
    },
    ],
    screen: [
        [o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o],
        [o, "1", "1", "20", 0, "20", 0, "20", 0, 0, "20", 0, "20", 0, "20", 0, "20", o],
        [o, "1", "1", "20", 0, "20", 0, "20", 0, 0, "20", 0, "20", 0, "20", 0, "20", o],
        [o, "1", "2", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, "20", o],
        [o, "2", 0, 0, 0, "20", 0, 0, 0, 0, "20", 0, 0, 0, "20", 0, 0, o],
        [{ screen: "screenC", type: "door", coX: 16, coY: 5 }, 0, 0, "20", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, o],
        [{ screen: "screenC", type: "door", coX: 16, coY: 6 }, 0, 0, 0, 0, "20", 0, "20", 0, 0, "20", 0, "20", 0, "20", 0, 0, o],
        [{ screen: "screenC", type: "door", coX: 16, coY: 7 }, 0, 0, "20", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, o],
        [o, "4", 0, 0, 0, "20", 0, 0, 0, 0, "20", 0, 0, 0, "20", 0, "20", o],
        [o, "1", "4", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, "20", o],
        [o, "1", "1", "20", 0, "20", 0, "20", 0, 0, "20", 0, "20", 0, "20", 0, "20", o],
        [o, "1", "1", "20", 0, "20", 0, "20", 0, 0, "20", 0, "20", 0, "20", 0, "20", o],
        [o, o, o, o, { screen: "screenE", type: "door", coX: 4, coY: 1 }, o, { screen: "screenE", type: "door", coX: 6, coY: 1 }, o, { screen: "screenE", type: "door", coX: 8, coY: 1 }, { screen: "screenE", type: "door", coX: 9, coY: 1 }, o, { screen: "screenE", type: "door", coX: 11, coY: 1 }, o, { screen: "screenE", type: "door", coX: 13, coY: 1 }, o, { screen: "screenE", type: "door", coX: 15, coY: 1 }, o, o],
    ]
}


const screenE = {
    assetPath: "./assets/overworld/",
    audioPath: "./assets/audio/overworld.mp3",
    enemies: [{
        x: 4,
        y: 2,
        // enemyType: string
        itemDrop: {
            FIVE_RUPIES: 1
            // ONE_RUPIE: 1
            // BOMB: 1         // 0 - 1  0 = 0%, while 1 = 100% 0.5 = 50%

            /*

                .1: 5 rupies
                .5: bomb
            */
        }
    },
    {
        x: 6,
        y: 2,
        // enemyType: string
        itemDrop: {
            ONE_RUPIE: 1

        }
    },
    {
        x: 9,
        y: 2,
        // enemyType: string
        itemDrop: {
            BOMB: 1

        }
    }
    ],
    screen: [
        [o, o, o, o, { screen: "screenD", type: "door", coX: 4, coY: 11 }, o, { screen: "screenD", type: "door", coX: 6, coY: 11 }, o, { screen: "screenD", type: "door", coX: 8, coY: 11 }, { screen: "screenD", type: "door", coX: 9, coY: 11 }, o, { screen: "screenD", type: "door", coX: 11, coY: 11 }, o, { screen: "screenD", type: "door", coX: 13, coY: 11 }, o, { screen: "screenD", type: "door", coX: 15, coY: 1 }, o, o],
        [o, "1", "1", "20", 0, "20", 0, "20", 0, 0, "20", 0, "20", 0, "20", 0, "20", o],
        [o, "1", "1", "20", 0, "20", 0, "20", 0, 0, "20", 0, "20", 0, "20", 0, "20", o],
        [o, "1", "2", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, o],
        [o, "2", 0, 0, 0, 0, 0, "20", 0, 0, "20", 0, "20", 0, "20", 0, 0, o],
        [{ screen: "openingScreen", type: "door", coX: 16, coY: 6 }, 0, 0, "20", 0, "20", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, o],
        [{ screen: "openingScreen", type: "door", coX: 16, coY: 6 }, 0, 0, 0, 0, 0, 0, "20", 0, 0, "20", 0, "20", 0, "20", 0, 0, o],
        [{ screen: "openingScreen", type: "door", coX: 16, coY: 6 }, 0, 0, "20", 0, "20", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, o],
        [o, "4", 0, 0, 0, 0, 0, "20", 0, 0, "20", 0, "20", 0, "20", 0, 0, o],
        [o, "1", "4", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, o],
        [o, "1", "1", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", o],
        [o, "1", "1", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", o],
        [o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o],
    ]
}
/*
    for actTile:
        the tile property is for the initial tile
        the tile2 property is for the replacement tile
*/




export { openingScreen, shop, screenA, screenB, screenC, screenD, screenE };
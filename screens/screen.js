
const o = undefined;
const AUDIO_PATH = "../assets/audio/"

const screenOneObject = {
    audioPath: AUDIO_PATH + "overworld.mp3",
    audioObject: undefined,
    assetPath: "overworld/",
    transitionSpaces: {
        door: [
            { screen: "shop1", coX: 9, coY: 11 }, // this is what the entity will be made with 
            { screen: "screenC" , coX: 9, coY:11},
            { screen: "screenA" , coX: 16, coY: 6},
            { screen: "screenE" , coX: 1, coY: 7}

        ],
        space: []
    },
    screen: [
        [o,  o,   o,    o,   o,   o,   o,   o, {type: "door", index: 1, tile: undefined},{type: "door", index: 1, tile: undefined} ,o,o,o,o,o,o, o,o,o],
        [o,"1","1","1","1","1","1","1",0,0,"1","1","1","1","1","1","1",o],
        [o,"1","1","1","1",{type: "door", index: 0, tile: 0},"1","2",0,0,"1","1","1","1","1","1","1",o],
        [o,"1","1","1","2", 0,0,0,0,0,"1","1","1","1","1","1","1",o],
        [o,"1","1","2",0,0,0,0,0,0,"1","1","1","1","1","1","1",o],
        [o,"1","2",0,0,0,0,0,0,0,"3","1","1","1","1","1","1",o],
        [{type: "door", index: 2, tile: undefined},0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,{type:"door", index:3, tile:undefined}],
        [o,"5","5",0,0,0,0,0,0,0,0,0,0,0,0,"5","5",o],
        [o,"1","1",0,0,0,0,0,0,0,0,0,0,0,0,"1","1",o],
        [o,"1","1",0,0,0,0,0,0,0,0,0,0,0,0,"1","1",o],
        [o,"1","1","5","5","5","5","5","5","5","5","5","5","5","5","1","1",o],
        [o,"1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1",o],
        [o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o, o,o,o],
    ]
};

const shop1 = {
    audioPath: AUDIO_PATH + "silence.mp3",
    audioObject: undefined,
    assetPath: "shop/",
    transitionSpaces: {
        door: [
            { screen: "screen1", coX: 5, coY: 3 } // this is what the entity will be made with 
        ],
        space: []
    },
    npcs: {
        hostileTile: [
            {
                name: "fire",
                invulnerable: true
            }
        ],
    },
    screen: [
        [o,  o,   o,    o,   o,   o,   o,   o, o, o ,o,o,o,o,o,o, o,o,o],
        [o,"1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1",o],
        [o,"1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1",o],
        [o,"1","1",0,0, 0,0,0,0,0,0,0,0,0,0,"1","1",o],
        [o,"1","1",0,0,0,0,{type:"hostileTile", index:0, tile: 0},0,"0",0,{type:"hostileTile", index:0, tile:0},0,0,0,"1","1",o],
        [o,"1","1",0,0,0,0,0,0,{type:"actTile", index: 0, tile: 0, replacementTile: 0 },0,0,0,0,0,"1","1",o],
        [o,"1", "1",0,0,0,0,0,0,0,0,0,0,0,0,"1","1",o],
        [o,"1","1",0,0,0,0,0,0,0,0,0,0,0,0,"1","1",o],
        [o,"1","1",0,0,0,0,0,0,0,0,0,0,0,0,"1","1",o],
        [o,"1","1",0,0,0,0,0,0,0,0,0,0,0,0,"1","1",o],
        [o,"1","1","1","1","1","1","1",0,0,"1","1","1","1","1","1","1",o],
        [o,"1","1","1","1","1","1","1",0,0,"1","1","1","1","1","1","1",o],
        [o,o,o,o,o,o,o,o,{type: "door", index: 0, tile: undefined} ,{type: "door", index: 0, tile: undefined},o ,o,o,o,o,o, o,o,o],
    ],
    actTile: [{entity: "SwordTile", remove: false, audioPath:`${AUDIO_PATH}importantItem.mp3`}]            // actionableTile
}

const screenA = {
    audioPath: AUDIO_PATH + "overworld.mp3",
    audioObject: undefined,
    assetPath: "overworld/",
    transitionSpaces: {
        door: [{ screen: "screen1", coX: 1, coY: 6 }, { screen: "screenB", coX: 13, coY: 11 }],
        space: []
    },
    screen: [
        [o,  o,   o,    o,   o,   o,   o,   o, o, o ,o,o,o,{type: "door", index: 1, tile: undefined},{type: "door", index: 1, tile: undefined},o, o,o,o],
        [o,"1","1","1","1","1","1","1","1","1","1","1","1",0,0,"1","1",o],
        [o,"1","1","1","1","1","1","1","1","1","1","1","2",0,0,"1","1",o],
        [o,0,0,0,0, 0,0,0,0,0,0,0,0,0,0,"1","1",o],
        [o,0,0,0,0,0,0,0,0,"10",0,0,0,0,0,"3","1",o],
        [o,0,0,0,0,0,0,0,0,0,0,0,"10",0,0,0,"3",o],
        [o,0,0,"10",0,0,"10",0,0,"10",0,0,0,0,0,0,0,{type: "door", index: 0, tile: undefined}],
        [o,0,0,0,0,0,0,0,0,0,0,0,"10",0,0,0,"6",o],
        [o,0,0,0,0,0,0,0,0,"10",0,0,0,0,0,"6","1",o],
        [o,0,0,0,0,0,0,0,0,0,0,0,0,0,0,"1","1",o],
        [o,"5","5","5","5","5","5","5","5","5","5","5","5","5","5","1","1",o],
        [o,"1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1",o],
        [o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o, o,o,o],
    ]
}

const screenB = {
    audioPath: AUDIO_PATH + "overworld.mp3",
    audioObject: undefined,
    assetPath: "overworld/",
    transitionSpaces: {
        door: [{ screen: "screenC", coX: 1, coY: 6 }, { screen: "screenA", coX: 13, coY: 1 }],
        space: []
    },
    screen: [
        [o,  o,   o,    o,   o,   o,   o,   o, o, o ,o,o,o,o,o,o, o,o,o],
        [o,"1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1",o],
        [o,"3","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1",o],
        [o,0,0,0,0, 0,0,0,0,0,0,0,0,0,0,"3","1",o],
        [o,0,0,0,0,0,"11","11","11","11",0,0,0,0,0,0,"3",o],
        [o,0,0,0,0,0,0,0,0,0,0,"11","11","11",0,0,0,{type: "door", index: 0, tile: undefined}],
        [o,0,0,0,0,0,"11","11","11","11",0,0,0,0,0,0,0,{type: "door", index: 0, tile: undefined}],
        [o,0,0,0,0,0,0,0,0,0,0,"11","11","11",0,0,0,{type: "door", index: 0, tile: undefined}],
        [o,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,{type: "door", index: 0, tile: undefined}],
        [o,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,"6",o],
        [o,0,0,0,0,0,0,0,0,0,0,0,0,0,0,"6","1",o],
        [o,"5","5","5","5","5","5","5","5","5","5","5","5",0,0,"1","1",o],
        [o,o,o,o,o,o,o,o,o,o,o,o,o,{type: "door", index: 1, tile: undefined},{type: "door", index: 1, tile: undefined},o, o,o,o],
    ]
}

const screenC = {
    audioPath: AUDIO_PATH + "overworld.mp3",
    audioObject: undefined,
    assetPath: "overworld/",
    transitionSpaces: {
        door: [{ screen: "screen1", coX: 9, coY: 1 }, { screen: "screenB", coX:16, coY: 5 }, { screen: "screenD", coX:1, coY: 5 }],
        space: []
    },
    screen: [
        [o,  o,   o,    o,   o,   o,   o,   o, o, o ,o,o,o,o,o,o, o,o,o],
        [o,"1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1",o],
        [o,"1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1",o],
        [o,"1","2",0,0, 0,0,0,0,0,"3","2",0,0,0,"3","1",o],
        [o,"2",0,0,"10",0,"10",0,0,0,0,0,0,"10",0,0,"3",o],
        [{type: "door", index: 1, tile: undefined},0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,{type: "door", index: 2, tile: undefined}],
        [{type: "door", index: 1, tile: undefined},0,0,0,"10",0,"10",0,0,0,0,0,0,"10",0,0,0,{type: "door", index: 2, tile: undefined}],
        [{type: "door", index: 1, tile: undefined},0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,{type: "door", index: 2, tile: undefined}],
        [{type: "door", index: 1, tile: undefined},0,0,0,"10",0,"10",0,0,0,0,0,0,"10",0,0,0,{type: "door", index: 2, tile: undefined}],
        [o,"4",0,0,0,0,0,0,0,0,0,0,0,0,0,0,"6",o],
        [o,"1","4",0,0,0,0,0,0,0,"6","4",0,0,0,"6","1",o],
        [o,"1","1","5","5","5","5","5",0,0,"1","1","5","5","5","1","1",o],
        [o,o,o,o,o,o,o,o,{type: "door", index: 0, tile: undefined},{type: "door", index: 0, tile: undefined},o,o,o,o,o,o, o,o,o],
    ]
}

const screenD = {
    audioPath: AUDIO_PATH + "overworld.mp3",
    audioObject: undefined,
    assetPath: "overworld/",
    transitionSpaces: {
        door: [{ screen: "screenC", coX: 16, coY: 6 }, 
            { screen: "screenE", coX: 4, coY: 1 },
            { screen: "screenE", coX: 6, coY: 1 },
            { screen: "screenE", coX: 8, coY: 1 },
            { screen: "screenE", coX: 9, coY: 1 },
            { screen: "screenE", coX: 11, coY: 1 },
            { screen: "screenE", coX: 13, coY: 1 },
            { screen: "screenE", coX: 15, coY: 1 },

        ],
        space: []
    },
    screen: [
        [o,  o,   o,    o,   o,   o,   o,   o, o, o ,o,o,o,o,o,o, o,o,o],
        [o,"1","1","20",0,"20",0,"20",0,0,"20",0,"20",0,"20",0,"20",o],
        [o,"1","1","20",0,"20",0,"20",0,0,"20",0,"20",0,"20",0,"20",o],
        [o,"1","2",0,0, 0,0,0,0,0,0,0,0,0,0,0,"20",o],
        [o,"2",0,0,0,"20",0,0,0,0,"20",0,0,0,"20",0,"20",o],
        [{type: "door", index: 0, tile: undefined},0,0,"20",0,0,0,0,0,0,0,0,0,0,0,0,0,o],
        [{type: "door", index: 0, tile: undefined},0,0, 0, 0,"20",0,"20",0,0,"20",0,"20",0,"20",0,0,o],
        [{type: "door", index: 0, tile: undefined},0,0,"20",0,0,0,0,0,0,0,0,0,0,0,0,0,o],
        [{type: "door", index: 0, tile: undefined},0,0,0,0,"20",0,0,0,0,"20",0,0,0,"20",0,"20",o],
        [o,"4",0,0,0,0,0,0,0,0,0,0,0,0,0,0,"20",o],
        [o,"1","4",0,0,0,0,0,0,0,0,0,0,0,0,0,"20",o],
        [o,"1","1","20",0,"20",0,"20",0,0,"20",0,"20",0,"20",0,"20",o],
        [o,o,o,o,{type: "door", index:1, tile: undefined},o,{type: "door", index:2, tile: undefined},o,{type: "door", index:3, tile: undefined},{type: "door", index:4, tile: undefined},o,{type: "door", index:5, tile: undefined},o,{type: "door", index:6, tile: undefined},o,{type: "door", index:7, tile: undefined}, o,o,o],
    ]
}

const screenE = {
    audioPath: AUDIO_PATH + "overworld.mp3",
    audioObject: undefined,
    assetPath: "overworld/",
    transitionSpaces: {
        door: [
            { screen: "screen1", coX: 16, coY: 6 },
            { screen: "screenD", coX: 4, coY: 11 },
            { screen: "screenD", coX: 6, coY: 11 },
            { screen: "screenD", coX: 8, coY: 11 },
            { screen: "screenD", coX: 9, coY: 11 },
            { screen: "screenD", coX: 11, coY: 11 },
            { screen: "screenD", coX: 13, coY: 11 },
            { screen: "screenD", coX: 15, coY: 11 },



        ],
        space: []
    },
    npcs: {
        enemies: [
            {
                x: 5,           // x coefficient of tile
                y: 5
            }
        ]
    },
    screen: [
        [o,  o, o, o,{type: "door", index: 1, tile: undefined}, o,   {type: "door", index: 2, tile: undefined},   o,   {type: "door", index: 3, tile: undefined}, {type: "door", index: 4, tile: undefined}, o, {type: "door", index: 5, tile: undefined},o,{type: "door", index: 6, tile: undefined},o,{type: "door", index: 7, tile: undefined},o,o,o],
        [o,"1","1","20",0,"20",0,"20",0,0,"20",0,"20",0,"20",0,"20",o], // 5
        [o,"1","1","20",0,"20",0,"20",0,0,"20",0,"20",0,"20",0,"20",o], // 23
        [o,"1","1",0,0, 0,0,0,0,0,0,0,0,0,0,0,0,o],                     // 41
        [o,"1","1",0,0,0,0,0,0,0,0,0,0,0,0,0,0,o],                      // 59        if something is below or above, it will be 18 +/-
        [o,"1","2",0,0,0,0,"20",0,0,"20",0,"20",0,"20",0,0,o],
        [o,"2",0, "20", 0,"20",0,0,0,0,0,0,0,0,0,0,0,o],
        [{type: "door", index: 0, tile: undefined},0,0,0,0,0,0,"20",0,0,"20",0,"20",0,"20",0,0,o],
        [{type: "door", index: 0, tile: undefined},0,0,"20",0,"20",0,0,0,0,0,0,0,0,0,0,0,o],
        [o,"4",0,0,0,0,0,"20",0,0, "20",0,"20",0,"20",0,0,o],
        [o,"1","4",0,0,0,0,0,0,0,0,0,0,0,0,0,0,o],
        [o,"1","1","20","20","20","20","20","20","20","20","20","20","20","20","20","20",o],
        [o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o, o,o,o],
    ]
}


export  {screenOneObject, shop1, screenA, screenB, screenC, screenD,screenE};
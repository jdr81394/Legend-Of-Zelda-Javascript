
const o = undefined;
const AUDIO_PATH = "../assets/audio/"

const screenOneObject = {
    audioPath: AUDIO_PATH + "overworld.mp3",
    audioObject: undefined,
    assetPath: "overworld/",
    transitionSpaces: {
        door: [
            { screen: "shop1", coX: 9, coY: 11 }, // this is what the entity will be made with 
            { screen: "screenA" , coX: 5, coY:5}
        ],
        space: []
    },
    screen: [
        [o,  o,   o,    o,   o,   o,   o,   o, {type: "door", index: 1, tile: 0},{type: "door", index: 1, tile: 0} ,o,o,o,o,o,o, o,o,o],
        [o,"1","1","1","1","1","1","1",0,0,"1","1","1","1","1","1","1",o],
        [o,"1","1","1","1",{type: "door", index: 0, tile: 0},"1","2",0,0,"1","1","1","1","1","1","1",o],
        [o,"1","1","1","2", 0,0,0,0,0,"1","1","1","1","1","1","1",o],
        [o,"1","1","2",0,0,0,0,0,0,"1","1","1","1","1","1","1",o],
        [o,"1","2",0,0,0,0,0,0,0,"1","1","1","1","1","1","1",o],
        [o,0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,o],
        [o,"1","1",0,0,0,0,0,0,0,0,0,0,0,0,"1","1",o],
        [o,"1","1",0,0,0,0,0,0,0,0,0,0,0,0,"1","1",o],
        [o,"1","1",0,0,0,0,0,0,0,0,0,0,0,0,"1","1",o],
        [o,"1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1",o],
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
        enemy: [
            {
                name: "fire",
                invulnerable: true
            }
        ]
    },
    screen: [
        [o,  o,   o,    o,   o,   o,   o,   o, o, o ,o,o,o,o,o,o, o,o,o],
        [o,"1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1",o],
        [o,"1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1",o],
        [o,"1","1",0,0, 0,0,0,0,0,0,0,0,0,0,"1","1",o],
        [o,"1","1",0,0,0,0,{type:"enemy", index:0, tile: 0},0,"0",0,{type:"enemy", index:0, tile:0},0,0,0,"1","1",o],
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
        door: [{ screen: "shop1", coX: 9, coY: 11 }],
        space: []
    },
    screen: [
        [o,  o,   o,    o,   o,   o,   o,   o, o, o ,o,o,o,o,o,o, o,o,o],
        [o,"1","1","1","1","1","1","1",0,0,"1","1","1","1","1","1","1",o],
        [o,"1","1","1","1",{type: "door", index: 0, tile: 0},"1","2",0,0,"1","1","1","1","1","1","1",o],
        [o,"1","1","1","2", 0,0,0,0,0,"1","1","1","1","1","1","1",o],
        [o,"1","1","2",0,0,0,0,0,0,"1","1","1","1","1","1","1",o],
        [o,"1","2",0,0,0,0,0,0,0,"1","1","1","1","1","1","1",o],
        [o,0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,o],
        [o,"1","1",0,0,0,0,0,0,0,0,0,0,0,0,"1","1",o],
        [o,"1","1",0,0,0,0,0,0,0,0,0,0,0,0,"1","1",o],
        [o,"1","1",0,0,0,0,0,0,0,0,0,0,0,0,"1","1",o],
        [o,"1","1","1",0,0,0,0,"1","1","1","1","1","1","1","1","1",o],
        [o,"1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1",o],
        [o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o, o,o,o],
    ]
}

export  {screenOneObject, shop1,screenA};
const WEAPONS_PATH = "../assets/inventory/"
const INVENTORY_SWORD_1 = {
    name: "Sword_1",
    damage: 1,
    path: `../assets/link.png`,
    img: undefined,
    srcRect: {
        down: {
            x: -1,
            y: 192,
            width: 30,
            height: 20
        },
        left: {
            x: 28,
            y: 192,
            width: 30,
            height: 20
        },
        up: {
            x: 58,
            y: 192,
            width: 30,
            height: 20
        },
        right: {
            x: 88,
            y: 192,
            width: 30,
            height: 20
        }
    }
}

const BOMB = {
    name: "Bomb",
    damage: 3,
    path: "../assets/link.png",
    img: undefined,
    srcRect: {
        down: {
            x: 350, y: 225, width: 25, height:25
        },
        left: {
            x: 350, y: 225, width: 25, height:25
        },
        up: {
            x: 350, y: 225, width: 25, height:25
        },
        right: {
            x: 350, y: 225, width: 25, height:25
        }
    },


}


const WEAPONS_TABLE = {
    bombs: BOMB
}


export {INVENTORY_SWORD_1, WEAPONS_TABLE};
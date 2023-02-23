const SWORD_1 = {
    /*
        name: string "Sword_1"
        srcRect: {
            up: {x,y,width,height},
            down: {x,y,width,height}
            left: {x,y,width,height}
            right: {x,y,width,height}
        }
        img: undefined -> new Image() 
        path: "../assets/link.png"
        damage: number: 1
    */

    name: "Sword_1",
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
    },
    img: undefined,
    path: "../assets/link.png",
    damage: 1,
    weaponEntity: undefined,
}


const BOMB = {
    name: "bomb",
    damage: 3,
    path: "../assets/link.png",
    img: undefined,
    srcRect: {
        x: 360,
        y: 224,
        width: 18,
        height: 18
    }
}

const WEAPONS_TABLE = {
    bomb: BOMB
}


export { SWORD_1, BOMB, WEAPONS_TABLE }
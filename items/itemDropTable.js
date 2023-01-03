export const ONE_RUPIE = "oneRupie";
export const FIVE_RUPIES = "fiveRupies";
export const BOMB = "bomb";

export const ITEM_TABLE = {
    ONE_RUPIE: {
        onDrop: (registry, x,y) => {
            const dummyPositionComponent = {
                name: "Position", 
                value: {
                    x,y,
                    width: 70,
                     height: 60
                }
            }

            const dummySpriteComponent = {
                name: "Sprite",
                value: {
                    path: "link.png",
                    srcRect: {
                        x: 239,
                        y: 225,
                        height: 17.5,
                        width: 17.5
                    }
                }
            }

            registry.createEntity([dummyPositionComponent, dummySpriteComponent])
        },            // render item and any animation. Needs x and y to appear
        onPickup: () => {},         // Add to inventory, add to money count, heal
        onDisappear: () => {}       // play any outro sound
    },
    FIVE_RUPIES: {
        onDrop: () => {}
    },
    BOMB: {}
};



export const ONE_RUPIE = "ONE_RUPIE";
export const FIVE_RUPIES = "FIVE_RUPIES";
export const BOMB = "BOMB";


export const generateDummyPositionComponent = (x,y, height, width) => {
    return {
        name: "Position",
        value: {
            x,y,
            height: height ? height: 70,
            width: width ? width: 60
        }
    }
}

export const generateDummySpriteComponent = (x,y,height,width, path) => ({
    name: "Sprite",
    value: {
        path: path ? path: "link.png",
        srcRect: {
            x,y,height,width
        }
    }
})

export const generateDummyItemComponent = (itemType) => ({
    name: "Item", 
    value: {
        itemType
    }
})

export const ITEM_TABLE = {
    ONE_RUPIE: {
        onDrop: (registry, x,y) => {
            const dummyPositionComponent = generateDummyPositionComponent(x,y);

            const dummySpriteComponent = generateDummySpriteComponent(239,225,17.5,17.5); 

            const dummyItemComponent = generateDummyItemComponent(ONE_RUPIE);

            registry.createEntity([dummyPositionComponent, dummySpriteComponent, dummyItemComponent])
        },            // render item and any animation. Needs x and y to appear
        onPickup: (entity, player) => {
            player.components["Player"].inventory.rupies += 1;
            entity.registry.entitiesToBeKilled.push(entity);
        },         // Add to inventory, add to money count, heal
        onDisappear: () => {
            new Audio("../assets/audio/pickupRupie.mp3").play();
        }       // play any outro sound
    },
    FIVE_RUPIES: {
        onDrop: (registry, x,y) => {
            const dummyPositionComponent = generateDummyPositionComponent(x,y)
            const dummySpriteComponent = generateDummySpriteComponent(267.5,225,17.5,17.5)
            const dummyItemComponent = generateDummyItemComponent(FIVE_RUPIES);

            registry.createEntity([dummyPositionComponent, dummyItemComponent, dummySpriteComponent])
        },
        onPickup: (entity,player) => {
            player.components["Player"].inventory.rupies += 5;
            entity.registry.entitiesToBeKilled.push(entity);
        },
        onDisappear: () => {
            for(let i = 0; i < 5; i++) {
                new Audio("../assets/audio/pickupRupie.mp3").play();
            }
 
        }
    },
    BOMB: {}
};



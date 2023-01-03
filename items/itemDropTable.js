export const ONE_RUPIE = "ONE_RUPIE";
export const FIVE_RUPIES = "FIVE_RUPIES";
export const BOMB = "BOMB";


const generateDummyPositionComponent = (x,y) => {
    return {
        name: "Position",
        value: {
            x,y,
            height: 70,
            width: 60
        }
    }
}

const generateDummySpriteComponent = (x,y,height,width) => ({
    name: "Sprite",
    value: {
        path: "link.png",
        srcRect: {
            x,y,height,width
        }
    }
})

const generateDummyItemComponent = (itemType) => ({
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
        onPickup: (entity) => {
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
        onPickup: (entity) => {
            entity.registry.entitiesToBeKilled.push(entity);
        },
        onDisappear: () => {
            new Audio("../assets/audio/pickupRupie.mp3").play();
            new Audio("../assets/audio/pickupRupie.mp3").play();
            new Audio("../assets/audio/pickupRupie.mp3").play();
            new Audio("../assets/audio/pickupRupie.mp3").play();
            new Audio("../assets/audio/pickupRupie.mp3").play();

        }
    },
    BOMB: {}
};



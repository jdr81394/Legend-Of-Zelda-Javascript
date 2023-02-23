export const BOMB = "BOMB";
export const ONE_RUPIE = "ONE_RUPIE";
export const FIVE_RUPIES = "FIVE_RUPIES";


export const ITEM_DROP_TABLE = {
    BOMB: {
        onDrop: (registry, x, y) => {
            const dummyPositionComponent = {
                name: "Position",
                value: {
                    x, y,
                    height: 50,
                    width: 50
                }
            }

            const dummySpriteComponent = {
                name: "Sprite",
                value: {
                    path: "./assets/link.png",
                    srcRect: {
                        x: 360,
                        y: 224,
                        width: 18,
                        height: 18
                    }
                }
            }

            const dummyItemComponent = {
                name: "Item",
                value: {
                    itemType: BOMB
                }
            }

            registry.createEntity([dummyItemComponent, dummyPositionComponent, dummySpriteComponent]);
        },
        onPickup: (entity, player) => {
            player.components["Inventory"].inventory.bomb += 1;
            entity.registry.entitiesToBeRemoved.push(entity);
        },
        onDisappear: () => {
            new Audio("../assets/audio/importantItem.mp3").play();
        }
    },
    ONE_RUPIE: {
        onDrop: (registry, x, y) => {
            const dummyPositionComponent = {
                name: "Position",
                value: {
                    x, y,
                    height: 50,     // x 240
                    width: 50
                }
            }

            const dummySpriteComponent = {
                name: "Sprite",
                value: {
                    path: "./assets/link.png",
                    srcRect: {
                        x: 240,
                        y: 224,
                        width: 18,
                        height: 18
                    }
                }
            }

            const dummyItemComponent = {
                name: "Item",
                value: {
                    itemType: ONE_RUPIE
                }
            }

            registry.createEntity([dummyPositionComponent, dummySpriteComponent, dummyItemComponent]);

        },
        onPickup: (entity, player) => {
            console.log("before for rupies: ", player.components["Inventory"].inventory.rupies)
            player.components["Inventory"].inventory.rupies += 1;
            entity.registry.entitiesToBeRemoved.push(entity);
            console.log("after for rupies: ", player.components["Inventory"].inventory.rupies)

        },
        onDisappear: () => {
            new Audio("../assets/audio/pickupRupie.mp3").play();
        }
    },
    FIVE_RUPIES: {
        onDrop: (registry, x, y) => {
            const dummyPositionComponent = {
                name: "Position",
                value: {
                    x, y,
                    height: 50,
                    width: 50
                }
            }

            const dummySpriteComponent = {
                name: "Sprite",
                value: {
                    path: "./assets/link.png",
                    srcRect: {
                        x: 265,
                        y: 224,
                        width: 18,
                        height: 18
                    }
                }
            }

            const dummyItemComponent = {
                name: "Item",
                value: {
                    itemType: FIVE_RUPIES
                }
            }

            registry.createEntity([dummyPositionComponent, dummySpriteComponent, dummyItemComponent]);

        },
        onPickup: (entity, player) => {
            console.log("before for rupies: ", player.components["Inventory"].inventory.rupies)
            player.components["Inventory"].inventory.rupies += 5;
            entity.registry.entitiesToBeRemoved.push(entity);
            console.log("after for rupies: ", player.components["Inventory"].inventory.rupies)

        },
        onDisappear: () => {
            for (let i = 0; i < 5; i++) {
                new Audio("../assets/audio/pickupRupie.mp3").play();
            }
        }
    }
}
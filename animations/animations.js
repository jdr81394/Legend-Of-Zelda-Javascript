import { SWORD_1 } from "../weapons/weapons.js";

const LINK_ANIMATION = {
    name: "Animation",
    value: {
        shouldAnimate: false,
        currentTimeOfAnimation: 0,
        facing: "up",
        frames: {
            down: {
                move: {
                    srcRect: [
                        {
                            x: -2,
                            y: -1,
                            width: 20,
                            height: 19
                        },
                        {
                            x: -1,
                            y: 28,
                            width: 19,
                            height: 19
                        },
                    ],
                    currentFrame: 0,
                    numFrames: 2,
                    frameSpeedRate: 3,
                    startTime: Date.now()
                },
                attack: {
                    srcRect: [
                        {
                            x: -1,
                            y: 58,
                            width: 19,
                            height: 19
                        },
                        {
                            x: -1,
                            y: 28,
                            width: 19,
                            height: 19
                        },
                    ],
                    currentFrame: 0,
                    numFrames: 2,
                    frameSpeedRate: 3,
                    startTime: Date.now()
                }
            },
            left: {
                move: {
                    srcRect: [
                        {
                            x: 28,
                            y: -1,
                            width: 19,
                            height: 19
                        },
                        {
                            x: 28,
                            y: 29,
                            width: 19,
                            height: 19
                        },
                    ],
                    currentFrame: 0,
                    numFrames: 2,
                    frameSpeedRate: 3,
                    startTime: Date.now()
                },
                attack: {
                    srcRect: [
                        {
                            x: 28,
                            y: 58,
                            width: 20,
                            height: 20
                        },
                        {
                            x: 28,
                            y: 28,
                            width: 20,
                            height: 20
                        },
                    ],
                    currentFrame: 0,
                    numFrames: 2,
                    frameSpeedRate: 3,
                    startTime: Date.now()
                }

            },
            up: {
                move: {
                    srcRect: [
                        {
                            x: 58,
                            y: -1,
                            width: 19,
                            height: 19
                        },
                        {
                            x: 58,
                            y: 28,
                            width: 19,
                            height: 19
                        },
                    ],
                    currentFrame: 0,
                    numFrames: 2,
                    frameSpeedRate: 3,
                    startTime: Date.now()
                },
                attack: {
                    srcRect: [
                        {
                            x: 58,
                            y: 58,
                            // y: 57,
                            width: 19,
                            height: 20
                        },
                        {
                            x: 58,
                            y: 28,
                            // y: 57,
                            width: 19,
                            height: 20
                        }

                    ],
                    currentFrame: 0,
                    numFrames: 2,
                    frameSpeedRate: 4,
                    startTime: Date.now()
                }

            },
            right: {
                move: {
                    srcRect: [
                        {
                            x: 88,
                            y: -1,
                            width: 19,
                            height: 19
                        },
                        {
                            x: 88,
                            y: 28,
                            width: 19,
                            height: 19
                        },
                    ],
                    currentFrame: 0,
                    numFrames: 2,
                    frameSpeedRate: 3,
                    startTime: Date.now()
                },
                attack: {
                    srcRect: [
                        {
                            x: 88,
                            y: 58,
                            width: 19,
                            height: 19
                        },
                        {
                            x: 88,
                            y: 28,
                            width: 19,
                            height: 19
                        },
                    ],
                    currentFrame: 0,
                    numFrames: 2,
                    frameSpeedRate: 3,
                    startTime: Date.now()
                }

            },

        }
    }
}



// player, registry, handleUserInput, newTilePositionComponent
const LINK_PICKUP_SWORD_1 = ({ player, handleUserInput, id, newTilePositionComponent }) => {

    const { Position } = player.components;

    const dummyPositionComponent = {
        name: "Position",
        value: {
            x: Position.x - 5,
            y: Position.y - 42.5,
            height: 75,
            width: 37.5
        }
    }

    const dummySpriteComponent = {
        name: "Sprite",
        value: {
            srcRect: {
                x: 60,
                y: 190,
                height: 30,
                width: 20,
            },
            path: "./assets/link.png"
        }
    }

    const swordEntity = player.registry.createEntity([dummyPositionComponent, dummySpriteComponent]);


    const endTime = Date.now() + 3000;           // milliseconds


    const linkAnimation = {
        srcRect: [
            {
                x: -2,
                y: 147.5,
                height: 20,
                width: 20
            }
        ]
        ,
        numFrames: 1,
        currentFrame: 0,
        frameSpeedRate: 3
    }

    const { facing } = player.components["Animation"];

    const originalSrcRect = LINK_ANIMATION.value.frames[facing]["move"]

    player.components["Animation"]["frames"][facing]["move"] = linkAnimation;

    // Create the replacement tile
    const dummySpriteTileComponent = {
        name: "Sprite",
        value: {
            path: "./assets/shop/tiles/0.png"
        }
    }

    player.registry.createEntity([dummySpriteTileComponent, newTilePositionComponent]);

    // Delete the original tile
    player.registry.removeEntityById(id, "ActionableSystem");
    const entity = player.registry.removeEntityById(id, "RenderSystem");


    player.registry.entitiesToBeRemoved.push(entity);


    // handle user input 
    document.removeEventListener("keyup", handleUserInput)
    document.removeEventListener("keydown", handleUserInput)

    new Audio("../assets/audio/importantItem.mp3").play();

    // waste time, return to normal
    const recursion = () => {
        if (endTime <= Date.now()) {
            // end the animation
            document.addEventListener("keyup", handleUserInput)
            document.addEventListener("keydown", handleUserInput)
            player.components["Animation"]["frames"][facing]["move"] = originalSrcRect;
            player.components["Sprite"]["srcRect"] = originalSrcRect.srcRect[0];
            player.registry.entitiesToBeRemoved.push(swordEntity);
            player.components["Animation"].shouldAnimate = false;
        } else {
            requestAnimationFrame(recursion);
            player.components["Movement"].vX = 0;
            player.components["Movement"].vY = 0;
            player.components["Animation"].shouldAnimate = true;
        }
    }

    recursion();

    player.components["Inventory"].inventory.sword = SWORD_1;
    player.components["Inventory"].activeA = SWORD_1;





}

export { LINK_ANIMATION, LINK_PICKUP_SWORD_1 };
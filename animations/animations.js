const LINK_ANIMATIONS = {
    "name": "Animation", 
    "value": {
        isStatic: false,        // determines if the unit turns
        isAttacking: false,
        currentTimeOfAnimation: 0,
        frames:                // object { facing: "up", move: {x, y, width, height} }
            {
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
                        srcRect:[
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
};


const FIRE_ANIMATIONS = {
    name: "Animation",
    value: {
        isStatic: true,
        isAttacking: false,
        shouldAnimate: true,
        currentTimeOfAnimation: 0,
        frames: {
            srcRect: [
                {
                    x: 0,
                    y: 0,
                    width: 225,
                    height: 135,
                },
                {
                    x: 225,
                    y: 0,
                    width: 225,
                    height: 135,
                }
            ],
            startTime: Date.now(),
            currentFrame: 0,
            numFrames: 2,
            frameSpeedRate: 3,
    }
}
}


const LINK_WEAPON_PICKUP = {
    name: "Animation",
    value: {
        isStatic: true,
        isAttacking: false,
        shouldAnimate: true,
        currentTimeOfAnimation: 0,
        frames: {
            srcRect: [
                {
                    x: -2,
                    y: 147.5,
                    width: 20,
                    height: 20,
                },
                {
                    x: -2,
                    y: 147.5,
                    width: 20,
                    height: 20,
                }
            ],
            startTime: Date.now(),
            currentFrame: 0,
            numFrames: 2,
            frameSpeedRate: 3,
        }
    }
};


const RED_OCKOTOK = {
    name: "Animation",
    value: {
        isStatic: false,
        isAttacking: false,
        currentTimeOfAnimation: 0,
        frames: {
            down: {
                move: { 
                    srcRect: [
                        {
                            x: 0,
                            y: 0,
                            width: 17,
                            height: 17
                        },
                        {
                            x: 0,
                            y: 30,
                            width: 17,
                            height: 17
                        }
                    ],
                    currentFrame: 0,
                    numFrames: 2,
                    frameSpeedRate: 3,
                    startTime: Date.now()
                    },
                    attack: {}
            },
            left: {
                move: {
                    srcRect: [
                        {
                            x: 30,
                            y: 0,
                            width: 17,
                            height: 17
                        },
                        {
                            x: 30,
                            y: 30,
                            width: 17,
                            height: 17
                        }
                    ], 
                    currentFrame: 0,
                    numFrames: 2,
                    frameSpeedRate: 3,
                    startTime: Date.now()
                },
                attack: {}
            },
            up: {
                move: {
                    srcRect: [
                        {
                            x: 60,
                            y: 0,
                            width: 17,
                            height: 17
                        },
                        {
                            x: 60,
                            y: 30,
                            width: 17,
                            height: 17
                        }
                    ], 
                    currentFrame: 0,
                    numFrames: 2,
                    frameSpeedRate: 3,
                    startTime: Date.now()
                },
                attack: {}
            },
            right: {
                move: {
                    srcRect: [
                        {
                            x: 90,
                            y: 0,
                            width: 17,
                            height: 17
                        },
                        {
                            x: 90,
                            y: 30,
                            width: 17,
                            height: 17
                        }
                    ], 
                    currentFrame: 0,
                    numFrames: 2,
                    frameSpeedRate: 3,
                    startTime: Date.now()
                },
                attack: {}
            }
        }
    }
}

const BOMB_CLOUD = { 
    name: "Animation",
    value: {
        isStatic: true,
        isAttacking: false,
        shouldAnimate: true,
        currentTimeOfAnimation: 0,
        frames: {
            srcRect: [
                {
                    x: 0,
                    y: 0,
                    width: 15.5,
                    height: 15.5,
                },
                {
                    x: 15.5,
                    y: 0,
                    width: 15.5,
                    height: 15.5,
                },
                {
                    x: 31.0,
                    y: 0,
                    width: 15.5,
                    height: 15.5,
                },
                {
                    x: 46.5,
                    y: 0,
                    width: 15.5,
                    height: 15.5,
                },
            ],
            startTime: Date.now(),
            currentFrame: 0,
            numFrames: 3,
            frameSpeedRate: 2,
            removeOnFrame: 2
        }
    }
}

export {LINK_ANIMATIONS, FIRE_ANIMATIONS,LINK_WEAPON_PICKUP,RED_OCKOTOK,BOMB_CLOUD }
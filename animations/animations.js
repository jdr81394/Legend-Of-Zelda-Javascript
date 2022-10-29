const LINK_ANIMATIONS = {
    "name": "Animation", 
    "value": {
        isStatic: false,        // determines if the unit turns
        isLoop: false,
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
        isLoop: true,
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
        isLoop: true,
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

const SWORD = {
    name: "Animation",
    value: {
        frames: {
            srcRect: [
                {
                    x: 200,
                    y: 200,
                    width: 100,
                    height: 100
                }
            ]
        }
    }
}

export {LINK_ANIMATIONS, FIRE_ANIMATIONS,LINK_WEAPON_PICKUP,SWORD }
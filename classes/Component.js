class Component {
    constructor(componentType) {
        this.componentType = componentType; // string
    }
}


class PositionComponent extends Component {
    constructor(componentType, componentObj) {
        super(componentType);

        this.x = componentObj.x;
        this.y = componentObj.y;
        this.width = componentObj.width;
        this.height = componentObj.height;

        /*
        {
            x: 1,
            y: 123,
            width: 50,
            height: 50
        }

        */
    }
}

class MovementComponent extends Component {
    constructor(componentType, componentObj) {      // Movement
        super(componentType);
        this.vX = componentObj.vX;
        this.vY = componentObj.vY;
        this.collisionX = false;
        this.collisionY = false;
    }
}

class SpriteComponent extends Component {
    constructor(componentType, componentObj) {
        super(componentType);
        this.sprite = new Image();
        this.sprite.src = componentObj.path;
        this.srcRect = componentObj.srcRect;
        /*
            {
                x,
                y,
                width,
                height
            }
        */
    }
}

class AnimationComponent extends Component {
    constructor(componentType, componentObj) {
        super(componentType);
        this.frames = componentObj.frames;
        /*
            {
                down: {
                    move: {
                        srcRect: [
                            {x,y,width,height},
                            {x,y,width,height}
                        ],
                        currentFrame: 0,
                        numFrames: 2,
                        frameSpeedRate: 3,
                        startTime: Date.now() 
                    },
                    attack: {
                        srcRect: {x,y,width,height}
                        currentFrame: 0
                        numFrames: 2,
                        frameSpeedRate: 3,
                        startTime: Date.now()
                    }
                },
                up: {},
                left: {},
                right: {}
            }
        */
        this.currentTimeOfAnimation = componentObj.currentTimeOfAnimation;
        this.facing = componentObj.facing;          // string
        this.shouldAnimate = componentObj.shouldAnimate;
    }
}



export { MovementComponent, PositionComponent, SpriteComponent, AnimationComponent }
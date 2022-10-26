import {ASSET_PATH} from "../index.js";

class Component {
    constructor(componentType) {
        this.componentType = componentType  // string
    }
}


class PositionComponent extends Component {
    constructor(componentType, componentObj) {
        super(componentType);
        this.x = componentObj.x;        // integer
        this.y = componentObj.y         // integer
        this.width = componentObj.width;   // integer
        this.height = componentObj.height // integer
    }
}

class TransitionComponent extends Component {
    constructor(componentType, componentObj) {
        super(componentType);
        this.screen = componentObj.screen;  // array of strings, objects, numbers
        this.coX = componentObj.coX;        // number
        this.coY = componentObj.coY;

    }
}


class MovementComponent extends Component {
    constructor(componentType, componentObj) {
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
        this.sprite.src = ASSET_PATH + componentObj.path;        // string to file
        this.srcRect = componentObj.srcRect         // object with {x: int, y: int, width: int, height: int} This is the coordinates on the src path
        this.pixelsBetween = componentObj.pixelsBetween;
    }
}

class AnimationComponent extends Component {
    constructor(componentType, componentObj) {
        super(componentType);
        this.isStatic = componentObj.isStatic;      // determines if there are other directions to the image
        this.isLoop = componentObj.isLoop;          // loops
        this.frames = componentObj.frames;          
        this.isAttacking = componentObj.isAttacking;
        this.currentTimeOfAnimation = componentObj.currentTimeOfAnimation;
        /*
        this.frames = 
            
                {
                    up: {
                        move: [
                            {
                                x: 1,
                                y: 1,
                                width: 20,
                                height: 20
                            },
                            {
                                x: 20,
                                y: 1,
                                width: 20,
                                height: 20
                            }
                        ],
                        attack: [
                            {...}
                        ]
                    }
                }
            

        */

    }
}

class CollisionComponent extends Component {
    constructor(componentType, componentObj) {
        super(componentType);
    }
}

class PlayerComponent extends Component {
    constructor(componentType, componentObj) {
        super(componentType);
    }
}

class CharacterComponent extends Component {
    constructor(componentType, componentObj) {
        super(componentType);
        this.facing = componentObj.facing;
    }

}

class ActionableComponent extends Component {
    constructor(componentType, componentObj) {
        super(componentType);
        this.action = componentObj.action;
    }
}


export {Component,CharacterComponent,ActionableComponent, PositionComponent, MovementComponent, TransitionComponent, SpriteComponent,AnimationComponent, CollisionComponent,PlayerComponent}
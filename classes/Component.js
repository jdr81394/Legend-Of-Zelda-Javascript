const ASSET_PATH = "./assets/";


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
    }
}


class MovementComponent extends Component {
    constructor(componentType, componentObj) {
        super(componentType);
        this.vX = componentObj.vX;
        this.vY = componentObj.vY;
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
        this.numFrames = componentObj.numFrames;
        this.currentFrame = componentObj.currentFrame;
        this.frameSpeedRate = componentObj.frameSpeedRate;
        this.isLoop = componentObj.isLoop;
        this.startTime = componentObj.startTime;
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


export {Component, PositionComponent, MovementComponent, SpriteComponent,AnimationComponent, CollisionComponent,PlayerComponent}
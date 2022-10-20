

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
        this.sprite.src = componentObj.path;        // string to file
    }
}


export {Component, PositionComponent, MovementComponent, SpriteComponent}
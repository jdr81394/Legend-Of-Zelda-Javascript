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
        this.previousX = componentObj.x;
        this.previousY = componentObj.y;
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


class CollisionComponent extends Component {
    constructor(componentType) {
        super(componentType);
    }
}

class MovementComponent extends Component {
    constructor(componentType, componentObj) {      // Movement
        super(componentType);
        this.vX = componentObj.vX;
        this.vY = componentObj.vY;
        this.knockbackVx = 0;
        this.knockbackVy = 0;
        this.collisionX = false;
        this.collisionY = false;
    }
}

class TransitionComponent extends Component {
    constructor(componentType, componentObj) {
        super(componentType);

        this.screen = componentObj.screen;
        this.coX = componentObj.coX;
        this.coY = componentObj.coY;
    }
}

class ActionableComponent extends Component {
    constructor(componentType, componentObj) {
        super(componentType);
        this.func = componentObj.func;
        this.args = componentObj.args
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
        this.isAttackingA = false;
    }
}

class InventoryComponent extends Component {
    constructor(componentType) {
        super(componentType);
        this.activeA = undefined
        /*
            {
                srcRect: ...
                name: ...
                path ..
                damage ... 
                weaponEntity: Entity
            }

        */
        this.activeB = undefined
        this.inventory = {
            sword: undefined,
            bomb: 0,
            rupies: 0,
            keys: 0
        }
    }
}

class HealthComponent extends Component {
    constructor(componentType, componentObj) {
        super(componentType);
        this.totalHealth = componentObj.totalHealth
        this.remainingHealth = componentObj.remainingHealth;
        this.invulnerableTime = 0;
    }
}

class HitboxComponent extends Component {
    constructor(componentType, componentObj) {
        super(componentType);
        this.owner = componentObj.owner;            // Link = 1, enemy = 2 , LinkWeapon = 3 , enemyProjectile = 4
        this.damage = componentObj.damage;
    }

}



export { MovementComponent, HitboxComponent, PositionComponent, SpriteComponent, AnimationComponent, CollisionComponent, TransitionComponent, ActionableComponent, InventoryComponent, HealthComponent }
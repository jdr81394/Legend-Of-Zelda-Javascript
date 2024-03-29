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

class ItemDropComponent extends Component {
    constructor(componentType, componentObj) {
        super(componentType);
        this.itemDropTable = componentObj.itemDropTable; 
    }
}

class ItemComponent extends Component {
    constructor(componentType, componentObj) {
        super(componentType);
        this.itemType = componentObj.itemType
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

class NodeComponent extends Component {
    constructor(componentType, nodeId) {
        super(componentType);
        this.nodeId = nodeId;

    }
}


class MovementComponent extends Component {
    constructor(componentType, componentObj) {
        super(componentType);
        this.vX = componentObj.vX;
        this.vY = componentObj.vY;
        this.knockBackVx = 0;
        this.knockBackVy = 0;
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
        this.frames = componentObj.frames;          
        this.isAttacking = componentObj.isAttacking;
        this.isAttackingB = false;
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
    constructor(componentType) {
        super(componentType);
    }
}


class HitboxComponent extends Component {
    constructor(componentType, componentObj) {
        super(componentType);
        this.owner = componentObj.owner;            //  2 = enemyAttack , 1 = linkattack, 4 = enemy, 3 = Link
        this.damage = componentObj.damage;
    }
}

class PlayerComponent extends Component {
    constructor(componentType, componentObj) {
        super(componentType);
        this.activeA = undefined;           // weapon
        this.activeB = undefined;           // weapon
        this.inventory = {
            sword: undefined,               // {name (string) , attack (integer), path (string), img (Image), srcRect: {x,y,width,height} , weaponEntity: Entity | undefined
            bomb: 9999,
            wand: undefined,
            boomerang: undefined,
            rupies: 0,
            keys: 0,
        }
    }
   
}

class HealthComponent extends Component {
    constructor(componentType, componentObj) {
        super(componentType);
        this.totalHealth = componentObj.totalHealth;
        this.remainingHealth = this.totalHealth;
        this.invulnerableTime = 0;
    }
}

class CharacterComponent extends Component {
    constructor(componentType, componentObj) {
        super(componentType);
        this.facing = componentObj.facing;
        this.path = null;           // determined by state
        this.stateMachine = null;       // must initialize entity first becausae state machine points back to owner
    }

}


class ActionableComponent extends Component {
    constructor(componentType, componentObj) {
        super(componentType);
        this.action = componentObj.action;
        this.screenObject = componentObj.screenObject;
        this.index = componentObj.index;
        this.audioPath = componentObj.audioPath;
    }
}



export {
    Component,
    CharacterComponent,
    HitboxComponent,
    NodeComponent, 
    ActionableComponent, 
    PositionComponent, 
    MovementComponent, 
    TransitionComponent, 
    HealthComponent,
    SpriteComponent,
    AnimationComponent, 
    CollisionComponent,
    PlayerComponent,
    ItemDropComponent,
    ItemComponent
}
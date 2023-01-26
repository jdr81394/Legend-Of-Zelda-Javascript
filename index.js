import { LINK_ANIMATION, LINK_PICKUP_SWORD_1 } from "./animations/animations.js";
import Registry from "./classes/Registry.js";
import { openingScreen, shop } from "./screens/screen.js";

export const canvas = document.getElementById("gameScreen");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

export const c = canvas.getContext("2d");
const TILE_SIZE = 70



class Game {

    constructor() {
        this.player = undefined;
        this.registry = new Registry();
        this.gameTime = Date.now();
        this.numRows = 13;
        this.numCols = 18;
        this.isDebug = true;
        this.eventBus = [];
    }

    initialize = () => {


        this.registry.addSystem("MovementSystem");
        this.registry.addSystem("RenderSystem");
        this.registry.addSystem("AnimationSystem");
        this.registry.addSystem("CollisionSystem");
        this.registry.addSystem("TransitionSystem");

        this.registry.addSystem("ActionableSystem");

        this.createPlayer();

        document.addEventListener("keyup", this.handleUserInput)
        document.addEventListener("keydown", this.handleUserInput)

        this.loadScreen(shop);     // 
    }

    update = () => {

        this.gameTime = Date.now();

        const event = this.eventBus[this.eventBus.length - 1];

        if (event) {
            /*
                {
                    args: {
                        screen,
                        coX,
                        coY,
                        eventTime : number 
                    },
                    func: Function 
                }
            */

            const { args, func } = event;

            if (args.eventTime <= this.gameTime) {
                // call the function
                func(args);     // loadNewScreen( {coX, coY, screen} )
                this.eventBus.pop();
            }
        }

        this.registry.update();

        this.registry.getSystem("AnimationSystem").update(this.gameTime);
        this.registry.getSystem("CollisionSystem").update(this.player)
        this.registry.getSystem("MovementSystem").update()
        this.registry.getSystem("TransitionSystem").update(this.player, this.eventBus, this.loadNewScreen)
        this.registry.getSystem("ActionableSystem").update(this.player, this.eventBus);

        requestAnimationFrame(this.update)
    }



    render = () => {
        this.registry.getSystem("RenderSystem").update(this.isDebug);
        requestAnimationFrame(this.render);
    }


    loadNewScreen = ({ coX, coY, screen }) => {

        this.registry.removeAllEntities();

        let newScreenObject;

        switch (screen) {
            case "shop": {
                newScreenObject = shop
                break;
            }
            default:
                break;
        }

        this.createPlayer(coX, coY);
        this.loadScreen(newScreenObject)
    }

    createPlayer = (coX, coY) => {

        let newComponents = [];

        if (this.player) {
            const { components } = this.player;

            Object.values(components).forEach((component) => {


                /*
                    {
                        componentTYpe: string,
                        x,
                        y,
                        height,
                        width
                    }

                */

                if (component.componentType === "Position") {
                    component.x = coX * TILE_SIZE;
                    component.y = coY * TILE_SIZE;
                }

                if (component.componentType == "Sprite") {
                    component.path = component.sprite.src;
                }

                newComponents.push({ name: component.componentType, value: { ...component } });
            })
            newComponents.push(LINK_ANIMATION)


        } else {

            const dummyPositionComponent = {
                name: "Position",
                value: {
                    x: 500,
                    y: 500,
                    height: TILE_SIZE - 15,
                    width: TILE_SIZE - 15
                }
            }

            const dummyMovementComponent = {
                name: "Movement",
                value: {
                    vX: 0,
                    vY: 0
                }
            };

            const dummySpriteComponent = {
                name: "Sprite",
                value: {
                    path: "./assets/link.png",
                    srcRect: {
                        x: 58,
                        y: -1,
                        width: 19,
                        height: 19
                    }
                }
            }

            const dummyCollisionComponent = {
                name: "Collision"
            }

            const dummyInventoryComponent = {
                name: "Inventory"
            }

            newComponents = [dummyCollisionComponent, dummyPositionComponent, dummySpriteComponent, dummyMovementComponent, dummyInventoryComponent, LINK_ANIMATION]
        }

        this.player = this.registry.createEntity(newComponents)



    }


    handleUserInput = (e) => {
        /*
            {
                key: string
                type: string 
            }
            
        */

        const { key, type } = e;

        if (this.player) {
            let playerMovementComponent = this.player.components["Movement"];
            let playerAnimationComponent = this.player.components["Animation"];

            if (type === "keydown") {

                switch (key) {
                    case "w": {
                        playerAnimationComponent.shouldAnimate = true;
                        // playerAnimationComponent.facing = "up";
                        playerMovementComponent.vY = -5;
                        break;
                    }
                    case "a": {
                        playerAnimationComponent.shouldAnimate = true;
                        // playerAnimationComponent.facing = "left";
                        playerMovementComponent.vX = -5;
                        break;
                    }
                    case "s": {
                        playerAnimationComponent.shouldAnimate = true;
                        // playerAnimationComponent.facing = "down";
                        playerMovementComponent.vY = 5
                        break;
                    }
                    case "d": {
                        playerAnimationComponent.shouldAnimate = true;
                        // playerAnimationComponent.facing = "right";
                        playerMovementComponent.vX = 5;
                        break;
                    }
                    case "g": {
                        this.isDebug = !this.isDebug;
                        break;
                    }
                    case "v": {
                        if (playerAnimationComponent.isAttackingA === false) {
                            playerAnimationComponent.isAttackingA = true;
                            playerAnimationComponent.currentTimeOFAnimation = Date.now();
                        }
                        break;
                    }
                    default: {
                        break;
                    }
                }

            }
            else if (type === "keyup") {
                switch (key) {
                    case "w":
                    case "s": {
                        playerAnimationComponent.shouldAnimate = false;
                        playerMovementComponent.vY = 0;
                        break;
                    }
                    case "a":
                    case "d": {
                        playerAnimationComponent.shouldAnimate = false;
                        playerMovementComponent.vX = 0;
                        break;
                    }
                    case "v": {
                        playerAnimationComponent.isAttackingA = false;
                        playerAnimationComponent.currentTimeOFAnimation = 0;
                        break;
                    }
                    default:
                        break;
                }
            }
        }
    }


    loadScreen = (screenObject) => {


        for (let i = 0; i < this.numRows; i++) {

            for (let j = 0; j < this.numCols; j++) {

                let components = [];

                let tile = screenObject.screen[i][j];
                let srcRect = undefined
                let path = '';

                if (typeof tile === "number") {
                    path = "tiles/";
                }

                else if (typeof tile === "string") {
                    path = "collidables/"
                    const dummyCollisionComponent = {
                        name: "Collision",
                        // value : { x: adf, y: daf , .....}
                    }
                    components.push(dummyCollisionComponent);
                }
                else if (typeof tile === "object") {
                    /*

                    {
                        type: string  - "door", "actionableTile"
                        tile: string/number - 0
                        coX: number
                        coY: number
                        screen: string 
                    }

                    */

                    const { type } = tile;

                    if (type === "door") {
                        const { coX, coY, screen } = tile;
                        const dummyTransitionComponent = {
                            name: "Transition",
                            value: { coX, coY, screen }
                        };

                        tile = tile.tile;
                        path = "actionableTiles/"

                        components.push(dummyTransitionComponent);
                    }
                    else if (type === "actTile") {

                        // sword animation 
                        const { eventType, tile1, tile2, remove } = tile;

                        if (remove) {
                            path = "tiles/"
                            tile = tile2;
                        }
                        else {
                            path = "actionableTiles/"
                            tile = tile1;

                            if (eventType === "Sword_1") {
                                // Do Animation, create the actionable component
                                const dummyActionableComponent = {
                                    name: "Actionable",
                                    value: {
                                        args: {
                                            newTilePositionComponent: {
                                                name: "Position",
                                                value: {
                                                    x: j * TILE_SIZE,
                                                    y: i * TILE_SIZE,
                                                    width: TILE_SIZE,
                                                    height: TILE_SIZE
                                                }
                                            },
                                            player: this.player,
                                            handleUserInput: this.handleUserInput,
                                            id: this.registry.numberOfEntities,
                                            eventTime: 0
                                        },
                                        func: LINK_PICKUP_SWORD_1  // swordPickupAnimation
                                    }
                                }

                                components.push(dummyActionableComponent);

                                /*

                                    const dummyActionableComponent = {
                                        name: "Actionable",
                                        value: {
                                            args: {
                                                newTilePositionComponent: {
                                                    name: "Position",
                                                    value: {    
                                                        x: j * TILE_SIZE,
                                                        y: i * TILE_SIZE,
                                                        width: TILE_SIZE,
                                                        height: TILE_SIZE
                                                    }
                                                }
                                                player: this.player
                                                handleUserInput: this.handleUserInput
                                                id: this.registry.numOfEntities,
                                                eventTime: 0
                                            },
                                            func: Function      // swordPickupAnimation
                                        }
                                    }


                                    done in the actionableSystem

                                    ...eventBus.push({
                                        args,
                                        func
                                    })

                                    done in registry 

                                    registry.getEntityById(id: int, system: system) {

                                        if( system.hasId(id) ) return entityOfId
                                    } 
                                */
                            }

                        }


                    }


                }

                else if (typeof tile === "undefined") {
                    continue;
                }

                const { assetPath } = screenObject;


                const dummySpriteComponent = {
                    name: "Sprite",
                    value: {
                        path: assetPath + path + tile + ".png",   // tiles/0.png
                        srcRect
                    }
                }

                components.push(dummySpriteComponent);

                const dummyPositionComponent = {
                    name: "Position",
                    value: {
                        x: j * TILE_SIZE,
                        y: i * TILE_SIZE,
                        width: TILE_SIZE,
                        height: TILE_SIZE
                    }
                }

                components.push(dummyPositionComponent);




                const entity = this.registry.createEntity(components);


            }
        }

    }

}


const game = new Game();
game.initialize();
game.update();
game.render();


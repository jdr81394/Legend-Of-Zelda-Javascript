import { searchState } from "./ai/OctorokStates.js";
import StateMachine from "./ai/StateMachine.js";
import { LINK_ANIMATION, LINK_PICKUP_SWORD_1, RED_OCTOROK_ANIMATION } from "./animations/animations.js";
import InventoryScreen from "./classes/InventoryScreen.js";
import Registry from "./classes/Registry.js";
import { openingScreen, screenA, screenB, screenC, shop, screenD, screenE } from "./screens/screen.js";
import Graph from "./classes/Graph.js";
import { SWORD_1 } from "./weapons/weapons.js";
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
        this.isDebug = false;
        this.eventBus = [];
        this.audioObject = undefined;
        this.inventoryScreen = new InventoryScreen();
        this.graph = undefined;
        this.audioPath = "";
        this.isPaused = false;
    }

    initialize = () => {


        this.registry.addSystem("MovementSystem");
        this.registry.addSystem("RenderSystem");
        this.registry.addSystem("AnimationSystem");
        this.registry.addSystem("CollisionSystem");
        this.registry.addSystem("TransitionSystem");
        this.registry.addSystem("HitboxSystem");
        this.registry.addSystem("ActionableSystem");
        this.registry.addSystem("HealthSystem");

        this.createPlayer();

        document.addEventListener("keyup", this.handleUserInput)
        document.addEventListener("keydown", this.handleUserInput)

        // this.loadScreen(openingScreen);     // 
        // this.loadScreen(shop);     // 
        // this.loadScreen(screenB);
        // this.loadScreen(screenA);
        // this.loadScreen(screenC);
        // this.loadScreen(screenD);
        this.loadScreen(screenE);


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
        this.registry.getSystem("HitboxSystem").update();
        this.registry.getSystem("HealthSystem").update(this.registry);
        this.registry.getSystem("TransitionSystem").update(this.player, this.eventBus, this.loadNewScreen)
        this.registry.getSystem("ActionableSystem").update(this.player, this.eventBus);


        for (let i = 0; i < this.registry.enemies.length; i++) {
            const enemy = this.registry.enemies[i];

            enemy.stateMachine.update();
            this.graph.dijkstrasAlgorithm(enemy);
        }


        requestAnimationFrame(this.update)
    }



    render = () => {
        this.inventoryScreen.render(this.player, this.isPaused);
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
            case "openingScreen": {
                newScreenObject = openingScreen;
                break;
            }
            case "screenA": {
                newScreenObject = screenA;
                break;
            }
            case "screenB": {
                newScreenObject = screenB;
                break;
            }
            case "screenC": {
                newScreenObject = screenC;
                break;
            }
            case "screenD": {
                newScreenObject = screenD;
                break;
            }
            case "screenE": {
                newScreenObject = screenE;
                break;
            }
            default: {
                break;
            }
        }

        this.loadScreen(newScreenObject)
        this.createPlayer(coX, coY);
    }

    createPlayer = (coX, coY) => {

        let newComponents = [];

        if (this.player) {
            const { Position } = this.player.components;



            Position.x = coX * TILE_SIZE;
            Position.y = coY * TILE_SIZE;
            this.registry.entitiesToBeAdded.push(this.player);
            return;

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

            const dummyHealthComponent = {
                name: "Health",
                value: {
                    totalHealth: 3,
                    remainingHealth: 2.5
                }
            }

            const dummyHitboxComponent = {
                name: "Hitbox",
                value: {
                    owner: 1,
                    damage: undefined
                }
            }

            newComponents = [dummyHitboxComponent, dummyCollisionComponent, dummyPositionComponent, dummySpriteComponent, dummyMovementComponent, dummyInventoryComponent, dummyHealthComponent, LINK_ANIMATION]
        }

        this.player = this.registry.createEntity(newComponents)

        this.player.components["Inventory"].inventory.sword = SWORD_1;
        this.player.components["Inventory"].activeA = SWORD_1;



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
            let playerInventoryComponent = this.player.components["Inventory"];

            if (type === "keydown") {

                switch (key) {
                    case "w": {
                        // playerAnimationComponent.facing = "up";
                        playerAnimationComponent.isAttackingA = false;
                        playerMovementComponent.vY = -5;
                        break;
                    }
                    case "a": {
                        // playerAnimationComponent.facing = "left";
                        playerAnimationComponent.isAttackingA = false;
                        playerMovementComponent.vX = -5;
                        break;
                    }
                    case "s": {
                        // playerAnimationComponent.facing = "down";
                        playerAnimationComponent.isAttackingA = false;
                        playerMovementComponent.vY = 5
                        break;
                    }
                    case "d": {
                        // playerAnimationComponent.facing = "right";
                        playerAnimationComponent.isAttackingA = false;
                        playerMovementComponent.vX = 5;
                        break;
                    }
                    case "g": {
                        this.isDebug = !this.isDebug;
                        break;
                    }
                    case "v": {
                        if (playerAnimationComponent.isAttackingA === false && playerInventoryComponent.activeA) {
                            playerAnimationComponent.isAttackingA = true;
                            playerAnimationComponent.currentTimeOFAnimation = Date.now();
                        }
                        break;
                    }
                    case "p": {
                        this.isPaused = !this.isPaused;
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
                        playerMovementComponent.vY = 0;
                        break;
                    }
                    case "a":
                    case "d": {
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

        this.graph = new Graph(this.player);

        let idOfTile = 0;
        for (let i = 0; i < this.numRows; i++) {

            for (let j = 0; j < this.numCols; j++) {

                idOfTile++;

                let components = [];

                let tile = screenObject.screen[i][j];
                let srcRect = undefined
                let path = '';


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

                if (typeof tile === "number") {
                    path = "tiles/";

                    // Add the navigatable tile to the graph
                    this.graph.generateGraph(idOfTile, dummyPositionComponent)
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
                    this.registry.createEntity([]);
                    continue;
                }

                const { assetPath } = screenObject;

                if (typeof tile !== "undefined") {
                    const dummySpriteComponent = {
                        name: "Sprite",
                        value: {
                            path: assetPath + path + tile + ".png",   // tiles/0.png
                            srcRect
                        }
                    }
                    components.push(dummySpriteComponent);

                }








                const entity = this.registry.createEntity(components);



            }
        }

        this.graph.generateEdges();

        if (screenObject.enemies && screenObject.enemies.length > 0) {

            const { enemies } = screenObject;

            for (let i = 0; i < enemies.length; i++) {
                let components = [];

                const enemy = enemies[i];
                const { x, y } = enemy;

                const dummyPositionComponent = {
                    name: "Position",
                    value: {
                        x: x * TILE_SIZE, y: y * TILE_SIZE,
                        width: TILE_SIZE - 10,
                        height: TILE_SIZE - 10
                    }
                };

                const dummySpriteComponent = {
                    name: "Sprite",
                    value: {
                        srcRect: {
                            x: -2, y: -1, width: 19, height: 19
                        },
                        path: "assets/overworld/enemies/enemies.png"
                    }
                }

                const dummyMovementComponent = {
                    name: "Movement",
                    value: {
                        vX: 0,
                        vY: 0
                    }
                }

                const dummyHealthComponent = {
                    name: "Health",
                    value: {
                        totalHealth: 3,
                        remainingHealth: 2
                    }
                }

                const dummyHitboxComponent = {
                    name: "Hitbox",
                    value: {
                        owner: 2,
                        damage: 0.5
                    }
                }




                components.push(dummyPositionComponent, dummySpriteComponent, dummyMovementComponent, dummyHitboxComponent, RED_OCTOROK_ANIMATION, dummyHealthComponent);

                const entity = this.registry.createEntity(components);

                entity.stateMachine = new StateMachine(entity, this.graph)
                entity.stateMachine.changeGlobalState(searchState);

                this.registry.enemies.push(entity);

            }
        }


        const { audioPath } = screenObject;


        if (this.audioObject === undefined) {
            this.audioObject = new Audio(audioPath);
            this.audioPath = audioPath;
            this.audioObject.play();
        } else if (this.audioObject && audioPath !== this.audioPath) {
            this.audioObject.pause();
            this.audioObject = new Audio(audioPath);
            this.audioPath = audioPath;
            this.audioObject.play();
        }

        this.audioObject.loop = true;
    }

}


const game = new Game();
game.initialize();
game.update();
game.render();


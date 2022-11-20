import {Registry} from "./classes/Registry.js"
import {screenA, screenB, screenC, screenD, screenE, screenOneObject, shop1} from "./screens/screen.js"
import { InventoryScreen } from "./classes/Inventory.js";
import { LINK_ANIMATIONS , FIRE_ANIMATIONS, LINK_WEAPON_PICKUP} from "./animations/animations.js";
import { INVENTORY_SWORD_1 } from "./items/weapons.js";
var canvas = document.querySelector('canvas')
var c = canvas.getContext('2d')

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ASSET_PATH = "./assets/";
const TILE_SIZE = 70;


class Game {
    constructor() {
        this.registry = new Registry();
        this.numRows = 13;
        this.numCols = 18;
        this.screenObject = null;
        this.eventBus = [];
        this.isDebug = true;
        this.player = null;
        this.isPaused = false;
        this.gameTime = Date.now();
        this.inventoryScreen = new InventoryScreen();
        this.audioObject = undefined;
        this.audioPath = undefined;
    }

    initialize = () => {
        
        this.registry.addSystem("RenderSystem");
        this.registry.addSystem("AnimationSystem");
        this.registry.addSystem("MovementSystem");
        this.registry.addSystem("CollisionSystem");
        this.registry.addSystem("TransitionSystem");
        this.registry.addSystem("ActionableSystem");
        this.registry.addSystem("HitboxSystem");

        document.addEventListener("keyup", this.handleUserInput);
        document.addEventListener("keydown", this.handleUserInput);

        // Set up inventory screen

    }
    

    update = () => {

        this.gameTime = Date.now();
        if(!this.isPaused) {

            const event = this.eventBus.pop();

            if(event){ 
                const {func, args } = event;
                func(args)
            }
    
            this.registry.getSystem("AnimationSystem").update(this.gameTime);
            this.registry.getSystem("MovementSystem").update(this.player.components["Character"].facing);
            this.registry.getSystem("CollisionSystem").update(this.player);
            this.registry.getSystem("TransitionSystem").update(this.player,this.eventBus, this.reloadNewScreen);
            this.registry.getSystem("ActionableSystem").update(this.player, this.eventBus);
            this.registry.getSystem("HitboxSystem").update();

            this.registry.update();

            // console.log(this.registry.getSystem("ActionableSystem"))
    
    

        }

        requestAnimationFrame(this.update);


        

    }


    render = () => {
        if(!this.isPaused) {
            this.registry.getSystem("RenderSystem").update(this.isDebug, this.registry, this.gameTime);
        }

        this.inventoryScreen.render(this.isPaused, this.player)

        requestAnimationFrame(this.render);

    }


    loadScreen = (screenObject) => {
        this.screenObject = screenObject;
        for(let i = 0; i < this.numRows; i++) {

            for(let j = 0; j < this.numCols; j++) {
                let srcRect = undefined;
                let components = [];

                const positionDummyComponent = {"name": "Position", "value": {x: j * TILE_SIZE, y: i * TILE_SIZE, width: TILE_SIZE, height: TILE_SIZE}};
                components.push(positionDummyComponent);

                let path = '';

                let {assetPath} = screenObject; 

                const typeOf = typeof this.screenObject.screen[i][j];
                let tile = this.screenObject.screen[i][j]
                if(tile === undefined ) continue;

                if(typeOf === "string") {
                    path = "collidables/"

                    const collisionComponent = {
                        "name": "Collision"
                    }
                    components.push(collisionComponent);
                }
                else if (typeOf === "number") {
                    path = "tiles/"

                    // Add the node for the AI to path here.
                }
                else if (typeOf === "object") {
                    const {type, index} = tile; 
                    if(type === "door") {

                        console.log(this.screenObjectd)
                        const {screen, coX, coY} = this.screenObject["transitionSpaces"][type][index];

                        const transitionSpaceComponent = { name: "Transition", value: {screen, coX, coY}};
    
                        components.push(transitionSpaceComponent);
                        
                        path = "actionableTiles/" 
    
                        tile = tile.tile;           // Reassigning tile to tile.tile means it will get the name of the png that is suppose to be used
    
                    }
                    else if(type === "enemy") {
                        const {name} = this.screenObject["npcs"][type][index];

                        if(name === "fire") {
                            components.push(FIRE_ANIMATIONS);
                        }
                        const characterDummyComponent = {name: "Character", value: {facing : "down"} };
                        
                        components.push(characterDummyComponent);

                        const collisionComponent = {
                            "name": "Collision"
                        }
                        components.push(collisionComponent);

                        path = `enemies/${name}/`

                        tile = tile.tile;
                    }
                    else if (type === "actTile") {

                        const {entity, remove, audioPath} = this.screenObject[type][index];
                        if(remove === true) {
                            const {replacementTile} = this.screenObject[type][index];
                            path = "tiles/"
                            tile = replacementTile;
                        }
                        else {
                            path = 'actTiles/';

                        }

                        if(entity === "SwordTile") {
                            tile = '0';    

                            if(remove === false) {
                                const actionableDummyComponent = {
                                    name: "Actionable",
                                    value: {
                                        action: this.weaponPickupAnimation,
                                        screenObject,
                                        index,
                                        audioPath 
                                    }
                                };
    
                                components.push(actionableDummyComponent);
                            }


                        }


                       





                    }


                } else {
                    path = "Not Found";
                }



                // Any tile that is not a transition space off the screen will have a sprite
               if(tile !== undefined) {
                    const spriteDummyComponent = {
                        "name": "Sprite", "value": 
                        { 
                            srcRect,
                            path: assetPath + path + tile + ".png",
                            // pixelsBetween: 30
                        }
                    };
                    components.push(spriteDummyComponent);
               }

   
       
        

                
                this.registry.createEntity(components);
                

            }
        }

        
        if(this.audioObject && this.audioPath !== this.screenObject.audioPath ) this.audioObject.pause();


        if(this.screenObject && this.screenObject.audioPath && this.audioPath !== this.screenObject.audioPath) {
            this.audioPath = this.screenObject.audioPath;
            this.audioObject = new Audio(this.screenObject.audioPath);
            this.audioObject.loop = true;
            this.audioObject.play();
        } 



        this.createPlayer();

    }

    // transitionSpace object with coX, coY, screen (string), type
    reloadNewScreen = (Transition) => {

 

        const {coX, coY, screen} = Transition;

        this.registry.removeAllEntities();
        
        // get the screen object based on name
        let screenObject;
        switch(screen) {
            case "screen1": {
                screenObject = screenOneObject;

                break;
            }
            case "screenA" : {
                screenObject = screenA;
                break;
            }
            case "screenB" : {
                screenObject = screenB;
                break;
            }
            case "screenC": {

                screenObject = screenC;
                break;
            }
            case "screenD": {
                screenObject = screenD;
                break;
            }
            case "screenE": {
                screenObject = screenE;
                break;
            }
            case "shop1" : {
                screenObject = shop1;

                break;
            }
            default:{
                break;
            }
        }


        this.loadScreen(screenObject);
        this.createPlayer(coX,coY);
    

    }

    createPlayer = (coX, coY) => {

        if(this.player) {

            this.player.components["Position"].x = coX * TILE_SIZE;
            this.player.components["Position"].y = coY * TILE_SIZE;
            this.registry.entitiesToBeAdded.push(this.player);
            return;
        };
        // We will use a grid to determine where the player loads up
        // gridCoX is a grid coefficient
        // gridCoY is a gridcoffiecien
        const gridCoX = coX !==undefined ? coX : 5;
        const gridCoY = coY !=undefined ? coY: 8;
        const playerDummyComponent = { "name": "Player" };
        const characterDummyComponent = {name: "Character", value: {facing : "down"}};
        const positionDummyComponent = {"name": "Position", "value": {x: gridCoX * TILE_SIZE, y: gridCoY * TILE_SIZE, height: TILE_SIZE - 10, width: TILE_SIZE - 10}};
        const collisionComponent = {
            "name": "Collision"
        }
        const spriteDummyComponent = {
            "name": "Sprite", "value": 
            { 
                srcRect: {
                    x: 58,
                    y: -1,
                    width: 19,
                    height: 19
                },      // facing up 
                path: "link.png",
                pixelsBetween: 30
            }
        };


        const movementComponent = {
            "name": "Movement",
            "value": {
                vX: 0,
                vY: 0
            }
        }



        this.player = this.registry.createEntity([playerDummyComponent,positionDummyComponent, characterDummyComponent, movementComponent, collisionComponent,spriteDummyComponent, 
            LINK_ANIMATIONS
        ])

        // this.addItemToInventory(INVENTORY_SWORD_1);
    }

    handleUserInput = (e) => {
        const {key, type} = e;

        if(this.player) {
            if(type === "keydown") {
                switch(key) {
                    case "w": {
                        this.player.components["Movement"].vY = -5
                        this.player.components["Movement"].vX = 0;
                        this.player.components["Character"].facing = "up";
                        this.player.components["Animation"].shouldAnimate = true;
                        this.player.components["Animation"].isAttacking = false;
                        this.player.components["Animation"].currentTimeOfAnimation = 0;
                        break;
                    }
                    case "a": {
                        this.player.components["Movement"].vX = -5
                        this.player.components["Movement"].vY = 0;
                        this.player.components["Animation"].shouldAnimate = true;
                        this.player.components["Character"].facing = "left";
                        this.player.components["Animation"].isAttacking = false;
                        this.player.components["Animation"].currentTimeOfAnimation = 0;

                        break;
                    }
                    case "s": {
                        this.player.components["Movement"].vY = 5
                        this.player.components["Movement"].vX = 0;
                        this.player.components["Animation"].shouldAnimate = true;
                        this.player.components["Character"].facing = "down";
                        this.player.components["Animation"].isAttacking = false;
                        this.player.components["Animation"].currentTimeOfAnimation = 0;
                        break;
                    }
                    case "d": {
                        this.player.components["Movement"].vX =5
                        this.player.components["Movement"].vY = 0;
                        this.player.components["Animation"].shouldAnimate = true;
                        this.player.components["Character"].facing = "right";
                        this.player.components["Animation"].isAttacking = false;
                        this.player.components["Animation"].currentTimeOfAnimation = 0;
                        break;
                    }
                    case "v": {
                        if(!this.player.components["Animation"].isAttacking) {
                            this.player.components["Animation"].isAttacking = true;
                            this.player.components["Animation"].currentTimeOfAnimation = Date.now();
                        }

                        break;
                    }
                    case "g": {
                        this.isDebug = !this.isDebug;
                        break;
                    }
                    case "p": {
                        this.isPaused = !this.isPaused;
                        console.log(this.isPaused)
                        break;
                    }
    
                    default: {
                        break;
                    }
                }
            }
    
            else if(type === "keyup") {
                const facing = this.player.components["Character"].facing;
                if(key === "w" || key === "s" ) {
                    this.player.components["Movement"].vY = 0
                    this.player.components["Animation"].shouldAnimate = false;

                }
                else if( key === "d" || key === "a" ){
                    this.player.components["Movement"].vX = 0
                    this.player.components["Animation"].shouldAnimate = false;
                }
                else if (key === "v") {

                    this.player.components["Animation"].isAttacking = false;
                    this.player.components["Animation"].currentTimeOfAnimation = 0;

                }


            }
        }


    }

    weaponPickupAnimation = (actionableTile) => {


        // Pause any current music thats being played - Later

        // Extract music from actionable component
        const {audioPath} = actionableTile.components["Actionable"];

        // Create tile to replace the tile that is going to be killed
        let dummyPositionComponent = {
            name: "Position",
            value: {
                ...actionableTile.components["Position"]
            }
        };
        let dummySpriteComponent = {
            name: "Sprite",
            value: {
                path: "shop/" + "tiles/" + "0.png"
            }
        }

        this.registry.createEntity([dummyPositionComponent, dummySpriteComponent]);

        this.registry.entitiesToBeKilled.push(actionableTile);


        // Create sword entity
        let endTime = Date.now() + 3000;

        // Set up for creating the sword
        const facing = this.player.components["Character"].facing;
        const mode = this.player.components["Animation"].isAttacking ? "attack" : "move";
        const originalSrcRect = LINK_ANIMATIONS["value"]["frames"][facing][mode]["srcRect"]
 
        dummyPositionComponent = {
            name: "Position", 
            value: {
                x: this.player.components["Position"].x - 7,
                y: this.player.components["Position"].y - 48,
                height: this.player.components["Position"].height ,
                width: this.player.components["Position"].width
            } 
        }

        dummySpriteComponent = {
            name: "Sprite",
            value: {
                srcRect: {
                    x: 58,
                    y: 192,
                    width: 30,
                    height: 20
                },
                path: "link.png"
            }
        }

        const swordEntity = this.registry.createEntity([dummyPositionComponent, dummySpriteComponent]);

        this.player.components["Animation"]["frames"][facing][mode]["srcRect"] = LINK_WEAPON_PICKUP.value.frames.srcRect;
        
        document.removeEventListener("keyup", this.handleUserInput);
        document.removeEventListener("keydown", this.handleUserInput);

        let oldAudioObject = this.audioObject;
        // Start music
        if(audioPath) {
            if(this.audioObject) this.audioObject.pause();
            
            this.audioObject = new Audio(audioPath);
            this.audioObject.play();
        }


        // Recursion to waste time
        const recursion = () => {
            let currentTime = Date.now();
            if(endTime > currentTime) {
                currentTime = Date.now();
                requestAnimationFrame(recursion);
                this.player.components["Movement"].vY = 0
                this.player.components["Movement"].vX = 0

            } 
            else {
                // return everything to normal
                document.addEventListener("keyup", this.handleUserInput);
                document.addEventListener("keydown", this.handleUserInput);
                this.player.components["Animation"]["frames"][facing][mode]["srcRect"] = originalSrcRect;
                this.player.components["Animation"].shouldAnimate = false;
                // remove sword entity
                this.registry.entitiesToBeKilled.push(swordEntity);
                this.addItemToInventory(INVENTORY_SWORD_1);
                this.audioObject = oldAudioObject;
                this.audioObject.play();
            }
        }

        recursion();
       

    }

    addItemToInventory = (item) => {


        if(item.name === "Sword_1") {
            item.img = new Image();
            item.img.src = item.path;
            this.player.components["Player"].inventory.sword = item;
            this.player.components["Player"].activeA = item;
            console.log(this.player)
        }
    }
}

const game = new Game();
game.initialize();
// game.loadScreen(screenOneObject);
// game.loadScreen(shop1);
// game.loadScreen(screenA);
// game.loadScreen(screenB);
// game.loadScreen(screenC);
// game.loadScreen(screenD);
game.loadScreen(screenE);


game.update();
game.render();

// game.weaponPickupAnimation();








// game.registry.addSystem("RenderSystem");
// game.registry.addSystem("AnimationSystem");
// game.registry.createEntity(
//     [
//         {"name": "Position", "value": {x: 0, y: 0}}, 
        // {"name": "Sprite", "value": { 
        //     srcRect: {x: 0, y: 0, width: 19, height: 19}, 
        //     path: "link.png" ,
        //     pixelsBetween: 30
        //     }
        // },
        // {
        //     "name": "Animation", 
        //     "value": {
        //         numFrames: 2,
        //         currentFrame: 0,
        //         frameSpeedRate: 3,
        //         isLoop: true,
        //         startTime: Date.now()
        //     }
        // }
//     ]
// )


export {TILE_SIZE,c, canvas, ASSET_PATH}
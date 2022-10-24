import {Entity} from "./classes/Entity.js";
import {Component} from "./classes/Component.js";
import {System} from "./classes/System.js"
import {Registry} from "./classes/Registry.js"
import {screenOneObject, shop1} from "./screens/screen.js"
import { LINK_ANIMATIONS } from "./animations/animations.js";
var canvas = document.querySelector('canvas')
var c = canvas.getContext('2d')

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


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

    }

    initialize = () => {
        
        this.registry.addSystem("RenderSystem");
        this.registry.addSystem("AnimationSystem");
        this.registry.addSystem("MovementSystem");
        this.registry.addSystem("CollisionSystem");
        this.registry.addSystem("TransitionSystem");


    }
    

    update = () => {
        requestAnimationFrame(this.update);
        this.registry.getSystem("AnimationSystem").update(this.player);
        this.registry.getSystem("MovementSystem").update(this.player.components["Player"].facing);
        this.registry.getSystem("CollisionSystem").update(this.player);
        this.registry.getSystem("TransitionSystem").update(this.player,this.eventBus, this.reloadNewScreen);

        this.registry.update();

        const event = this.eventBus.pop();

        if(event){ 
            console.log(event);
            const {func, Transition } = event;
            func(Transition)
        }

        

        document.addEventListener("keyup", this.handleUserInput);
        document.addEventListener("keydown", this.handleUserInput);
    }


    render = () => {
        requestAnimationFrame(this.render);
        this.registry.getSystem("RenderSystem").update(this.isDebug, this.linkTileDestination, this.doorTileDestination, this.floorTileDestination);
    }


    loadScreen = (screenObject) => {
        console.log(screenObject);
        this.screenObject = screenObject;
        for(let i = 0; i < this.numRows; i++) {

            for(let j = 0; j < this.numCols; j++) {

                let components = [];

                const positionDummyComponent = {"name": "Position", "value": {x: j * TILE_SIZE, y: i * TILE_SIZE, width: TILE_SIZE, height: TILE_SIZE}};
                components.push(positionDummyComponent);

                let path = '';

                const {assetPath} = screenObject; 
                console.log(assetPath)

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
                }
                else if (typeOf === "object") {
                    const {type, index} = tile;
                    
                    const {screen, coX, coY} = this.screenObject["transitionSpaces"][type][index];

                    const transitionSpaceComponent = { name: "Transition", value: {screen, coX, coY}};

                    components.push(transitionSpaceComponent);
                    
                    path = "actionableTiles/" 

                    tile = tile.tile;           // Reassigning tile to tile.tile means it will get the name of the png that is suppose to be used

                } else {
                    path = "Not Found";
                }



                // Any tile that is not a transition space off the screen will have a sprite
               if(tile !== undefined) {
                    const spriteDummyComponent = {
                        "name": "Sprite", "value": 
                        { 
                            // srcRect: {x: 0, y: 0, width: 460, height: 460}, 
                            path: assetPath + path + tile + ".png",
                            // pixelsBetween: 30
                        }
                    };
                    components.push(spriteDummyComponent);
               }

   
       
        
                
                this.registry.createEntity(components);
                

            }
        }


        this.createPlayer();

    }

    // transitionSpace object with coX, coY, screen (string), type
    reloadNewScreen = (Transition) => {

        const {coX, coY, screen} = Transition;

        this.registry.removeAllEntities();


        // get the screen object based on name
        let screenObject;
        if(screen === "screen1") {
            screenObject = screenOneObject;
        }
        else if(screen === "shop1") {
            screenObject = shop1;
        }

        console.log(screenObject)

        this.loadScreen(screenObject);
        this.createPlayer(coX,coY);
    

    }

    createPlayer = (coX, coY) => {

        if(this.player) {
            console.log(coX);
            console.log(coY);

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



        this.player = this.registry.createEntity([playerDummyComponent,positionDummyComponent,movementComponent, collisionComponent,spriteDummyComponent, 
            LINK_ANIMATIONS
        ])
    }

    handleUserInput = (e) => {
        const {key, type} = e;

        if(this.player) {
            if(type === "keydown") {
                switch(key) {
                    case "w": {
                        this.player.components["Movement"].vY = -2
                        this.player.components["Movement"].vX = 0;
                        this.player.components["Player"].facing = "up";
                        this.player.components["Animation"].shouldAnimate = true;

                        break;
                    }
                    case "a": {
                        this.player.components["Movement"].vX = -2
                        this.player.components["Movement"].vY = 0;
                        this.player.components["Animation"].shouldAnimate = true;
                        this.player.components["Player"].facing = "left";
                        

                        break;
                    }
                    case "s": {
                        this.player.components["Movement"].vY = 2
                        this.player.components["Movement"].vX = 0;
                        this.player.components["Animation"].shouldAnimate = true;
                        this.player.components["Player"].facing = "down";

                        break;
                    }
                    case "d": {
                        this.player.components["Movement"].vX =2
                        this.player.components["Movement"].vY = 0;
                        this.player.components["Animation"].shouldAnimate = true;
                        this.player.components["Player"].facing = "right";
                        
                        break;
                    }
                    case "v": {
                        this.player.components["Animation"].isAttacking = true;

                        break;
                    }
                    case "g": {
                        this.isDebug = !this.isDebug;
                        break;
                    }
    
                    default:
                        break;
                }
            }
    
            else if(type === "keyup") {
                const facing = this.player.components["Player"].facing;
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

                }


            }
        }


    }
}

const game = new Game();
game.initialize();
game.loadScreen(screenOneObject);
game.update();
game.render();










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


export {TILE_SIZE,c, canvas}
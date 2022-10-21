import {Entity} from "./classes/Entity.js";
import {Component} from "./classes/Component.js";
import {System} from "./classes/System.js"
import {Registry} from "./classes/Registry.js"
import {screenOneObject} from "./screens/screen.js"
import { LINK_ANIMATIONS } from "./animations/animations.js";
var canvas = document.querySelector('canvas')
var c = canvas.getContext('2d')

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


const TILE_SIZE = 70;

class Game {
    constructor(screenObject) {
        this.registry = new Registry();
        this.numRows = 13;
        this.numCols = 18;
        this.screenObject = screenObject;
        this.isDebug = true;
        this.player = null;

    }

    initialize = () => {
        this.registry.addSystem("RenderSystem");
        this.registry.addSystem("AnimationSystem");
        this.registry.addSystem("MovementSystem");
        this.registry.addSystem("CollisionSystem");

        this.loadScreen();


    }
    

    update = () => {
        requestAnimationFrame(this.update);
        this.registry.getSystem("AnimationSystem").update(this.player);
        this.registry.getSystem("MovementSystem").update(this.player.components["Player"].facing);
        this.registry.getSystem("CollisionSystem").update(this.player);

        this.registry.update();

        document.addEventListener("keyup", this.handleUserInput);
        document.addEventListener("keydown", this.handleUserInput);
    }


    render = () => {
        requestAnimationFrame(this.render);
        this.registry.getSystem("RenderSystem").update(this.isDebug);
    }


    loadScreen = () => {
        for(let i = 0; i < this.numRows; i++) {

            for(let j = 0; j < this.numCols; j++) {

                let components = [];

                const positionDummyComponent = {"name": "Position", "value": {x: j * TILE_SIZE, y: i * TILE_SIZE, width: TILE_SIZE, height: TILE_SIZE}};
                components.push(positionDummyComponent);

                let path = '';

                const {assetPath} = screenOneObject; 

                const type = typeof this.screenObject.screen[i][j];
                const name = this.screenObject.screen[i][j]
                if(name === undefined ) continue;

                if(type === "string") {
                    path = "collidables/"

                    const collisionComponent = {
                        "name": "Collision"
                    }
                    components.push(collisionComponent);
                }
                else if (type === "number") {
                    path = "tiles/"
                }
                else if (type === "object") {
                    path = "not found in object"
                } else {
                    path = "Not Found";
                    console.log(name);
                }

               

                const spriteDummyComponent = {
                    "name": "Sprite", "value": 
                    { 
                        // srcRect: {x: 0, y: 0, width: 460, height: 460}, 
                        path: assetPath + path + name + ".png",
                        // pixelsBetween: 30
                    }
                };
                components.push(spriteDummyComponent);
   
       
        
                
                this.registry.createEntity(components);
                

            }
        }


        this.createPlayer();

    }

    createPlayer = () => {
        // We will use a grid to determine where the player loads up
        // gridCoX is a grid coefficient
        // gridCoY is a gridcoffiecien
        const gridCoX = 5;
        const gridCoY = 8;
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

const game = new Game(screenOneObject);
game.initialize();
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
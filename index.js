import {Entity} from "./classes/Entity.js";
import {Component} from "./classes/Component.js";
import {System} from "./classes/System.js"
import {Registry} from "./classes/Registry.js"
import {screenOneObject} from "./screens/screen.js"
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
        this.registry.getSystem("AnimationSystem").update();
        this.registry.getSystem("MovementSystem").update(this.player.facing);
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

                const positionDummyComponent = {"name": "Position", "value": {x: j * TILE_SIZE, y: i * TILE_SIZE}};
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
   
                // const animationDummyComponent = {
                //     "name": "Animation", 
                //     "value": {
                //         numFrames: 2,
                //         currentFrame: 0,
                //         frameSpeedRate: 3,
                //         isLoop: true,
                //         startTime: Date.now()
                //     }
                // };

        
                
                this.registry.createEntity(components);
                

            }
        }

        // We will use a grid to determine where the player loads up
        // gridCoX is a grid coefficient
        // gridCoY is a gridcoffiecien
        const gridCoX = 5;
        const gridCoY = 8;
        const playerDummyComponent = { "name": "Player" };
        const positionDummyComponent = {"name": "Position", "value": {x: gridCoX * TILE_SIZE, y: gridCoY * TILE_SIZE}};
        const collisionComponent = {
            "name": "Collision"
        }
        const spriteDummyComponent = {
            "name": "Sprite", "value": 
            { 
                srcRect: {x: 0, y: 0, width: 19, height: 19}, 
                path: "link.png",
                // pixelsBetween: 30
            }
        };

        const movementComponent = {
            "name": "Movement",
            "value": {
                vX: 0,
                vY: 0
            }
        }

        this.player = this.registry.createEntity([playerDummyComponent,positionDummyComponent,movementComponent, collisionComponent,spriteDummyComponent])
    }

    handleUserInput = (e) => {
        const {key, type} = e;

        if(this.player) {
            if(type === "keydown") {
                switch(key) {
                    case "w": {
                        this.player.facing = "up";
                        this.player.components["Movement"].vY = -2
                        break;
                    }
                    case "a": {
                        this.player.facing = "right"
                        this.player.components["Movement"].vX = -2
                        break;
                    }
                    case "s": {
                        this.player.facing = "down"
                        this.player.components["Movement"].vY =2
                        break;
                    }
                    case "d": {
                        this.player.facing = "right"
                        this.player.components["Movement"].vX =2
                        break;
                    }
                    case "v": {
                    
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
                this.player.components["Movement"].vY = 0
                this.player.components["Movement"].vX = 0

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
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
    }

    initialize = () => {
        this.registry.addSystem("RenderSystem");
        this.registry.addSystem("AnimationSystem");

        this.loadScreen();
    }
    

    update = () => {
        requestAnimationFrame(this.update);
        game.registry.getSystem("AnimationSystem").update();

        this.registry.update();
    }


    render = () => {
        requestAnimationFrame(this.render);
        game.registry.getSystem("RenderSystem").update();
    }


    loadScreen = () => {
        for(let i = 0; i < this.numRows; i++) {

            for(let j = 0; j < this.numCols; j++) {

                const positionDummyComponent = {"name": "Position", "value": {x: j * TILE_SIZE, y: i * TILE_SIZE}};
                let path = '';
                const {assetPath} = screenOneObject; 
                const type = typeof this.screenObject.screen[i][j];
                const name = this.screenObject.screen[i][j]
                if(name === undefined ) continue;

                if(type === "string") {
                    path = "collidables/"
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

                const components = [positionDummyComponent, spriteDummyComponent];

                this.registry.createEntity(components);


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
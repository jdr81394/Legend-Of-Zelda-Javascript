import { LINK_ANIMATION } from "./animations/animations.js";
import Registry from "./classes/Registry.js";
import { openingScreen } from "./screens/screen.js";

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
    }

    initialize = () => {


        this.registry.addSystem("MovementSystem");
        this.registry.addSystem("RenderSystem");
        this.registry.addSystem("AnimationSystem");
        this.registry.addSystem("CollisionSystem");

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

        this.player = this.registry.createEntity([dummyMovementComponent, dummyPositionComponent, dummySpriteComponent, dummyCollisionComponent, LINK_ANIMATION])

        // this.registry.addEntityToSystem(this.player)

        document.addEventListener("keyup", this.handleUserInput)
        document.addEventListener("keydown", this.handleUserInput)

        this.loadScreen(openingScreen);

        console.log("this.player: ", this.player);
    }

    update = () => {

        this.gameTime = Date.now();

        this.registry.update();

        this.registry.getSystem("CollisionSystem").update(this.player)

        this.registry.getSystem("MovementSystem").update()
        this.registry.getSystem("RenderSystem").update(this.isDebug);
        this.registry.getSystem("AnimationSystem").update(this.gameTime);
        requestAnimationFrame(this.update)
    }

    render = () => {
        requestAnimationFrame(this.render);
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

                const tile = screenObject.screen[i][j];
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


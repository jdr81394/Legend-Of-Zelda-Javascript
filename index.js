import {Entity} from "./classes/Entity.js";
import {Component} from "./classes/Component.js";
import {System} from "./classes/System.js"
import {Registry} from "./classes/Registry.js"


class Game {
    constructor() {
        this.registry = new Registry();
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
}

const game = new Game();
game.registry.addSystem("RenderSystem");
game.registry.addSystem("AnimationSystem");
game.registry.createEntity(
    [
        {"name": "Position", "value": {x: 0, y: 0}}, 
        {"name": "Sprite", "value": { 
            srcRect: {x: 0, y: 0, width: 19, height: 19}, 
            path: "link.png" ,
            pixelsBetween: 30
            }
        },
        {
            "name": "Animation", 
            "value": {
                numFrames: 2,
                currentFrame: 0,
                frameSpeedRate: 3,
                isLoop: true,
                startTime: Date.now()
            }
        }
    ]
)

game.update();
game.render();
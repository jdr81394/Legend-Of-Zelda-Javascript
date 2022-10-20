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
        this.registry.update();
    }


    render = () => {
        requestAnimationFrame(this.render);
    }
}

const game = new Game();
game.registry.addSystem("RenderSystem");
game.registry.createEntity([{"name": "Position", "value": {x: 0, y: 0}}, {"name": "Sprite", "value": { path: "link.png" }}])

game.update();
game.render();
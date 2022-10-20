import {Entity} from "./classes/Entity.js";
import {Component} from "./classes/Component.js";
import {System} from "./classes/System.js"
import {Registry} from "./classes/Registry.js"

const registry = new Registry();

const dummyPosition = {x: 0, y:0};

registry.createEntity([{"name": "Position", "value": dummyPosition}])


registry.update(

);
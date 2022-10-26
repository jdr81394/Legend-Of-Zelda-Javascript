// import {Registry} from "./Registry.js"

class Entity {
    constructor(id, registry) {
        this.id = id;       // integer
        this.registry = registry // registry
        this.components = {};   // object {k: string, v: object}
    }

}

export {Entity };
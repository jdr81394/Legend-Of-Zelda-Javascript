import {Entity} from "./Entity.js";
import {PositionComponent, SpriteComponent, MovementComponent} from "./Component.js";
import {System} from "./System.js"





class Registry {
    constructor() {
        this.numberOfEntities = 0;
        this.entitiesToBeAdded = [];    // entities[]
        this.entitiesToBeKilled = []    // entities[]
    }


    update = () => {
        requestAnimationFrame(this.update)
        for(let entity of this.entitiesToBeAdded) {
        }

        for(let entity of this.entitiesToBeKilled) {}
    }


    /*
    // component =  Array of Objects : 
    [
        { 
            componentName: string, componentName , 
            value: Object { 
                k: v 
            } 
        }
    ]

    */
    createEntity = (components) => {
        const newEntity = new Entity(++this.numberOfEntities, this);
        let newEntityComponents = {}
        for(let i = 0 ; i < components.length; i++ ) {
            const component = components[i];
            switch (component["name"]) {
                case "Position": {
                    const componentObj = component["value"];
                    newEntityComponents["Position"] = new PositionComponent(component, componentObj);
                    break;
                }
                case "Movement": {
                    const componentObj = component["value"];
                    newEntityComponents["Movement"] = new MovementComponent(component, componentObj);
                    break;
                }
                case "Sprite": {
                    const componentObj = component["value"];
                    newEntityComponents["Sprite"] = new PositionComponent(component, componentObj);
                    break;
                }
                default:
                    break;
            }
        }
        console.log(newEntityComponents)

        newEntity.components = newEntityComponents;


        this.entitiesToBeAdded.push(newEntity);
    }

}

export {Registry};
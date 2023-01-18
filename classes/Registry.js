import { AnimationComponent, MovementComponent, PositionComponent, SpriteComponent } from "./Component.js";
import Entity from "./Entity.js";
import { AnimationSystem, MovementSystem, RenderSystem } from "./System.js";

class Registry {
    constructor() {
        this.numberOfEntities = 0;
        this.entitiesToBeAdded = [];
        this.systems = {}
    }


    // array of objects, ex: ["Movement", "Position"]
    /*
        {
            name: "Position",
            value: {
                x: 0
                y: 0,
                height: 50
                width: 50
            }
        }
    */
    createEntity = (components) => {
        const newEntity = new Entity(this.numberOfEntities++, this);
        let newEntityComponents = {};

        for (let i = 0; i < components.length; i++) {
            const component = components[i];

            switch (component["name"]) {
                case "Position": {
                    const componentObj = component["value"];
                    newEntityComponents["Position"] = new PositionComponent(component["name"], componentObj)
                    break;
                }
                case "Movement": {
                    const componentObj = component["value"];
                    newEntityComponents["Movement"] = new MovementComponent(component["name"], componentObj);
                    break;
                }
                case "Sprite": {
                    const componentObj = component["value"];
                    newEntityComponents["Sprite"] = new SpriteComponent(component["name"], componentObj);
                    break;
                }
                case "Animation": {
                    const componentObj = component["value"];
                    newEntityComponents["Animation"] = new AnimationComponent(component["name"], componentObj);
                    break;
                }
                default:
                    break;
            }

        }

        newEntity.components = newEntityComponents;
        this.entitiesToBeAdded.push(newEntity);

        return newEntity;
    }

    // systemType: string, example: "MovementSystem"
    addSystem = (systemType) => {
        let newSystem;
        switch (systemType) {
            case "MovementSystem": {
                newSystem = new MovementSystem(systemType);
                break;
            }
            case "RenderSystem": {
                newSystem = new RenderSystem(systemType);
                break;
            }
            case "AnimationSystem": {
                newSystem = new AnimationSystem(systemType);
                break;
            }
            default: {
                break;
            }
        }

        this.systems[systemType] = newSystem;

    }

    addEntityToSystem = (entity) => {

        Object.values(this.systems).forEach((system) => {
            /*
                system = {
                    entities: [],
                    componentRequirements: ["Movement", ...],
                    systemType: "MovementSystem",
                    .... 
                }
            */

            const componentRequirements = system["componentRequirements"];
            let addToSystem = true;

            for (let i = 0; i < componentRequirements.length; i++) {
                const req = componentRequirements[i];
                if (entity.components[req] === undefined) {
                    addToSystem = false;
                    break;
                }
            }

            if (addToSystem) {
                system.entities.push(entity);
            }
        })
    }

    getSystem = (systemType) => {
        return this.systems[systemType];
    }

}


export default Registry;
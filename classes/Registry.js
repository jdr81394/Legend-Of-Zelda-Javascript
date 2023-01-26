import { ActionableComponent, AnimationComponent, CollisionComponent, InventoryComponent, MovementComponent, PositionComponent, SpriteComponent, TransitionComponent } from "./Component.js";
import Entity from "./Entity.js";
import { ActionableSystem, AnimationSystem, CollisionSystem, MovementSystem, RenderSystem, TransitionSystem } from "./System.js";

class Registry {
    constructor() {
        this.numberOfEntities = 0;
        this.entitiesToBeAdded = [];
        this.entitiesToBeRemoved = [];
        this.systems = {}
    }


    update = () => {
        this.entitiesToBeAdded.forEach((entity) => {
            this.addEntityToSystem(entity);
        })

        this.entitiesToBeAdded = [];

        this.entitiesToBeRemoved.forEach((entity) => {
            this.removeEntityFromSystem(entity);
        })

        this.entitiesToBeRemoved = [];
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
                case "Collision": {
                    const componentObj = component["value"];
                    newEntityComponents["Collision"] = new CollisionComponent(component["name"], componentObj);
                    break;
                }
                case "Transition": {
                    const componentObj = component["value"];
                    newEntityComponents["Transition"] = new TransitionComponent(component["name"], componentObj);
                    break;
                }
                case "Actionable": {
                    const componentObj = component["value"];
                    newEntityComponents["Actionable"] = new ActionableComponent(component["name"], componentObj);
                    break;
                }
                case "Inventory": {
                    const componentObj = component["value"];
                    newEntityComponents["Inventory"] = new InventoryComponent(component["name"], componentObj);
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
            case "CollisionSystem": {
                newSystem = new CollisionSystem(systemType);
                break;
            }
            case "TransitionSystem": {
                newSystem = new TransitionSystem(systemType)
                break;
            }
            case "ActionableSystem": {
                newSystem = new ActionableSystem(systemType);
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

    removeEntityFromSystem = (entity) => {

        Object.values(this.systems).forEach((system) => {
            system.entities = system.entities.filter((sysEntity) => sysEntity.id !== entity.id);

        })
    }

    getSystem = (systemType) => {
        return this.systems[systemType];
    }

    removeEntityById = (id, systemType) => {
        const system = this.systems[systemType];

        for (let i = 0; i < system.entities.length; i++) {
            const entity = system.entities[i];
            if (id === entity.id) {
                // remove the entity
                system.entities = system.entities.slice(0, i).concat(
                    system.entities.slice(i + 1)
                );   // [a, b, c , d, e ] splice(0,2).concat(i.i)

                return entity;

            }
        }
    }

    removeAllEntities = () => {
        Object.values(this.systems).forEach((system) => {
            system.entities = [];
        })
    }

}


export default Registry;
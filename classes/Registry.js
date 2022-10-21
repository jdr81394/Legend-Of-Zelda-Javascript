import {Entity} from "./Entity.js";
import {PositionComponent, SpriteComponent, MovementComponent, AnimationComponent, CollisionComponent, PlayerComponent} from "./Component.js";
import {AnimationSystem, CollisionSystem, MovementSystem, RenderSystem} from "./System.js"




class Registry {
    constructor() {
        this.numberOfEntities = 0;
        this.systems = {}               // object { name (string) : RenderSystem,VelocitySystem, etc (string) }
        this.entitiesToBeAdded = [];    // entities[]
        this.entitiesToBeKilled = []    // entities[]
    }

    //3
    update = () => {
        for(let entity of this.entitiesToBeAdded) {
            this.addEntityToSystem(entity);
        }

        this.entitiesToBeAdded = [];

        for(let entity of this.entitiesToBeKilled) {
            // remove entities from systenm
        }
    
        this.entitiesToBeKilled = [];
    }


    //1
    /*
    component =  Array of Objects : 
    [
        { 
            name: string, componentName , 
            value: Object { 
                k: v 
            } 
        }
    ]

    */
    createEntity = (components) => {
        const newEntity = new Entity(this.numberOfEntities++, this);
        let newEntityComponents = {}
        for(let i = 0 ; i < components.length; i++ ) {
            const component = components[i];
            switch (component["name"]) {
                case "Position": {
                    const componentObj = component["value"];
                    newEntityComponents["Position"] = new PositionComponent(component["name"], componentObj);
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
                case "Player" : {
                    const componentObj = component["value"];
                    newEntityComponents["Player"] = new PlayerComponent(component["name"], componentObj);
                    break;
                }
                case "Collision": {
                    const componentObj = component["value"];
                    newEntityComponents["Collision"] = new CollisionComponent(component["name"], componentObj);
                    break;
                }
                default:
                    break;
            }
        }

        newEntity.components = newEntityComponents;
        this.entitiesToBeAdded.push(newEntity);
        if(newEntity.components["Player"]){ 
            return newEntity;
        }
    }

    // 2
    // systemType string : RenderSystem, VelocitySystem, etc
    addSystem = (systemType) => {
        let newSystem;
        switch (systemType) {
            case "RenderSystem": {
                newSystem = new RenderSystem(systemType);
                break;
            }
            case "AnimationSystem":{
                newSystem = new AnimationSystem(systemType);
                break;
            }
            case "CollisionSystem": {
                newSystem = new CollisionSystem(systemType);
                break;
            }
            case "MovementSystem": {
                newSystem = new MovementSystem(systemType);
                break;
            }
            default: {
                break;
            }
        }
        this.systems[systemType] = newSystem;
    }

    //4
    // entity : Entity
    addEntityToSystem = (entity) => {

        Object.values(this.systems).forEach((system) => {
            let addToSystem = true;

            const componentRequirements = system["componentRequirements"];
            
            for (let i = 0; i < componentRequirements.length; i++) {
                const req = componentRequirements[i];
                if(entity.components[req] === undefined) {
                    addToSystem = false;
                    break;
                }

            }
            if(addToSystem) system.entities.push(entity);  
        })
    }

    // 5
    // returns System
    // systemType: string
    getSystem = (systemType) => {
        return this.systems[systemType];
    }
}

export {Registry};
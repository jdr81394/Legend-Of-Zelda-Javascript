
import {TILE_SIZE, c , canvas} from "../index.js";
class System {
    constructor(systemType) {
        this.systemType = systemType ; // string
        this.entities = []
    }
}


class RenderSystem extends System {
    constructor(systemType) {
        super (systemType);
        this.componentRequirements = ["Position", "Sprite"];        // string[]
    }

    update = () => {
        c.clearRect(0,0,canvas.width,canvas.height);
        for(let entity of this.entities) {
            const spriteComponent = entity.components["Sprite"];
            const positionComponent = entity.components["Position"];
            
            const {sprite, srcRect} = spriteComponent;
            c.beginPath();

            if(srcRect) {
                const {x,y,width, height} = srcRect;
                c.drawImage(
                    sprite,
                    x,y,width,height,
                    positionComponent.x, positionComponent.y, TILE_SIZE,TILE_SIZE
                )
            } else {
                c.drawImage(sprite,
                    positionComponent.x, positionComponent.y, TILE_SIZE,TILE_SIZE)
            }

            // console.log(srcRect);


        }
    }
}


class AnimationSystem extends System {
    constructor(systemType) {
        super(systemType);
        this.componentRequirements = ["Position", "Sprite", "Animation"];
    }

    update = () => {
        for(let entity of this.entities) {
            // const animationComponent = entity.components["Animation"];
            

            entity.components["Animation"]["currentFrame"] = Math.round(
                (Date.now() - entity.components["Animation"]["startTime"]) 
                * entity.components["Animation"]["frameSpeedRate"] / 1000
            ) % entity.components["Animation"]["numFrames"];

            // console.log(entity.components["Animation"]["startTime"]);
            // console.log(entity.components["Animation"]["frameSpeedRate"])
            // console.log(entity.components["Animation"]["currentFrame"])

            // console.log(entity.components["Sprite"]);
            if(entity.components["Sprite"]["pixelsBetween"]) entity.components["Sprite"]["srcRect"]["x"] = entity.components["Animation"]["currentFrame"] * entity.components["Sprite"]["pixelsBetween"];
            else entity.components["Sprite"]["srcRect"]["x"] = entity.components["Animation"]["currentFrame"] * entity.components["Sprite"]["width"]
            // console.log(entity.components["Sprite"]["srcRect"]["x"])
        }
    }
}

export {System, RenderSystem, AnimationSystem}
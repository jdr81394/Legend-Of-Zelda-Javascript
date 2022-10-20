

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
        this.canvas = document.querySelector('canvas')
        this.c = this.canvas.getContext('2d')

        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        console.log(this.c);
    }

    update = () => {
        this.c.clearRect(0,0,this.canvas.width,this.canvas.height);
        for(let entity of this.entities) {
            const spriteComponent = entity.components["Sprite"];
            const positionComponent = entity.components["Position"];
            
            const {sprite, srcRect} = spriteComponent;
            const {x,y,width, height} = srcRect;

            // console.log(srcRect);
            this.c.beginPath();
            this.c.drawImage(
                sprite,
                x,y,width,height,
                positionComponent.x, positionComponent.y, 40,40
            )
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
            entity.components["Sprite"]["srcRect"]["x"] = entity.components["Animation"]["currentFrame"] * entity.components["Sprite"]["pixelsBetween"];
            // console.log(entity.components["Sprite"]["srcRect"]["x"])
        }
    }
}

export {System, RenderSystem, AnimationSystem}
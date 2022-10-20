
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

    update = (isDebug) => {
        c.clearRect(0,0,canvas.width,canvas.height);
        for(let entity of this.entities) {
            const spriteComponent = entity.components["Sprite"];
            const positionComponent = entity.components["Position"];
            
            const {sprite, srcRect} = spriteComponent;
            c.beginPath();

            
            if(srcRect) {
                const {x,y,width, height} = srcRect;
                if(entity.components["Player"]){
                    c.globalCompositeOperation="source-over";
                }
                c.drawImage(
                    sprite,
                    x,y,width,height,
                    positionComponent.x, positionComponent.y, positionComponent.width,positionComponent.height
                )
            } else {
                c.globalCompositeOperation="destination-over";
                c.drawImage(sprite,
                    positionComponent.x, positionComponent.y, positionComponent.width,positionComponent.height)
            }


            if(isDebug && entity.components["Collision"]) {

                c.beginPath();
                c.rect(positionComponent.x,positionComponent.y, positionComponent.width, positionComponent.height);
                c.lineWidth = 3;
                c.strokeStyle = "red";
                c.stroke();
            }



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

class MovementSystem extends System {
    constructor(systemType) {
        super(systemType);
        this.componentRequirements = ["Movement"];
    }

    update = (facing) => {
        for(let i = 0; i < this.entities.length; i++) {


            if(this.entities[i].components["Movement"].collisionX) {
                this.entities[i].components["Movement"].vX = 0;
                console.log("facing: " , facing);
                if(facing === "left") this.entities[i].components["Position"].x += 5
                if(facing === "right") this.entities[i].components["Position"].x -= 5
            }

            if( this.entities[i].components["Movement"].collisionY) {
                this.entities[i].components["Movement"].vY = 0;

                if(facing === "up") this.entities[i].components["Position"].y += 5
                if(facing === "down") this.entities[i].components["Position"].y -= 5
            }

    
            this.entities[i].components["Movement"].collisionX = false;
            this.entities[i].components["Movement"].collisionY = false;


            this.entities[i].components["Position"].x +=  this.entities[i].components["Movement"].vX;
            this.entities[i].components["Position"].y +=  this.entities[i].components["Movement"].vY;

        }
    }
}


class CollisionSystem extends System {
    constructor(systemType) {
        super(systemType);
        this.componentRequirements = ["Collision"];
    }

    // Entity
    update = (player) => {

        if(player) {
            for ( let i = 0; i < this.entities.length; i++) {
                const collidable = this.entities[i];
                

                if(player.id === collidable.id) continue;       // this means comparing player to itself so  move on
    
                const {Position, Movement} = player.components;
    
                const collidablePosition = collidable.components.Position;
       
           

    
                if(
                    player && collidable &&
                    Position.x < collidablePosition.x + collidablePosition.width &&
                    Position.x + Movement.vX + Position.width > collidablePosition.x &&
                    Position.y  < collidablePosition.y + collidablePosition.height  && 
                    Position.y + Movement.vY + Position.height > collidablePosition.y 
                ) { 

    
                    if(player.components["Movement"].vX !==0 && player.components["Movement"].vX !== 0) {
                        player.components["Movement"].collisionX = true;
                        player.components["Movement"].collisionY = true;
                    }
    
                    if(player.dx !== 0) player.components["Movement"].collisionX = true;
                    if(player.dy !== 0) player.components["Movement"].collisionY = true;
    
                }
    

    
                
            }
        }





    }
}

export {System, RenderSystem, AnimationSystem, CollisionSystem,MovementSystem}
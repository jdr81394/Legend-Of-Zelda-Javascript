
import {TILE_SIZE, c , canvas} from "../index.js";
class System {
    constructor(systemType) {
        this.systemType = systemType ; // string
        this.entities = []
    }


    removeAllEntities = () => {
        this.entities = [];
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
                if(!entity.components["Player"]) {
                    // console.log("Sprite: ", sprite);
                    // console.log("srcRect: " ,srcRect)
                    // console.log("position: ", positionComponent); 
                }

                const {x,y,width, height} = srcRect;
                // if(entity.components["Player"]){
                    c.globalCompositeOperation="source-over";
                // }
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
    
            const {facing} = entity.components["Character"];

            if( entity.components["Player"] && ( entity.components["Animation"].shouldAnimate === true ||  entity.components["Animation"].isAttacking === true)) {

                if(facing) {
                    const mode =  entity.components["Animation"].isAttacking ? "attack" : "move";

                    const currentFrame = 
                        Math.floor(
                        ( Date.now() - entity.components["Animation"]["frames"][facing][mode]["startTime"] ) 
                        * 
                        entity.components["Animation"]["frames"][facing][mode]["frameSpeedRate"] / 1000 ) 
                        % entity.components["Animation"]["frames"][facing][mode]["numFrames"];
    

                    entity.components["Sprite"]["srcRect"] = entity.components["Animation"]["frames"][facing][mode]["srcRect"][currentFrame]
    
               
                }
            } 
            // If not player and it is a character
            else if (!entity.components["Player"] && entity.components["Character"]) {  
                if(entity.components["Animation"].isStatic ) {
                    const currentFrame = 
                        Math.floor(
                            (Date.now() - entity.components["Animation"]["frames"]["startTime"] ) 
                            *
                            entity.components["Animation"]["frames"]["frameSpeedRate"] / 1000 
                        )  % entity.components["Animation"]["frames"]["numFrames"];
                    
                        

                    console.log(entity.components["Sprite"]["srcRect"] )
                    entity.components["Sprite"]["srcRect"] = entity.components["Animation"]["frames"]["srcRect"][currentFrame];
                  
                    

                }
            }
            else {
                entity.components["Sprite"]["srcRect"] = entity.components["Animation"]["frames"][facing]["move"]["srcRect"][0];

           }
            

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

class TransitionSystem extends System {
    constructor(systemType) {
        super(systemType);
        this.componentRequirements = ["Transition"];
    }
    update = (player,eventBus, reloadNewScreen) => {
        
        if(player) {
            for ( let i = 0; i < this.entities.length; i++) {
                const transitionSpace = this.entities[i];
                

                if(player.id === transitionSpace.id) continue;       // this means comparing player to itself so  move on
    
                const {Position, Movement} = player.components;
    
                const transitionSpacePosition = transitionSpace.components.Position;
       
           

    
                if(
                    player && transitionSpace &&
                    Position.x < transitionSpacePosition.x + transitionSpacePosition.width &&
                    Position.x + Movement.vX + Position.width > transitionSpacePosition.x &&
                    Position.y  < transitionSpacePosition.y + transitionSpacePosition.height - 45   &&  // the - 45 enables the transition to look smoother and not pull the user in directly
                    Position.y + Movement.vY + Position.height > transitionSpacePosition.y 
                ) { 

                    const {Transition} = transitionSpace.components

    
                    eventBus.push(
                        {
                            func: reloadNewScreen, 
                            Transition
                        }
                    );
    
                }
    

    
                
            }
        }
    }

    // transitionSpace object with coX, coY, screen (string), type
    enterTransitionSpace = ({coX, coY, screen}) => {
        // console.log("Transition Space: " , game);
        game.unloadScreen();
    }
}

export {System, RenderSystem, AnimationSystem, TransitionSystem,CollisionSystem,MovementSystem}
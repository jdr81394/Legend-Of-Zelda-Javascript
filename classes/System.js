
import {TILE_SIZE, c , canvas} from "../index.js";
import {LINK_WEAPON_PICKUP} from "../animations/animations.js";
import { INVENTORY_SWORD_1 } from "../items/weapons.js";
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

    update = (isDebug, registry) => {
        c.clearRect(0,0,canvas.width,canvas.height);
        for(let entity of this.entities) {
            const spriteComponent = entity.components["Sprite"];
            const positionComponent = entity.components["Position"];
            
            const {sprite, srcRect} = spriteComponent;
            c.beginPath();


            
            if(srcRect) {
                if(entity.components["Player"]) {
                    // render weapon
                    let dummyHitboxComponent = undefined;

                    const facing = entity.components["Character"]["facing"];
                    if(entity.components["Player"]["activeA"] && entity.components["Animation"]["isAttacking"] && entity.components["Animation"]["frames"][facing]["attack"]["currentFrame"] === 0) {
                        let xPosition = entity.components["Position"].x;
                        let yPosition = entity.components["Position"].y;
                        let value = {};
                        if(facing === "up") {
                            xPosition = entity.components["Position"].x - 8;
                            yPosition -= 50

                            // width and height are for the srcRect
                            value = {
                                x: xPosition,
                                y: yPosition,
                                width: 70,
                                height: 60
                            }
                            dummyHitboxComponent = {
                                name: "Hitbox",
                                value: {
                                    x: xPosition + 10,
                                    y: yPosition + 5,
                                    width: 20,
                                    height: 65
                                }
                            }

                        }
                        else if (facing === "left") {
                            yPosition = entity.components["Position"].y + ( entity.components["Position"].height / 2) - 25;
                            xPosition = entity.components["Position"].x - 40;
                            value = {
                                x: xPosition,
                                y: yPosition,
                                width: 80,
                                height: 50
                            }
                            dummyHitboxComponent = {
                                name: "Hitbox",
                                value: {
                                    x: xPosition,
                                    y: yPosition + 17,
                                    width: 65,
                                    height: 20
                                }
                            }
                        }
                        else if (facing === "right") {
                            xPosition = entity.components["Position"].x + entity.components["Position"].width - 15;
                            yPosition = entity.components["Position"].y + ( entity.components["Position"].height / 2) - 23;
                            value = {
                                x: xPosition,
                                y: yPosition,
                                width: 80,
                                height: 50
                            }
                            dummyHitboxComponent = {
                                name: "Hitbox",
                                value: {
                                    x: xPosition,
                                    y: yPosition + 17,
                                    width: 65,
                                    height: 20
                                }
                            }
                        }
                        else if (facing === "down") {
                            xPosition = entity.components["Position"].x + ( entity.components["Position"].width / 2) - 16;
                            yPosition = entity.components["Position"].y + entity.components["Position"].height - 20;
                            value = {
                                x: xPosition,
                                y: yPosition,
                                width: 70,
                                height: 60
                            }
                            dummyHitboxComponent = {
                                name: "Hitbox",
                                value: {
                                    x: xPosition + 10,
                                    y: yPosition,
                                    width: 20,
                                    height: 65
                                }
                            }
                        }
                        // Now create the weapon    
                        let dummyPositionComponent = undefined;
                        let dummySpriteComponent = undefined;
    
                        if(entity.components["Player"]["activeA"]["name"] === "Sword_1") {
                            dummyPositionComponent = {
                                name: "Position",
                                value
                            }
        
                            dummySpriteComponent = {
                                name: "Sprite",
                                value: {
                                    path: "link.png",
                                    srcRect: INVENTORY_SWORD_1["srcRect"][facing]
                                }
                            }

                            
                 
                            // create hitbox

                         
                        }

                        if(!entity.components["Player"]["activeA"]["weaponEntity"]) entity.components["Player"]["activeA"]["weaponEntity"] = registry.createEntity([dummyPositionComponent,dummySpriteComponent, dummyHitboxComponent]);

                        
                        // console.log(entity.components["Player"]["activeA"]["weaponEntity"])

                    } 
                    // Get rid of the entity
                    else if(entity.components["Player"]["activeA"] && (!entity.components["Animation"]["isAttacking"] || entity.components["Animation"]["frames"][facing]["attack"]["currentFrame"] === 1) && entity.components["Player"]["activeA"]["weaponEntity"] ) {
                        registry.entitiesToBeKilled.push(entity.components["Player"]["activeA"]["weaponEntity"])
                        entity.components["Player"]["activeA"]["weaponEntity"] = undefined;
                        
                    }
                    
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

            if(isDebug && entity.components["Node"]) {
                const {x, y } = entity.components["Position"];
                const {nodeId} = entity.components["Node"].nodeId;
                c.globalCompositeOperation="source-over";

                c.beginPath();
                c.font = "12px Arial"
                c.fillStyle = "black";
                c.fillText(nodeId, x,y + 70,50);
                c.stroke();
            }

            if(isDebug 
                && (
                    entity.components["Collision"] 
                    ||
                    entity.components["Transition"]
                    )
                ) {

                c.beginPath();
                c.rect(positionComponent.x,positionComponent.y, positionComponent.width, positionComponent.height);
                c.lineWidth = 3;
                c.strokeStyle = "red";
                c.stroke();
            }

            if(isDebug && entity.components["Hitbox"]) {
                const {x,y,width,height} = entity.components["Hitbox"];
                c.beginPath();
                c.rect(x,y, width, height);
                c.lineWidth = 3;
                c.strokeStyle = "orange";
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

    update = (gameTime) => {
        for(let entity of this.entities) {
    
            const {facing} = entity.components["Character"];

            if( entity.components["Player"] && ( entity.components["Animation"].shouldAnimate === true ||  entity.components["Animation"].isAttacking === true)) {

                if(facing) {
                    const mode =  entity.components["Animation"].isAttacking ? "attack" : "move";

                    const currentFrame = 
                        Math.floor(
                        ( gameTime - entity.components["Animation"]["currentTimeOfAnimation"] ) 
                        * 
                        entity.components["Animation"]["frames"][facing][mode]["frameSpeedRate"] / 1000 ) 
                        % entity.components["Animation"]["frames"][facing][mode]["numFrames"];
    

                    if(currentFrame < 0 ) currentFrame = 0;

                    entity.components["Sprite"]["srcRect"] = entity.components["Animation"]["frames"][facing][mode]["srcRect"][currentFrame]
                    
                    entity.components["Animation"]["frames"][facing][mode]["currentFrame"] = currentFrame
               
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
                    
                        

                    entity.components["Sprite"]["srcRect"] = entity.components["Animation"]["frames"]["srcRect"][currentFrame];
                  
                    

                } else {
                    
                    if(facing) {
                        const mode =  entity.components["Animation"].isAttacking ? "attack" : "move";

                        const currentFrame = 
                            Math.floor(
                            ( gameTime - entity.components["Animation"]["currentTimeOfAnimation"] ) 
                            * 
                            entity.components["Animation"]["frames"][facing][mode]["frameSpeedRate"] / 1000 ) 
                            % entity.components["Animation"]["frames"][facing][mode]["numFrames"];
        

                        if(currentFrame < 0 ) currentFrame = 0;

                        entity.components["Sprite"]["srcRect"] = entity.components["Animation"]["frames"][facing][mode]["srcRect"][currentFrame]
                        
                        entity.components["Animation"]["frames"][facing][mode]["currentFrame"] = currentFrame
                
                    }

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

class ActionableSystem extends System {
    constructor(systemType) {
        super(systemType);
        this.componentRequirements = ["Actionable"]
    }

    update = (player) => {

        if(player) {
            for(let i = 0; i < this.entities.length; i++) {

                const actionableTile = this.entities[i];

                const {Position, Movement} = player.components;

                const actionableTilePosition = actionableTile.components.Position;

                if(
                    player && actionableTile &&
                    Position.x < actionableTilePosition.x + actionableTilePosition.width &&
                    Position.x + Movement.vX + Position.width > actionableTilePosition.x &&
                    Position.y  < actionableTilePosition.y + actionableTilePosition.height  && 
                    Position.y + Movement.vY + Position.height > actionableTilePosition.y 
                ) {
                    
                    // eventBus.push({
                    //     func: actionableTile.components["Actionable"].action,
                    //     args: actionableTile
                    // }) ;
                    const {index} = actionableTile.components["Actionable"];
                    actionableTile.components["Actionable"].action(actionableTile);
                    actionableTile.components["Actionable"]["screenObject"]["actTile"][index]["remove"] = true;
                }
            }
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
                            args: Transition
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

class HitboxSystem extends System {
    constructor(systemType) {
        super(systemType);
        this.componentRequirements = ["Hitbox"];
    }

    update = () => {
        for ( let i = 0; i < this.entities.length; i++) {

        }
    }
}

export {System, RenderSystem,HitboxSystem, AnimationSystem, TransitionSystem,CollisionSystem,MovementSystem, ActionableSystem}
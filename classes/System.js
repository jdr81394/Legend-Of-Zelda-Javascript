
import { c , canvas} from "../index.js";
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

class HealthSystem extends System {
    constructor(systemType) {
        super(systemType);
        this.componentRequirements = ["Health"];
    }
    
    update = (registry, gameTime) => {
        for (let entity of this.entities) {
            const {remainingHealth, invulnerableTime} = entity.components["Health"];

            if(gameTime >= invulnerableTime) {
                entity.components["Health"].invulnerableTime = 0;
            }
            

            if(remainingHealth <= 0) {
                registry.entitiesToBeKilled.push(entity);
            }
        }
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
                    // This is for swinging the sword
                    // If player has item, they are attacking, and the current frame is 0. We want currentFrame to be 0 because we only want to show the sword on the very first frame which is when the motion starts
                    if(entity.components["Player"]["activeA"] && entity.components["Animation"]["isAttacking"] && entity.components["Animation"]["frames"][facing]["attack"]["currentFrame"] === 0) {
                        
                        // xPosition and yPosition are to display the sword
                        let xPosition = entity.components["Position"].x;
                        let yPosition = entity.components["Position"].y;
                        let value = {};
                        const damage = 2;
                        const owner = 1;

                        if(facing === "up") {
                            xPosition = entity.components["Position"].x - 8;
                            yPosition -= 50

                            // width and height are for the srcRect of the sword
                            value = {
                                x: xPosition,
                                y: yPosition,
                                width: 70,
                                height: 60
                            }
                            dummyHitboxComponent = {
                                name: "Hitbox",
                                value: {
                                    owner,
                                    damage
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
                                    owner,
                                    damage
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
                                    owner,
                                    damage
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
                                    owner,
                                    damage
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

                        // If the weapon entity doesn't already exist
                        if(!entity.components["Player"]["activeA"]["weaponEntity"]) {
                            entity.components["Player"]["activeA"]["weaponEntity"] = registry.createEntity([dummyPositionComponent,dummySpriteComponent, dummyHitboxComponent]);
                        }

                        
                        // console.log(entity.components["Player"]["activeA"]["weaponEntity"])

                    } 
                    // Get rid of the entity
                    else if(entity.components["Player"]["activeA"] && (!entity.components["Animation"]["isAttacking"] || entity.components["Animation"]["frames"][facing]["attack"]["currentFrame"] === 1) && entity.components["Player"]["activeA"]["weaponEntity"] ) {
                        registry.entitiesToBeKilled.push(entity.components["Player"]["activeA"]["weaponEntity"])
                        entity.components["Player"]["activeA"]["weaponEntity"] = undefined;
                        
                    }
                    
                }

                const {x,y,width, height} = srcRect;
                c.globalCompositeOperation="source-over";
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

            if(isDebug) {
                this.renderDebug(entity, positionComponent);
            }



        }
    }

    renderDebug = (entity, positionComponent) => {
            
        if(entity.components["Node"]) {
            const {x, y } = entity.components["Position"];
            const {nodeId} = entity.components["Node"].nodeId;
            c.globalCompositeOperation="source-over";

            c.beginPath();
            c.font = "12px Arial"
            c.fillStyle = "black";
            c.fillText(nodeId, x,y + 70,50);
            c.stroke();
        }

        if(entity.components["Collision"] || entity.components["Transition"]) {
            c.beginPath();
            c.rect(positionComponent.x,positionComponent.y, positionComponent.width, positionComponent.height);
            c.lineWidth = 3;
            c.strokeStyle = "red";
            c.stroke();
        }

        if(entity.components["Hitbox"]) {
            const {x,y,width,height} = entity.components["Hitbox"];
            c.beginPath();
            c.rect(x,y, width, height);
            c.lineWidth = 3;
            c.strokeStyle = "orange";
            c.stroke();
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

            if(entity.components["Animation"].shouldAnimate === true || ( entity.components["Player"]  &&  entity.components["Animation"].isAttacking === true )) {
    
                const {facing} = entity.components["Character"];

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

            else if(entity.components["Animation"].isStatic ) {
                const currentFrame = 
                    Math.floor(
                        (Date.now() - entity.components["Animation"]["frames"]["startTime"] ) 
                        *
                        entity.components["Animation"]["frames"]["frameSpeedRate"] / 1000 
                    )  % entity.components["Animation"]["frames"]["numFrames"];
                
                    

                entity.components["Sprite"]["srcRect"] = entity.components["Animation"]["frames"]["srcRect"][currentFrame];
              

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

            const entity = this.entities[i];


            if(entity.components["Movement"].collisionX) {
                entity.components["Movement"].vX = 0;
                if(facing === "left") entity.components["Position"].x += 2
                if(facing === "right") entity.components["Position"].x -= 2
            }

            if( entity.components["Movement"].collisionY) {
                entity.components["Movement"].vY = 0;

                if(facing === "up") entity.components["Position"].y += 2
                if(facing === "down") entity.components["Position"].y -= 2
            }

    
            entity.components["Movement"].collisionX = false;
            entity.components["Movement"].collisionY = false;


            entity.components["Position"].x +=  entity.components["Movement"].vX;
            entity.components["Position"].y +=  entity.components["Movement"].vY;


            if(entity.components["Movement"].vY < 0) entity.components["Character"].facing = "up"
            if(entity.components["Movement"].vY > 0) entity.components["Character"].facing = "down"
            if(entity.components["Movement"].vX < 0) entity.components["Character"].facing = "left"
            if(entity.components["Movement"].vX > 0) entity.components["Character"].facing = "right"

            // He is running
            if((entity.components["Movement"].vX !== 0 || entity.components["Movement"].vY !== 0 )
                && entity.components["Animation"]) {
                entity.components["Animation"].shouldAnimate = true;

                if(entity.components["Player"]) {
                    entity.components["Animation"].currentTimeOfAnimation = 0;
                    entity.components["Animation"].isAttacking = false;
                }
            }
            // If the playeris not attacking then we should set the animate to false
            else if(entity.components["Player"] && entity.components["Animation"].isAttacking === false ) {
                    entity.components["Animation"].shouldAnimate = false;
            }

        }
    }
}

class ActionableSystem extends System {
    constructor(systemType) {
        super(systemType);
        this.componentRequirements = ["Actionable"]
    }

    update = (player, audioObject, registry, handleUserInput ) => {

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
                    
                    
                    const {index} = actionableTile.components["Actionable"];
                    audioObject = actionableTile.components["Actionable"].action(player, actionableTile, audioObject, registry, handleUserInput);
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

}

class HitboxSystem extends System {
    constructor(systemType) {
        super(systemType);
        this.componentRequirements = ["Hitbox", "Position"];
    }

    update = () => {
        for ( let i = this.entities.length - 1; i > 0 ; i-- ) {
            for(let j = 0; j < this.entities.length; j++) {

                const entityI = this.entities[i];
                const entityJ = this.entities[j];

                // If theyre the same entities, continue
                if(entityI.id === entityJ.id) {
                    continue;
                }

                const {Position: positionI,Hitbox: hitboxI} = entityI.components
                const {Position: positionJ, Hitbox: hitboxJ} = entityJ.components

    

                if(
                    positionI.x < positionJ.x + positionJ.width &&
                    positionI.x + positionI.width > positionJ.x &&
                    positionI.y < positionJ.y + positionJ.height &&
                    positionI.y + positionI.height > positionJ.y
                ) {
                    // Multiple scenarios could happen here
                    // First thing, if an enemy projectile or an enemy body hits the player, damage the player

                    // if hitboxI is enemy/enemyAttacxk and hitboxJ is link
                    // or if hitboxJ is enemy/enemyAttack and hitboxI is link
                    if(
                       (
                            hitboxI.owner % 2 === 0
                            &&
                            hitboxJ.owner === 3
                        ) ||
                        (
                            hitboxJ.owner % 2 === 0
                            &&
                            hitboxI.owner === 3

                        )
                    ) {
                        // do damage to link
                        const link = hitboxI.owner === 3 ? entityI : entityJ;
                        const enemy = hitboxI.owner % 2 === 0 ? entityI : entityJ;
                        
                        if(link.components["Health"].invulnerableTime  === 0) {
                            link.components["Health"].remainingHealth = link.components["Health"].remainingHealth - enemy.components["Hitbox"].damage;
                            link.components["Health"].invulnerableTime = Date.now() + 1000;
                        }



                    }

                    // if hitboxI is enemy and hitboxJ is link attack OR
                    // if hitboxI is link attack and hitboxJ is enemy
                    else if(
                       (
                           hitboxI.owner % 2 === 0
                            &&
                            hitboxJ.owner === 1
                        ) ||
                        (
                            hitboxI.owner === 1 
                            &&
                            hitboxJ.owner % 2 ===0
                        )
                    ) {
                        const linkAttack = hitboxI.owner === 3 ? entityI : entityJ;
                        const enemy = hitboxI.owner % 2 === 0 ? entityI : entityJ;
                        
                        if(linkAttack.components["Hitbox"].damage) {
                            if(enemy.components["Health"].invulnerableTime === 0) {
                                enemy.components["Health"].remainingHealth -= linkAttack.components["Hitbox"].damage;
                                enemy.components["Health"].invulnerableTime = Date.now() + 500;
                            }

                        }


                    }
                }

                
            }


        }
    }
}

export {System, RenderSystem,HitboxSystem, AnimationSystem, TransitionSystem,CollisionSystem,MovementSystem, HealthSystem, ActionableSystem}
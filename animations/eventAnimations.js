import { INVENTORY_SWORD_1 } from "../items/weapons.js";
import addItemToInventory from "../utilities/addItemToInventory.js";
import { LINK_ANIMATIONS, LINK_WEAPON_PICKUP } from "./animations.js";

const swordPickupAnimation = (player, actionableTile, audioObject, registry, handleUserInput) => {


    // Pause any current music thats being played - Later

    // Extract music from actionable component
    const {audioPath} = actionableTile.components["Actionable"];

    // Create tile to replace the tile that is going to be killed
    let dummyPositionComponent = {
        name: "Position",
        value: {
            ...actionableTile.components["Position"]
        }
    };
    let dummySpriteComponent = {
        name: "Sprite",
        value: {
            path: "shop/" + "tiles/" + "0.png"
        }
    }

    registry.createEntity([dummyPositionComponent, dummySpriteComponent]);

    registry.entitiesToBeKilled.push(actionableTile);


    // Create sword entity
    let endTime = Date.now() + 3000;

    // Set up for creating the sword
    const facing = player.components["Character"].facing;
    const mode = player.components["Animation"].isAttacking ? "attack" : "move";
    const originalSrcRect = LINK_ANIMATIONS["value"]["frames"][facing][mode]["srcRect"]

    dummyPositionComponent = {
        name: "Position", 
        value: {
            x: player.components["Position"].x - 7,
            y: player.components["Position"].y - 48,
            height: player.components["Position"].height ,
            width: player.components["Position"].width
        } 
    }

    dummySpriteComponent = {
        name: "Sprite",
        value: {
            srcRect: {
                x: 58,
                y: 192,
                width: 30,
                height: 20
            },
            path: "link.png"
        }
    }

    const swordEntity = registry.createEntity([dummyPositionComponent, dummySpriteComponent]);

    player.components["Animation"]["frames"][facing][mode]["srcRect"] = LINK_WEAPON_PICKUP.value.frames.srcRect;
    
    document.removeEventListener("keyup", handleUserInput);
    document.removeEventListener("keydown", handleUserInput);

    let oldAudioObject = audioObject;
    // Start music
    if(audioPath) {
        if(audioObject) audioObject.pause();
        
        audioObject = new Audio(audioPath);
        audioObject.play();
    }


    // Recursion to waste time
    const recursion = () => {
        let currentTime = Date.now();
        if(endTime > currentTime) {
            currentTime = Date.now();
            requestAnimationFrame(recursion);
            player.components["Movement"].vY = 0
            player.components["Movement"].vX = 0

        } 
        else {
            // return everything to normal
            document.addEventListener("keyup", handleUserInput);
            document.addEventListener("keydown", handleUserInput);
            player.components["Animation"]["frames"][facing][mode]["srcRect"] = originalSrcRect;
            player.components["Animation"].shouldAnimate = false;
            // remove sword entity
            registry.entitiesToBeKilled.push(swordEntity);
            addItemToInventory(player, INVENTORY_SWORD_1);
            audioObject = oldAudioObject;
            audioObject.play();
        }
    }

    recursion();
    

}



export {swordPickupAnimation};
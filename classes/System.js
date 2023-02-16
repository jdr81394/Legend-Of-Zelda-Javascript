import { LINK_PICKUP_SWORD_1 } from "../animations/animations.js";
import { canvas, c } from "../index.js";
import { SWORD_1 } from "../weapons/weapons.js";

class System {
    constructor(systemType) {
        this.systemType = systemType;
        this.entities = []
    }
}


class MovementSystem extends System {
    constructor(systemType) {
        super(systemType);
        this.componentRequirements = ["Movement", "Position"];
    }

    update = () => {
        for (let i = 0; i < this.entities.length; i++) {
            const entity = this.entities[i];

            let { Movement, Position, Animation, Collision } = entity.components;

            if (Collision) {
                const { facing } = Animation;

                if (Movement.collisionX) {
                    Movement.vX = 0;
                    if (facing === "right") Position.x -= 6;
                    if (facing === "left") Position.x += 6
                }

                if (Movement.collisionY) {
                    Movement.vY = 0;
                    if (facing === "up") Position.y += 6;
                    if (facing === "down") Position.y -= 6;

                }
            }
            Movement.collisionX = false;
            Movement.collisionY = false;

            Position.x += Movement.vX;
            Position.y += Movement.vY;

            if (Movement.vX > 0) {
                Animation.facing = "right"
            }
            if (Movement.vX < 0) {
                Animation.facing = "left"
            }

            if (Movement.vY < 0) {
                Animation.facing = "up";
            }

            if (Movement.vY > 0) {
                Animation.facing = "down";
            }

            if (Movement.vX || Movement.vY) {
                Animation.shouldAnimate = true
            } else {
                Animation.shouldAnimate = false
            }
        }
    }
}


class CollisionSystem extends System {
    constructor(systemType) {
        super(systemType);
        this.componentRequirements = ["Position", "Collision"]
    }

    update = (player) => {

        if (player) {
            for (let i = 0; i < this.entities.length; i++) {

                const entity = this.entities[i];

                if (player.id === entity.id) continue;


                const { x: px, y: py, width: pwidth, height: pheight } = player.components["Position"];
                const { x: ex, y: ey, width: ewidth, height: eheight } = entity.components["Position"];
                const { Movement } = player.components;

                if (
                    px < ex + ewidth &&
                    px + pwidth + Movement.vX > ex &&
                    py < ey + eheight &&
                    py + pheight + Movement.vY > ey
                ) {


                    if (Movement.vX !== 0) {
                        Movement.collisionX = true
                    }

                    if (Movement.vY !== 0) {
                        Movement.collisionY = true
                    }

                }


            }
        }
    }
}

class ActionableSystem extends System {
    constructor(systemType) {
        super(systemType);
        this.componentRequirements = ["Actionable"];
    }

    update = (player, eventBus) => {
        for (let i = 0; i < this.entities.length; i++) {

            if (player) {
                const entity = this.entities[i];

                const { x: px, y: py, width: pwidth, height: pheight } = player.components["Position"];
                const { x: ex, y: ey, width: ewidth, height: eheight } = entity.components["Position"];

                if (
                    px < ex + ewidth &&
                    px + pwidth > ex &&
                    py < ey + eheight &&
                    py + pheight > ey
                ) {


                    const { Actionable } = entity.components;
                    const { args, func } = Actionable;
                    // LINK_PICKUP_SWORD_1(player);

                    const event = {
                        args: {
                            ...args,
                            eventTime: 0
                        },
                        func
                    };

                    eventBus.push(event);


                }
            }
        }
    }
}

class TransitionSystem extends System {
    constructor(systemType) {
        super(systemType);
        this.componentRequirements = ["Position", "Transition"]
    }

    update = (player, eventBus, loadNewScreen) => {

        if (player) {
            for (let i = 0; i < this.entities.length; i++) {


                const entity = this.entities[i];

                const { x: px, y: py, width: pwidth, height: pheight } = player.components["Position"];
                const { x: ex, y: ey, width: ewidth, height: eheight } = entity.components["Position"];

                if (
                    px < ex + ewidth &&
                    px + pwidth > ex &&
                    py < ey + eheight &&
                    py + pheight > ey
                ) {


                    const { Transition } = entity.components;


                    const event = {
                        args: {
                            ...Transition,
                            eventTime: 0
                        },
                        func: loadNewScreen
                    };

                    eventBus.push(event);


                }


            }
        }
    }
}



class RenderSystem extends System {
    constructor(systemType) {
        super(systemType);
        this.componentRequirements = ["Position", "Sprite"];
    }

    update = (isDebug) => {
        c.clearRect(0, 0, canvas.width, canvas.height)
        for (let i = 0; i < this.entities.length; i++) {

            const entity = this.entities[i]
            const { Position, Sprite, Collision } = entity.components;
            const { x, y, width, height } = Position;
            const { srcRect, path, sprite } = Sprite;



            c.beginPath();
            if (srcRect) {
                c.globalCompositeOperation = "source-over"
                const { x: sx, y: sy, width: sw, height: sh } = srcRect;


                const { Inventory, Animation } = entity.components;
                if (Animation && Inventory) {
                    const { activeA } = Inventory;
                    const { facing, isAttackingA } = Animation;
                    const mode = isAttackingA ? "attack" : "move";

                    // If there is inventory, it must be link
                    // if there is an animation component and that isattackingA is set to true, we must be handling a sword swing
                    if (isAttackingA && Animation["frames"][facing][mode]["currentFrame"] === 0) {

                        let dummyPositionSwordComponent = { name: "Position", value: {} };
                        let dummySpriteSwordComponent = { name: "Sprite", value: {} };
                        switch (facing) {
                            case "down": {
                                let swordWidth = 70;
                                let swordHeight = 60;
                                let swordX = x - (width / 2) + (swordWidth / 2)
                                let swordY = y + height - swordHeight * .25;
                                dummyPositionSwordComponent.value = { x: swordX, y: swordY, width: swordWidth, height: swordHeight }
                                break;
                            }
                            case "left": {
                                let swordWidth = 80
                                let swordHeight = 50;
                                let swordX = x - swordWidth / 2;
                                let swordY = y + (height / 2) - (swordHeight / 2)
                                dummyPositionSwordComponent.value = { x: swordX, y: swordY, width: swordWidth, height: swordHeight }

                                break;
                            }
                            case "up": {
                                let swordWidth = 70;
                                let swordHeight = 60;
                                let swordX = x + (width / 2) - (swordWidth / 2)
                                let swordY = y - (swordHeight * .75)
                                dummyPositionSwordComponent.value = { x: swordX, y: swordY, width: swordWidth, height: swordHeight }
                                break;
                            }
                            case "right": {
                                let swordWidth = 80;
                                let swordHeight = 50;
                                let swordX = x + width - 15;
                                let swordY = y + (height / 2) - 23;
                                dummyPositionSwordComponent.value = {
                                    x: swordX, y:
                                        swordY, width: swordWidth, height: swordHeight
                                }
                                break;
                            }
                            default: {
                                break;
                            }
                        }


                        // create entity
                        dummySpriteSwordComponent.value.srcRect = SWORD_1.srcRect[facing];
                        dummySpriteSwordComponent.value.path = SWORD_1.path;


                        if (!activeA.weaponEntity) {
                            activeA.weaponEntity = entity.registry.createEntity([dummyPositionSwordComponent, dummySpriteSwordComponent]);
                        }
                    } else if (
                        activeA
                        && activeA.weaponEntity
                        && (!isAttackingA
                            || Animation["frames"][facing][mode]["currentFrame"] === 1)
                    ) {
                        entity.registry.entitiesToBeRemoved.push(entity.components["Inventory"]["activeA"]["weaponEntity"]);
                        entity.components["Inventory"]["activeA"]["weaponEntity"] = undefined;
                    }
                }


                c.drawImage(sprite, sx, sy, sw, sh, x, y, width, height);
            }
            else {
                c.globalCompositeOperation = "destination-over"
                c.drawImage(sprite, x, y, width, height)
            }

            if (isDebug) {

                c.globalCompositeOperation = "source-over"
                const { id } = entity;

                c.beginPath();
                c.fillStyle = "black"
                c.font = "15px Arial"
                c.fillText(id, x, y + 70, 50);
                c.stroke();


                if (Collision) {
                    c.rect(x, y, width, height);
                    c.lineWidth = 2;
                    c.strokeStyle = "red"
                }
            }

            c.stroke();

        }

    }
}


class AnimationSystem extends System {
    constructor(systemType) {
        super(systemType);
        this.componentRequirements = ["Position", "Sprite", "Animation"]
    }

    update = (gameTime) => {

        for (let i = 0; i < this.entities.length; i++) {
            const entity = this.entities[i];

            const { facing, shouldAnimate, isAttackingA } = entity.components["Animation"];

            if (shouldAnimate || isAttackingA) {

                const mode = isAttackingA ? "attack" : "move";

                const currentFrame = Math.floor(
                    (gameTime - entity.components["Animation"]["currentTimeOfAnimation"]) *
                    entity.components["Animation"]["frames"][facing][mode]["frameSpeedRate"] / 1000
                ) % entity.components["Animation"]["frames"][facing][mode]["numFrames"];


                entity.components["Sprite"]["srcRect"] = entity.components["Animation"]["frames"][facing][mode]["srcRect"][currentFrame];

                entity.components["Animation"]["frames"][facing][mode]["currentFrame"] = currentFrame;
            }
            else if (!shouldAnimate && !isAttackingA) {
                entity.components["Sprite"]["srcRect"] = entity.components["Animation"]["frames"][facing]["move"]["srcRect"][0];
                entity.components["Animation"]["frames"][facing]["move"]["currentFrame"] = 0;
            }

        }
    }
}

export { MovementSystem, RenderSystem, AnimationSystem, CollisionSystem, TransitionSystem, ActionableSystem };
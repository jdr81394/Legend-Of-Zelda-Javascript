import { canvas, c } from "../index.js";

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



class RenderSystem extends System {
    constructor(systemType) {
        super(systemType);
        this.componentRequirements = ["Position", "Sprite"];
    }

    update = (isDebug) => {
        c.clearRect(0, 0, canvas.width, canvas.height)
        for (let i = 0; i < this.entities.length; i++) {

            const { Position, Sprite, Collision } = this.entities[i].components;
            const { x, y, width, height } = Position;
            const { srcRect, path, sprite } = Sprite;



            c.beginPath();
            if (srcRect) {
                c.globalCompositeOperation = "source-over"
                const { x: sx, y: sy, width: sw, height: sh } = srcRect;
                c.drawImage(sprite, sx, sy, sw, sh, x, y, width, height);
            }
            else {
                c.globalCompositeOperation = "destination-over"
                c.drawImage(sprite, x, y, width, height)
            }

            if (isDebug) {
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

            const { facing, shouldAnimate } = entity.components["Animation"];

            if (shouldAnimate) {

                const currentFrame = Math.floor(
                    (gameTime - entity.components["Animation"]["currentTimeOfAnimation"]) *
                    entity.components["Animation"]["frames"][facing]["move"]["frameSpeedRate"] / 1000
                ) % entity.components["Animation"]["frames"][facing]["move"]["numFrames"];


                entity.components["Sprite"]["srcRect"] = entity.components["Animation"]["frames"][facing]["move"]["srcRect"][currentFrame];

                entity.components["Animation"]["frames"][facing]["move"]["currentFrame"] = currentFrame;
            }

        }
    }
}

export { MovementSystem, RenderSystem, AnimationSystem, CollisionSystem };
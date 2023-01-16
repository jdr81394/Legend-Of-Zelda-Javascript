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

            let { Movement, Position } = entity.components;

            Position.x += Movement.vX;
            Position.y += Movement.vY;
        }
    }
}



class RenderSystem extends System {
    constructor(systemType) {
        super(systemType);
        this.componentRequirements = ["Position"];
    }

    update = () => {

        for (let i = 0; i < this.entities.length; i++) {

            const { Position } = this.entities[i].components;
            const { x, y, width, height } = Position;



            c.clearRect(0, 0, canvas.width, canvas.height)
            c.beginPath();
            c.fillStyle = "red";
            c.fillRect(x, y, width, height);
            c.stroke();

        }

    }
}

export { MovementSystem, RenderSystem };
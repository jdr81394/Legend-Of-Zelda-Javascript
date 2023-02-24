import { TILE_SIZE } from "../index.js";

export class SearchState {

    constructor() {
        this.startTime = undefined;
    }

    enter = () => {
        this.startTime = Date.now();
    }
    execute = (enemy, graph) => {
        if (this.startTime + 2500 <= Date.now()) {

            // Decision making, hunt or shoot?
            const { x: px, y: py } = enemy.stateMachine.graph.player.components["Position"];
            const { x: ex, y: ey } = enemy.components["Position"];

            // If they are on the same y axis
            // or x axis
            if (
                (Math.abs(px - ex) < 50 && Math.abs(py - ey) > 300)
                ||
                (Math.abs(py - ey) < 50 && Math.abs(px - ex) > 300)
            ) {
                console.log("1: ", (Math.abs(px - ex) < 50 && Math.abs(py - ey) > 300));
                console.log("2: ", (Math.abs(py - ey) < 50 && Math.abs(px - ex) > 300))
                console.log("Player x ", px, ' player y: ', py)
                console.log("enemy x ", ex, ' enemy y: ', ey)
                enemy.stateMachine.changeState(new ShootRockState())

            }
            else {
                enemy.stateMachine.changeState(new HuntPlayerState());
            }
            enemy.stateMachine.changeGlobalState(new SearchState());
        }

    }
    exit = () => { }
}

export class ShootRockState {
    enter = () => { }
    execute = (enemy) => {
        const { x: px, y: py } = enemy.stateMachine.graph.player.components["Position"];
        const { x: ex, y: ey } = enemy.components["Position"];

        const dummySpriteComponent = {
            name: "Sprite",
            value: {
                path: "./assets/link.png",
                srcRect: {
                    x: 390,
                    y: 224,
                    width: 18,
                    height: 18
                }
            }
        }

        const dummyMovementComponent = {
            name: "Movement",
            value: {
                vX: 0,
                vY: 0
            }
        }

        const dummyPositionComponent = {
            name: "Position",
            value: {
                x: ex,
                y: ey,
                width: 50,
                height: 50,
            }
        }

        const dummyHitboxComponent = {
            name: "Hitbox",
            value: {
                owner: 4,
                damage: 1
            }
        }

        if (Math.abs(px - ex) < 50 && Math.abs(py - ey) > 300) {
            // same y axis
            // now determine what side link is on, top or bottom
            if (py > ey) {
                // bottom 

                console.log("Bottom")
                enemy.components["Animation"].facing = "down"
                dummyMovementComponent.value.vY = 5;
                dummyPositionComponent.value.x += TILE_SIZE * .15
                dummyPositionComponent.value.y += 30;

            }
            else {
                // top
                console.log("top")
                enemy.components["Animation"].facing = "up"
                dummyMovementComponent.value.vY = -5;
                dummyPositionComponent.value.x += TILE_SIZE * .15
                dummyPositionComponent.value.y -= 30;


            }
        }
        else {
            // same x axis
            if (px > ex) {
                enemy.components["Animation"].facing = "right"
                dummyMovementComponent.value.vX = 5;
                dummyPositionComponent.value.x += TILE_SIZE * .5
                dummyPositionComponent.value.y += 10;

                console.log("right")
                // to the right
            }
            else {
                // to the left
                enemy.components["Animation"].facing = "left"
                dummyMovementComponent.value.vX = -5;
                dummyPositionComponent.value.x -= 15;
                dummyPositionComponent.value.y += 10;

                console.log("left")

            }
        }

        enemy.registry.createEntity([dummyHitboxComponent, dummyMovementComponent, dummyPositionComponent, dummySpriteComponent])
        enemy.stateMachine.changeState(new HuntPlayerState())
    }
    exit = () => { }

}

export class HuntPlayerState {

    constructor() { }

    enter = () => {

    }
    execute = (enemy, graph) => {

        let path = graph.dijkstrasAlgorithm(enemy);

        const finalIndex = path.length - 1;
        let nextNodeId = path[finalIndex];

        if (path.length) {
            const { Position, Movement } = enemy.components
            let { x: enemyX, y: enemyY } = Position;
            const { x, y } = graph.graph[nextNodeId]["position"]


            if (enemyX - x > 0) {
                Movement.vX = -1;
            }
            else if (enemyX - x < 0) {
                Movement.vX = 1;
            } else {
                Movement.vX = 0;
            }

            if (enemyY - y > 0) {
                Movement.vY = -1;
            }
            else if (enemyY - y < 0) {
                Movement.vY = 1
            } else {
                Movement.vY = 0;
            }

            if (Math.abs(enemyX - x) <= 2) {
                enemyX = x;
            }

            if (Math.abs(enemyY - y) <= 2) {
                enemyY = y;
            }

            if (enemyX === x && enemyY === y) {
                path.pop();
            }

        }

    }

    exit = () => {

    }
}



// export const huntPlayerState = new HuntPlayerState();
// export const searchState = new SearchState();
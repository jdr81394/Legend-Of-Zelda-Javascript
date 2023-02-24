import { TILE_SIZE } from "../index.js";
export class SearchState {

    constructor() {
        this.startTime = undefined;
    }

    enter = () => {
        this.startTime = Date.now();
    }
    execute = (enemy) => {
        if (this.startTime + 2500 <= Date.now()) {

            // Decision making, hunt or shoot?
            const { x: px, y: py } = enemy.stateMachine.graph.player.components["Position"];
            const { x: ex, y: ey } = enemy.components["Position"];

            // If they are on the same y axis or on the same x axis 
            if (
                (Math.abs(px - ex) < 50 && Math.abs(py - ey) > 300)
                ||
                (Math.abs(py - ey) < 50 && Math.abs(px - ex) > 300)
            ) {
                enemy.stateMachine.changeState(new ShootRockState());
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

        const dummyHitboxComponent = {
            name: "Hitbox",
            value: {
                owner: 4,
                damage: 1
            }
        }

        const dummyPositionComponent = {
            name: "Position",
            value: {
                x: ex,
                y: ey,
                width: 50,
                height: 50
            }
        }

        // Lets determine if it is the same y axis?
        if (Math.abs(px - ex) < 50 && Math.abs(py - ey) > 300) {
            // It's the same y axis

            // Lets determine what side link is on relative to the enemy
            if (py > ey) {
                // link is on the bottom

                enemy.components["Animation"].facing = "down";
                dummyMovementComponent.value.vY = 5;
                dummyPositionComponent.value.x += TILE_SIZE * .15;
                dummyPositionComponent.value.y += 30
            } else {
                // link is on the top
                enemy.components["Animation"].facing = "up";
                dummyMovementComponent.value.vY = -5;
                dummyPositionComponent.value.x += TILE_SIZE * .15;
                dummyPositionComponent.value.y -= 30
            }

        } else {
            // Its the same x axis
            if (px > ex) {
                // link is to the right
                enemy.components["Animation"].facing = "right";
                dummyMovementComponent.value.vX = 5;
                dummyPositionComponent.value.x += TILE_SIZE * .4
                dummyPositionComponent.value.y += 10
            } else {
                // link is to the left
                enemy.components["Animation"].facing = "left";
                dummyMovementComponent.value.vX = -5;
                dummyPositionComponent.value.x -= 15;
                dummyPositionComponent.value.y += 10
            }
        }

        enemy.registry.createEntity([dummyHitboxComponent, dummyMovementComponent, dummyPositionComponent, dummySpriteComponent]);
        enemy.stateMachine.changeState(new HuntPlayerState());




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
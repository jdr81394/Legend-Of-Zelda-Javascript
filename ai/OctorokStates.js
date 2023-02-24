export class SearchState {

    constructor() {
        this.startTime = undefined;
    }

    enter = () => {
        this.startTime = Date.now();
    }
    execute = (enemy, graph) => {
        if (this.startTime + 2500 <= Date.now()) {
            enemy.stateMachine.changeState(new HuntPlayerState());
            enemy.stateMachine.changeGlobalState(new SearchState());
        }

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
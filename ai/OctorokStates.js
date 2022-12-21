
class DelayState {
    constructor(){
        this.delayTime = undefined;
    }

    enter(enemy) {
        this.delayTime = 230000;
    }

    execute(enemy, gameGraph) {
        if(this.delayTime <= 0) {
            enemy.stateMachine.setGlobalState(SEARCH_STATE)
        }
        this.delayTime = this.delayTime - 1000;
    }

    exit(enemy) {
    }
}


// Get the path they need to travel to the player
class SearchForPlayerState {
    constructor() {}

    enter(enemy) {
        console.log("Enemy is searching for player");
    }

    execute(enemy, gameGraph) {
        const path = gameGraph.dijkstrasAlgorithm(enemy);           // Enemy will use dijstras to generate
        enemy.components["Character"].path = path;

        // if path is not found, make wander
        if(path === []) {
            enemy.stateMachine.changeState(WANDER_STATE)         // wander
        } else {
            enemy.stateMachine.changeState(RUN_AT_STATE)
            enemy.stateMachine.changeGlobalState(DELAY_STATE);
        }
    }

    exit(enemy) {
        console.log("Leaving Search for Player State, State being entered is: " , enemy.currentState);
    }
};

class WanderState {}

class RunAtPlayerState {
    constructor() {}

    enter(enemy) {
        console.log("Enemy is running at the player")
    }

    execute(enemy, gameGraph) {

        let path = enemy.components["Character"].path;

        // lets get position of games "this.graph" property;
        const length = path.length - 1;
        let nextNodeId = path[length];

        // console.log(enemy.components["Character"].path)

        if(gameGraph.values[nextNodeId]) {

            const {x: enemyX, y: enemyY} = enemy.components["Position"];
            const {x,y} = gameGraph.values[nextNodeId]["position"];

            // To determine if the enemy will go vertically or horizontally first, lets use some good old randomization
            // Depending on if it is 0 or 1, the enemy will go either vertically or horizontally
            const rand = Math.round(Math.random());     

            // if 0, go horizontally or go x if y has already been determined
            // if(rand === 0 || enemyY === y) {
            //     if(enemy.components["Position"].x - x > 0) {
            //         enemy.components["Movement"].vX = 1;
            //     }
            //     else if (enemyX < 0) {
            //         enemy.components["Movement"].vX = -1;

            //     }
            //     else {
            //         enemy.components["Movement"].vX = 0;
            //     }
            // }
            // must be 1, go vertically
            // else {

                if(enemyX - x > 0) {
                    enemy.components["Movement"].vX = -1;
                }
                else if (enemyX  - x < 0) {
                    enemy.components["Movement"].vX = 1;

                }
                else {
                    enemy.components["Movement"].vX = 0;
                }
                // console.log(enemyY, y);
                if(enemyY - y > 0) {
                    enemy.components["Movement"].vY =  -1;
                }
                else if (enemyY - y < 0) {
    
                    enemy.components["Movement"].vY = 1;
    
                }
                else {
                    enemy.components["Movement"].vY = 0
                }
               
                // else if (enemyY - y < 0) {
    
                //     enemy.components["Movement"].vY = 1;
    
                // }
              
            // }

          
            
            if(enemyX === x && enemyY === y) {
                path.pop();
                if(path.length > 0) {
                    this.execute(enemy, gameGraph)

                }

            }
     
    
        }
  





    }

    exit(enemy) {
        console.log("Enemy state is changing from: ", enemy.previousState , " State being entered is: " , enemy.currentState);
    }
}

export const SEARCH_STATE = new SearchForPlayerState();
export const WANDER_STATE = new WanderState();
export const RUN_AT_STATE = new RunAtPlayerState();
export const DELAY_STATE = new DelayState();
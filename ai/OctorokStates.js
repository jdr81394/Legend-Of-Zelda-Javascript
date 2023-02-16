class SearchState {
    constructor() {
    }

    enter = () => { }
    execute = (owner, player) => {


        const { Position: ownerPosition, Movement: ownerMovement } = owner.components;
        const { Position: playerPosition } = player.components;

        let { x: ox, y: oy } = ownerPosition;
        let { x: px, y: py } = playerPosition;

        if (Math.abs(ox - px) <= 2) {
            ox = px;
            ownerMovement.vX = 0;
        }
        else if (ox < px) {
            // Change State to Move Right
            owner.stateMachine.changeState(moveRightState)

        } else {
            // Change State to Move left
            owner.stateMachine.changeState(moveLeftState)
        }

        if (ox === px) {
            if (Math.abs(oy - py) <= 2) {
                oy = py;
                ownerMovement.vY = 0;
            }
            else if (oy > py) {
                // console.log("move right")
                owner.stateMachine.changeState(moveDownState);
            } else {
                owner.stateMachine.changeState(moveUpState);

            }
        }




    }
    exit = () => { }
}

class MoveDownState {
    constructor() { }

    enter = () => { }
    execute = (owner, player) => {

        const { Position: ownerPosition, Movement } = owner.components;
        const { Position: playerPosition } = player.components;

        const { y: oy } = ownerPosition;
        const { y: py } = playerPosition;



        if (oy > py) {
            // console.log("move right")
            Movement.vX = 0;
            Movement.vY = -1
        } else {
            owner.stateMachine.changeState(searchState);

        }


    }
    exit = () => { }

}

class MoveUpState {
    constructor() { }

    enter = () => { }
    execute = (owner, player) => {

        const { Position: ownerPosition, Movement } = owner.components;
        const { Position: playerPosition } = player.components;

        const { y: oy } = ownerPosition;
        const { y: py } = playerPosition;



        if (oy < py) {
            Movement.vX = 0;
            // console.log("move right")
            Movement.vY = 1
        } else {
            owner.stateMachine.changeState(searchState);

        }


    }
    exit = () => { }

}


class MoveRightState {
    constructor() { }

    enter = () => { }
    execute = (owner, player) => {

        const { Position: ownerPosition, Movement } = owner.components;
        const { Position: playerPosition } = player.components;

        const { x: ox } = ownerPosition;
        const { x: px } = playerPosition;



        if (ox < px) {
            // console.log("move right")
            Movement.vX = 1
            Movement.vY = 0
        } else {
            owner.stateMachine.changeState(searchState);

        }


    }
    exit = () => { }

}

class MoveLeftState {
    constructor() { }

    enter = () => { }
    execute = (owner, player) => {

        const { Position: ownerPosition, Movement } = owner.components;
        const { Position: playerPosition } = player.components;

        const { x: ox } = ownerPosition;
        const { x: px } = playerPosition;



        if (ox > px) {
            console.log("move left")
            Movement.vY = 0;
            Movement.vX = -1
        } else {
            owner.stateMachine.changeState(searchState);
        }


    }
    exit = () => { }

}


const searchState = new SearchState();
const moveRightState = new MoveRightState();
const moveLeftState = new MoveLeftState();
const moveUpState = new MoveUpState();
const moveDownState = new MoveDownState();

export { searchState, moveLeftState, moveRightState }
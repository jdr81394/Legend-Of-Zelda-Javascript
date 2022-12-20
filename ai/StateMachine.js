class StateMachine {

    constructor(owner, gameGraph) {
        this.owner = owner;
        this.gameGraph = gameGraph;
        this.previousState = null;
        this.currentState = null;
        this.globalState = null;
    }

    setPreviousState(previousState) {
        this.previousState = previousState;
    }

    setCurrentState(currentState) {
        this.currentState = currentState;
    }

    setGlobalState(globalState) {
        this.globalState = globalState;
    }

    update() {
        if(this.globalState) this.globalState.execute(this.owner, this.gameGraph);

        if(this.currentState) this.currentState.execute(this.owner, this.gameGraph);
    }

    // takes telegram as argument but havent implemented this yet
    handleMessage() {}

    changeState(newState) {
        this.previousState = this.currentState;
        this.currentState.exit(this.owner);
        this.currentState = newState;
        this.currentState.enter(this.owner, this.gameGraph);
    }

    revertToPreviousState() {
        this.changeState(this.previousState);
    }

    // compares state ids
    isInState(state) {
    }
}


export default StateMachine;
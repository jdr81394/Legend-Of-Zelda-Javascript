class StateMachine {

    constructor(owner, graph) {
        this.owner = owner;
        this.graph = graph;

        this.globalState = undefined;        // higher priority
        this.currentState = undefined;       // lower priority

        this.previousGlobal = undefined;
        this.previousCurrent = undefined;
    }


    update = () => {


        if (this.globalState) this.globalState.execute(this.owner, this.graph);

        if (this.currentState) this.currentState.execute(this.owner, this.graph);
    }

    changeGlobalState(newState) {
        if (this.globalState) {
            this.globalState.exit();
            this.previousGlobal = this.globalState;

        }

        this.globalState = newState;
        this.globalState.enter();
    }


    changeState = (newState) => {
        if (this.currentState) {
            this.currentState.exit();
            this.previousCurrent = this.currentState;

        }

        this.currentState = newState;
        this.currentState.enter();

    }
}


export default StateMachine;
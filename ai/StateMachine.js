class StateMachine {

    constructor(owner, player) {
        this.owner = owner;
        this.player = player;

        this.globalState = undefined;        // higher priority
        this.currentState = undefined;       // lower priority

        this.previousGlobal = undefined;
        this.previousCurrent = undefined;
    }


    update = () => {


        if (this.globalState) this.globalState.execute();

        if (this.currentState) this.currentState.execute(this.owner, this.player);
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
        console.log("CURRENT STATE:  ", this.currentState)
        this.currentState.enter();

    }
}


export default StateMachine;
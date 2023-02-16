class Entity {
    constructor(id, registry, stateMachine) {
        this.id = id;
        this.registry = registry;
        this.stateMachine = stateMachine;
        this.components = {}
        /*

            {
                
                "Position": ...
            }
        */
    }


}


export default Entity;
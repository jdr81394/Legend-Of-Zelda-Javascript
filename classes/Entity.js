class Entity {
    constructor(id, registry) {
        this.id = id;
        this.registry = registry;
        this.components = {}
        /*

            {
                
                "Position": ...
            }
        */
    }


}


export default Entity;
class Inventory {
    constructor() {
        this.screen = document.getElementById("inventoryScreen");

        this.screen.style.height =  "632px";
        this.screen.style.width = "1120px";
        this.screen.style.background ="black";
        this.screen.style.position =  "relative";
        this.screen.style.zIndex = -1;
        this.screen.style.left = "70px"
        this.screen.style.top = "210px"

        // this.screen.style.margin = "auto"
        
    }
}





export {Inventory}
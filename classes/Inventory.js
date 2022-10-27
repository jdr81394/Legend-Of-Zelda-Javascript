
class InventoryScreen {
    constructor() {
        this.canvas = document.getElementById("inventoryScreen");
        this.c = this.canvas.getContext("2d");

        this.goldIcon = new Image();
        this.goldIcon.src = "../assets/inventory/goldIcon.png";

        this.keysAndBomb = new Image();
        this.keysAndBomb.src = "../assets/inventory/keyAndBombIcon.png";

        this.bButton = new Image();
        this.bButton.src = "../assets/inventory/B.png";
        

        this.aButton = new Image();
        this.aButton.src = "../assets/inventory/A.png";


        this.initialize();
    }


    initialize = () => {
         
        this.render();

    }


    render = () => {
        // Render black background
        requestAnimationFrame(this.render);
        this.c.clearRect(0,0, this.canvas.width, this.canvas.height);
        this.c.fillStyle = "black";
        this.c.fillRect(0,0,this.canvas.width, this.canvas.height);

        // render goldicon
        this.c.globalCompositeOperation="source-over";
        this.c.drawImage(this.goldIcon, 100, 115 ,15,15)
      
        // render keys and bomb
        this.c.drawImage(this.keysAndBomb, 100, 130 ,15,15)

        // render By button
        this.c.drawImage(
            this.bButton, 
            0,0,140,200, 
            130,125,20,20
        )

        // render B button
        this.c.drawImage(
            this.aButton, 
            0,0,140,200, 
            155,125,23,37
        )




    }
}





export {InventoryScreen}
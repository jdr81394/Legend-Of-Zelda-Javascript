const PATH = "../assets/inventory/";
class InventoryScreen {
    constructor() {
        this.canvas = document.getElementById("inventoryScreen");
        this.c = this.canvas.getContext("2d");

        this.goldIcon = new Image();
        this.goldIcon.src = `${PATH}goldIcon.png`;

        this.keysAndBomb = new Image();
        this.keysAndBomb.src = `${PATH}keyAndBombIcon.png`;

        this.bButton = new Image();
        this.bButton.src = `${PATH}B.png`;
        

        this.aButton = new Image();
        this.aButton.src = `${PATH}A.png`;

        this.lifeText = new Image();
        this.lifeText.src = `${PATH}life.png`;


        this.initialize();
    }


    initialize = () => {
         
        this.render();

    }


    render = (isPaused) => {
        // Render black background
        this.c.clearRect(0,0, this.canvas.width, this.canvas.height);
        this.c.fillStyle = "black";
        this.c.fillRect(0,0,this.canvas.width, this.canvas.height);

        // render goldicon
        this.c.globalCompositeOperation="source-over";
        this.c.drawImage(this.goldIcon, 100, 115 ,15,15)
      
        // render keys and bomb
        this.c.drawImage(this.keysAndBomb, 100, 130 ,15,15)

        // render B button
        this.c.drawImage(
            this.bButton, 
            0,0,140,200, 
            145,125,20,20
        )

        // render A button
        this.c.drawImage(
            this.aButton, 
            0,0,140,200, 
            170,125,23,37
        )

        // render Life text
        this.c.drawImage(
            this.lifeText,
            0,0, 250,200,
            210,115,50,50
        )



        // make dropdown
        if(isPaused) {
            // slide out top

            let str = this.canvas.style.top.slice(0, this.canvas.style.top.length - 2);

            // convert to number
            let number = (str * 1 )  // javascript will coerce this into a number by multiplying

            if(number < 200) {
                number = number + 10;
                this.canvas.style.top = number + "px";
            }
            
            // this.canvas.style.top = "800px";
        } else {

            let str = this.canvas.style.top.slice(0, this.canvas.style.top.length - 2);
            let number = (str * 1 )  // javascript will coerce this into a number by multiplying
            if(number > -558) {
                number = number - 10;
                this.canvas.style.top = number + "px";
            }


        }






    }
}





export {InventoryScreen}
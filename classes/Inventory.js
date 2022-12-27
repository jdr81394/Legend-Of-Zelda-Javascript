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

        this.fullHeart = new Image();
        this.fullHeart.src = `${PATH}fullHeart.png`;

        this.halfHeart = new Image();
        this.halfHeart.src = `${PATH}halfHeart.png`;

        this.emptyHeart = new Image();
        this.emptyHeart.src = `${PATH}emptyHeart.png`;


        this.initialize();
    }


    initialize = () => {
         
        this.render();

    }


    render = (isPaused, player) => {

        this.c.imageSmoothingEnabled  =true;
        this.c.imageSmoothingQuality = "high";
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

        // draw rupies & key count
        if(player && player["components"]["Player"]["inventory"]) {

            const {keys, rupies} = player["components"]["Player"]["inventory"];
            this.c.font = "12px Arial";
            this.c.fillStyle = "white";
            this.c.fillText(`x ${rupies}`, 115.5, 125, 15);
            this.c.fillText(`x ${keys}`, 115.5, 137, 15);

        }


        // draw hearts
        if(player && player["components"]["Health"]["totalHealth"]) {
            const totalHealth = player["components"]["Health"]["totalHealth"];      // integer
            const currentHealth = player["components"]["Health"]["remainingHealth"]
            let arrHealth = [];
            for(let i = 0; i < totalHealth; i++) {
                // current health 2.5
                // total 4
                // H-H-h-0

                if(currentHealth >= i + 1) {
                    //  full heart
                    arrHealth[i] = 1;
                }
                else if ( currentHealth >= i + .5) {
                    // half heart
                    arrHealth[i] = 0.5;
                } else {
                    // empty heart
                    arrHealth[i] = 0;
                }
            }

            // heart placement, 1st heart
            const x = 210;
            const y = 130;
            const w = 40;
            const h = 20;

            // Now render hearts
            for(let i = 0; i < arrHealth.length; i++) {
                const coX = 15 * i;
                if(arrHealth[i] === 1) {
                    this.c.drawImage(
                        this.fullHeart,
                        0,0,550,550, 
                        x + coX,y,w,h
                    )
                }
                else if (arrHealth[i] === .5) {
                    this.c.drawImage(
                        this.halfHeart,
                        0,0,550,550,
                        x + coX,y,60,30)
                } 
                else {
                    this.c.drawImage(this.emptyHeart,
                        0,0,550,550,
                        x + coX,y,60,30
                        )
                }
            }
        }


        // If player has sword, render sword in A button

        if(player && player["components"]["Player"]["inventory"]["sword"]) {
            player["components"]["Player"]["inventory"]["activeA"] = player["components"]["Player"]["inventory"]["sword"];
        }



        // If active A, render it
        if(player && player["components"]["Player"]["inventory"]["activeA"]) {
            const {img, srcRect} = player["components"]["Player"]["inventory"]["activeA"];

            const {up} = srcRect;
            // render A button
            this.c.drawImage(
                img,
                up.x,up.y,up.width,up.height, 
                175,127,20,18
            )
        }



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

            // write Inventory
            this.c.font = "12px Arial";
            this.c.fillStyle = "red";
            this.c.fillText("Inventory", 20, 20, 100);


            // render selected B item
            this.c.beginPath();
            this.c.rect(30,30,30,30);
            this.c.lineWidth = 2;
            this.c.strokeStyle = "blue";
            this.c.stroke();

            // Write use B button for this
            this.c.fillStyle = "white"
            this.c.fillText("Use B Button", 20, 75, 100);
            this.c.fillText("for this", 20, 85, 100);


            // Render blue circle for inventory items

            this.c.beginPath();
            this.c.rect(150,10,140,45);
            this.c.lineWidth = 2;
            this.c.strokeStyle = "blue";
            this.c.stroke();



        



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
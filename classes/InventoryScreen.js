const ASSET_PATH = "../assets/inventory";
class InventoryScreen {
    constructor() {
        this.canvas = document.getElementById("inventoryScreen");
        this.c = this.canvas.getContext("2d");
        this.aButton = new Image();
        this.bButton = new Image();
        this.lifeText = new Image();
        this.goldIcon = new Image();
        this.keyAndBombIcon = new Image();
        this.linkSpriteSheet = new Image();
        this.initialize();
    }

    initialize = () => {

        this.aButton.src = `${ASSET_PATH}/A.png`
        this.bButton.src = `${ASSET_PATH}/B.png`
        this.lifeText.src = `${ASSET_PATH}/life.png`;
        this.goldIcon.src = `${ASSET_PATH}/goldIcon.png`
        this.keyAndBombIcon.src = `${ASSET_PATH}/keyAndBombIcon.png`
        this.linkSpriteSheet.src = "../assets/link.png";
        this.render();
    }



    render = (player, isPaused) => {

        this.c.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.c.fillStyle = "black";
        this.c.fillRect(0, 0, this.canvas.width, this.canvas.height)

        // Render A Button
        this.c.drawImage(this.aButton, 150, 120, 30, 25)
        // Render B Button
        this.c.drawImage(this.bButton, 120, 118.5, 30, 28)

        // Render life text
        this.c.drawImage(this.lifeText, 220, 110, 70, 20);

        // Render gold icon
        this.c.drawImage(this.goldIcon, 85, 115, 15, 15)

        // Render bomb & keys icon
        this.c.drawImage(this.keyAndBombIcon, 85, 125, 15, 20)


        // Render Sword if activeA === { name: "Sword_1 "}
        if (player && player.components["Inventory"].activeA && player.components["Inventory"].activeA.name === "Sword_1") {
            // Render Sword 1
            const { x, y, width, height } = player.components["Inventory"].activeA.srcRect.up;

            this.c.drawImage(this.linkSpriteSheet, x, y, width, height, 156, 124, 30, 18);




        }


        if (isPaused) {
            // Move the screen down;
            let top = this.canvas.style.top.slice(0, this.canvas.style.top.length - 2)                // -558px => 558

            top = top * 1;

            if (top < 210)       // 558 + 220 = 778 
            {
                top += 10;
                this.canvas.style.top = top + "px";
                console.log("top: ", top);
            }

        }

    }



}


export default InventoryScreen;
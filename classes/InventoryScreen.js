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
        this.fullHeart = new Image();
        this.halfHeart = new Image();
        this.emptyHeart = new Image();
        this.initialize();
    }

    initialize = () => {

        this.aButton.src = `${ASSET_PATH}/A.png`
        this.bButton.src = `${ASSET_PATH}/B.png`
        this.lifeText.src = `${ASSET_PATH}/life.png`;
        this.goldIcon.src = `${ASSET_PATH}/goldIcon.png`
        this.keyAndBombIcon.src = `${ASSET_PATH}/keyAndBombIcon.png`
        this.fullHeart.src = `${ASSET_PATH}/fullHeart.png`;
        this.halfHeart.src = `${ASSET_PATH}/halfHeart.png`;
        this.emptyHeart.src = `${ASSET_PATH}/emptyHeart.png`;
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

        // Render Link Health
        if (player && player.components["Health"]) {
            const { totalHealth, remainingHealth } = player.components["Health"];

            const arrHealth = []

            for (let i = 0; i < totalHealth; i++) {

                if (remainingHealth >= i + 1) {
                    arrHealth[i] = 1; // full heart
                }
                else if (remainingHealth >= i + 0.5) {
                    arrHealth[i] = 0.5; // half heart
                }
                else {
                    arrHealth[i] = 0; // empty heart
                }
            }

            const x = 230;
            const y = 127;
            const width = 14;
            const height = 14;


            // Render Hearts

            for (let i = 0; i < arrHealth.length; i++) {
                const coX = 15 * i;
                let target = undefined;

                if (arrHealth[i] === 1) {
                    target = this.fullHeart;
                }
                else if (arrHealth[i] === 0.5) {
                    target = this.halfHeart;
                } else {
                    target = this.emptyHeart;
                }
                this.c.drawImage(target, x + coX, y, width, height)

            }

        }


        // Render Sword if activeA === { name: "Sword_1 "}
        if (player && player.components["Inventory"].activeA && player.components["Inventory"].activeA.name === "Sword_1") {
            // Render Sword 1
            const { x, y, width, height } = player.components["Inventory"].activeA.srcRect.up;

            this.c.drawImage(this.linkSpriteSheet, x, y, width, height, 156, 124, 30, 18);


        }



        // Handle Pause Animation
        let top = this.canvas.style.top.slice(0, this.canvas.style.top.length - 2)

        top = top * 1;

        if (isPaused) {
            // Move the screen down;
            if (top < 210)       // 558 + 220 = 778 
            {
                top += 10;
                console.log("top: ", top);
            }

        } else {

            if (top > -558) {
                top -= 10;

            }
        }

        this.canvas.style.top = top + "px";

    }



}


export default InventoryScreen;
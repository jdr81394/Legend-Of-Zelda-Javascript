const canvas = document.getElementById("gameScreen");
const c = canvas.getContext("2d");

console.log("Context: ", c);




class Game {

    constructor() {
        this.player = undefined;
    }

    initialize = () => {
        this.player = {
            x: 0,
            y: 0,
            height: 50,
            width: 60
        }

        document.addEventListener("keyup", this.handleUserInput)
        document.addEventListener("keydown", this.handleUserInput)
    }

    update = () => {

        requestAnimationFrame(this.update)
    }

    render = () => {
        const { x, y, width, height } = this.player;
        c.clearRect(0, 0, 1000, 1000)
        c.beginPath();
        c.fillStyle = "red";
        c.fillRect(x, y, width, height);
        c.stroke();

        requestAnimationFrame(this.render);
    }


    handleUserInput = (e) => {
        /*
            {
                key: string
                type: string 
            }
            
        */

        const { key, type } = e;

        if (this.player) {

            if (type === "keydown") {

                switch (key) {
                    case "w":
                        this.player.y -= 1;
                        break;
                    case "a":
                        this.player.x -= 1;
                        break;
                    case "s":
                        this.player.y += 1
                        break;
                    case "d":
                        this.player.x += 1;
                        break;
                    default:
                        break;
                }

            }
        }
    }
}


const game = new Game();
game.initialize();
game.update();
game.render();


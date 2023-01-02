const addItemToInventory = (player, item) => {


    if(item.name === "Sword_1") {
        item.img = new Image();
        item.img.src = item.path;
        player.components["Player"].inventory.sword = item;
        player.components["Player"].activeA = item;
    }
}


export default addItemToInventory;
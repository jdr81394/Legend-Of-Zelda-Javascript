                        // // push link back in a specific direction
                        // /*
                        //     If link is moving towards the enemy and the enemy is moving towards link, push link
                        //     back in the direction the enemy is facing
                        //     enemy is going right, link is going left, push link back to the right

                        //     If the enemy puts force upon link, push them in the direction the enemy is going. 
                        //     How do we determine who is applying force upon who?
                        //     Well, we can determine this by seeing whose future position would overlap the others position.
                            
                        //     There is also the circumstance that link hits a stationary enemy or dangerous obstacle that does damage, 
                        //     like the flame, in this case he would be pushed back
                        // */

                        //     const linkFacing = link.components["Character"].facing;
                        //     const linkMovement = link.components["Movement"];
                        //     const enemyFacing = enemy.components["Character"].facing;
    
                        //     console.log(linkFacing, enemyFacing)
                            
                        //     if(linkFacing === "up" && enemyFacing === "down") {
                        //         // push link down
                                
                        //     } 
                        //     else if (linkFacing === "down" && enemyFacing === "up") {
                        //         // push link up
                        //     }
                        //     else if (linkFacing === "left" && enemyFacing === "right") {
                        //         // push link right
                               
                        //         linkMovement.vX = 5;
                             
                                
    
                        //     } 
                        //     else if (linkFacing === "right" && enemyFacing === "left") {
                        //         // push link left
    
                        //     }
    
    
                            
                           
    
                            
                        //     // add discoloration 
    
                        //     // console.log("damage to link")s
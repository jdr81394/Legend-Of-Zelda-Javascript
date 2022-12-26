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



                    //                         // Multiple scenarios could happen here
                    // // First thing, if an enemy projectile or an enemy body hits the player, damage the player

                    // // if hitboxI is enemy/enemyAttacxk and hitboxJ is link
                    // // or if hitboxJ is enemy/enemyAttack and hitboxI is link
                    // if(
                    //     (
                    //          hitboxI.owner % 2 === 0
                    //          &&
                    //          hitboxJ.owner === 3
                    //      ) ||
                    //      (
                    //          hitboxJ.owner % 2 === 0
                    //          &&
                    //          hitboxI.owner === 3
 
                    //      )
                    //  ) {
                    //      // do damage to link
                    //      const link = hitboxI.owner === 3 ? entityI : entityJ;
                    //      const enemy = hitboxI.owner % 2 === 0 ? entityI : entityJ;
                         
                    //      link.components["Health"].remainingHealth = link.components["Health"].remainingHealth - 0.5;
 
 
                    //  }
 
                    //  // if hitboxI is enemy and hitboxJ is link attack
                    //  // if hitboxI is link attack and hitboxJ is enemy
                    //  else if(
                    //     (
                    //         hitboxI.owner % 2 === 0
                    //          &&
                    //          hitboxJ.owner === 1
                    //      ) ||
                    //      (
                    //          hitboxI.owner === 1 
                    //          &&
                    //          hitboxJ.owner % 2 ===0
                    //      )
                    //  ) {
                    //      // do damage to enemy
                    //      // const linkAttack = hitboxI.owner === 3 ? entityI : entityJ;
                    //      // const enemy = hitboxI.owner % 2 === 0 ? entityI : entityJ;
 
                    //      console.log("Enemy: " , enemy)
                    //      // if(linkAttack) {
                    //      //     enemy.components["Health"].remainingHealth = enemy.components["Health"].remainingHealth - linkAttack.components["Hitbox"].damage;
                    //      //     console.log("damange to enemy :" , linkAttack, linkAttack.components["Hitbox"].damage)
                    //      //     console.log(enemy.components["Health"].remainingHealth);
                    //      // }
 
                    //  }
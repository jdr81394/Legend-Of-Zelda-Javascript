import BinarySearch from "../utilities/BinarySearch.js";
import PriorityQueue from "./PriorityQueue.js";

class Graph {
    
    constructor(player) {
        this.values = [];            // Array of objects. The object contains edges and position
        this.player = player;
        this.nodeOrderedGraph = {};
    }


    generateNodeOrderedGraph = (numOfTiles, positionDummyComponent) => {
            // Put value of id into the graph for fast access
            this.values[numOfTiles] = {
                edges: undefined,           // We will set the edges here shortly,
                position: positionDummyComponent.value
            }       

            if(this.nodeOrderedGraph[positionDummyComponent.value.x] === undefined) {
                this.nodeOrderedGraph[positionDummyComponent.value.x] = {}
            }


            this.nodeOrderedGraph[positionDummyComponent.value.x][positionDummyComponent.value.y] =  numOfTiles;

            // this.nodeOrderedGraph[positionDummyComponent.value.x].push([positionDummyComponent.value.y, numOfTiles]);

            // console.log(positionDummyComponent.value.x, positionDummyComponent.value.y)
            // console.log(this.nodeOrderedGraph)
            // This data structure holds the x as a key, then the y as a key to the id. 
            // We need this in order to search for where the player is in relation to the enemy
            // I need to change this data structure because an objects keys gets overridden
            // this.nodeOrderedGraph[positionDummyComponent.value.x] = {}
            // this.nodeOrderedGraph[positionDummyComponent.value.x][positionDummyComponent.value.y] = numOfTiles;

            // console.log(this.graph)
        

    }

    buildAiGraph = () => {
        // We are going to check to the left, right, up and down of each indice to build the value 
        Object.entries(this.values).forEach((entry) => {
            const id = entry[0] * 1;        // multiply by 1 to coerce a string type to a number      

            // entry[1] has position, and edges
            // We can use the id to compare
            // Is there a value to the left that we should make an edge for? 
            entry[1]["edges"] = [];

            if(this.values[id - 1]) {
                entry[1]["edges"].push(id - 1);
            }
            if(this.values[id + 1]) {
                entry[1]["edges"].push(id + 1);
            }
            if(this.values[id + 18]) {
                entry[1]["edges"].push( id + 18);
            }
            if(this.values[id - 18]) {
                entry[1]["edges"].push(id - 18);
            }
        })

    }

    dijkstrasAlgorithm = (enemy) => {

        const {Position : EnemyPosition } = enemy.components;
        const {x: enemyX, y: enemyY} = EnemyPosition;


        // Get player X and Y;
        const { Position: PositionComponent} = this.player.components;
        const {x, y} = PositionComponent;

        const enemyNodeX = BinarySearch(this.nodeOrderedGraph, enemyX);
        const playerNodeX = BinarySearch(this.nodeOrderedGraph, x);

        const playerNodeY = BinarySearch(this.nodeOrderedGraph[playerNodeX], y);
        const enemyNodeY = BinarySearch(this.nodeOrderedGraph[enemyNodeX], enemyY);

        const finishId = this.nodeOrderedGraph[playerNodeX][playerNodeY];     // player id
        const startId = this.nodeOrderedGraph[enemyNodeX][enemyNodeY];       // enenmy id



        const nodes = new PriorityQueue();
        const distances = {};
        const previous = {};
        let currentNodeId;
        let path = [];

        for(let vertex in this.values) {

            if(vertex == startId) {
                // console.log(vertex)
                distances[vertex] = 0;
                nodes.enqueue(vertex,0);
            } else {
                distances[vertex] = Infinity;
                nodes.enqueue(vertex,Infinity);
            }

            previous[vertex] = null;
        }


        // console.log(nodes);
        while(nodes.values.length) {
            currentNodeId = nodes.dequeue().val;

            if(currentNodeId === finishId) {

                while(previous[currentNodeId]) {

                    path.push(currentNodeId);
                    currentNodeId = previous[currentNodeId];
                }
                break;

            }

            if(currentNodeId || this.values[currentNodeId] !== Infinity) {

                for(let edgeOrPosition in this.values[currentNodeId]) {
                    if(edgeOrPosition === "edges") {
                        for(let i = 0; i < this.values[currentNodeId][edgeOrPosition].length; i++) {
                            const neighborId = this.values[currentNodeId][edgeOrPosition][i];
                            
                            const combinedWeight = 1 + distances[currentNodeId];
                            // console.log('combined weight: ' ,distances)

                            if(combinedWeight < distances[neighborId]) {
                                distances[neighborId] = combinedWeight;
                                previous[neighborId] = currentNodeId;
                                nodes.enqueue(neighborId, combinedWeight);
                            }

                        }
                       
                    }
                 

                    // console.log("graph:" , this.graph , "currentNode id: " , currentNodeId, "Neighbor: " , neighbor, "vertecxtindicve:  " , vertexIndice);
                }
            }

            // Need to get which approximate 
            // Find the closest Node
        }


        // return path.concat(startId)     // dont reverse it because were going to start from the end so we can pop it easily
        return path;

    }


}


export default Graph;
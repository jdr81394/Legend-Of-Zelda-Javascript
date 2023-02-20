class Graph {
    constructor(player) {
        this.player = player;
        /*
        this.graph = [ { edges: [25,etc,etc..] ,position: positionComponent} ]

        */
        this.graph = [];

        /*
            X axis                                      Y axis                              tileId
        this.nodeOrderedGraph = [                   [
            0, ---------------------------------------> 150 ----------------------------->  23 
            75,                                         225 ----------------------------->  41
            150
        ]                                           ]
        */
        this.nodeOrderedGraph = {}          // Ordered by Position
    }


    generateGraph = (idOfTile, positionDummyComponent) => {

        this.graph[idOfTile] = {
            edges: undefined,
            position: positionDummyComponent.value
        }

        const { x, y } = positionDummyComponent.value;

        if (this.nodeOrderedGraph[x] === undefined) {
            this.nodeOrderedGraph[x] = {};
        }

        this.nodeOrderedGraph[x][y] = idOfTile;

        console.log("this graph property: ", this.graph, " and this node Ordered Graph: ", this.nodeOrderedGraph)
    }

    generateEdges = () => {

        Object.entries(this.graph).forEach((entry) => {
            const id = entry[0] * 1;

            entry[1]["edges"] = [];

            let edges = entry[1]["edges"];
            let neighborId = undefined;

            // There is a neighbor to its left that is navigatable
            if (this.graph[id - 1]) {
                neighborId = id - 1;
                edges.push(neighborId)
            }
            // There is a neighbor to its right that is navigatable
            if (this.graph[id + 1]) {
                neighborId = id + 1;
                edges.push(neighborId)
            }

            // There is a neighbor above it that is navigatable
            if (this.graph[id - 18]) {
                neighborId = id - 18
                edges.push(neighborId)
            }

            // There is a neighbor eblow it that is navigatable
            if (this.graph[id + 18]) {
                neighborId = id + 18
                edges.push(neighborId)
            }

        })

        console.log("this graph: ", this.graph);
    }

    dijkstrasAlgorithm = (enemy) => {
        const { Position: enemyPosition } = enemy.components;
        const { x: ex, y: ey } = enemyPosition;

        const enemyClosestXValue = this.binarySearch(this.nodeOrderedGraph, ex);
        const enemyClosestYValue = this.binarySearch(this.nodeOrderedGraph[enemyClosestXValue], ey)
        const startId = this.nodeOrderedGraph[enemyClosestXValue][enemyClosestYValue];

        const { Position: playerPosition } = this.player.components;
        const { x: px, y: py } = playerPosition;

        const playerClosestXValue = this.binarySearch(this.nodeOrderedGraph, px);
        const playerClosestYValue = this.binarySearch(this.nodeOrderedGraph[playerClosestXValue], py);
        const finishId = this.nodeOrderedGraph[playerClosestXValue][playerClosestYValue];

        /*

            Dijkstras Algorithm

            1. Function will take starting & ending vertex parameters
            2. Create an array, treat as a priority queue.  
            3. Create object called previous, set each key to be every vertex in the graph with values of null
            4. Create an object ( distances ), set each individual key to be a vertex in the graph. The value of the starting vertex will be 0 while the value will be infinity.
            5. Add each vertex key ( excluding starting) to the priority queue.
            6. Create while loop to go through priority queue while any values are in it.
            7. Dequeue/shift vertex from priority queue.-+
            8. If vertex same as ending, 
                8a. while loop through previous and push each node Id to final path and done.
            9. Else, loop through each edge in the value in the graph, pulled from prio queue 
            10. Determine distance from that neighboring vertex to the currnet vertex to the starting vertex, if distance is less than what is in distances object we:
                10a. Update distances object with new distance
                10b. Update prev object to contain this vertex
                10c. Queue this vertex with 
    */


        const nodes = []    // treat it as a priority queue , this is the single column
        const distances = {}    // THis is the table( also does have the vertex column)
        const previous = {}
        const path = [];
        let currentNodeId;

        for (let vertex in this.graph) {
            if (startId == vertex) {
                // vertex is entityId
                distances[vertex] = 0;
                nodes.push({ val: vertex, priority: 0 })
            } else {
                distances[vertex] = Infinity;
                nodes.push({ val: vertex, priority: Infinity })
            }

            nodes.sort((a, b) => a.priority - b.priority);      // Lowest priority will also be at the front of the queueu

            previous[vertex] = null;
        }

        while (nodes.length) {
            currentNodeId = nodes.shift().val;

            if (currentNodeId === finishId) {
                while (previous[currentNodeId]) {
                    //currentNode = F
                    path.push(currentNodeId);
                    currentNodeId = previous[currentNodeId] // B 


                }
            }

            const edges = this.graph[currentNodeId]["edges"]

            for (let neighborId of edges) {

                const combinedWeight = 1 + distances[currentNodeId]

                if (combinedWeight < distances[neighborId]) {
                    distances[neighborId] = combinedWeight;
                    previous[neighborId] = currentNodeId;
                    nodes.push({ val: neighborId, priority: combinedWeight });
                }
            }

        }

        console.log("Path: ", path);
        return path;



    }

    binarySearch = (argArr, target) => {
        let arr = Object.keys(argArr);
        let left = 0;
        let right = arr.length - 1;
        let middle = Math.floor(right / 2)
        let closestValue = Infinity

        /*
            l            r   m                    r
            [0 , 5, 10 ,12, 14, 22, 32, 45, 57 , 59]
        */

        while (left <= right) {
            if (Math.abs(arr[middle] - target) < Math.abs(closestValue - target)) {
                closestValue = arr[middle];
            }

            if (arr[middle] < target) {
                left = middle + 1
            }
            else if (arr[middle] > target) {
                right = middle - 1;
            }
            else if (arr[middle] == target) {
                return arr[middle]
            }

            middle = Math.floor((right - left) / 2) + left;
        }

        return closestValue;

    }
}

export default Graph;

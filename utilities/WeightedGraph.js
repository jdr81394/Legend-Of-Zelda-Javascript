class WeightedGraph {
    constructor() {
        this.adjacencyList = [];
    }

    addVertex(vertex) {
        if(!this.adjacencyList[vertex]) 
        this.adjacencyList[vertex] = [];
    }

    addEdge(vertex1, vertex2, weight) {
        this.adjacencyList[vertex1].push(
            {
                node: vertex2,
                weight
            }
        );
        this.adjacencyList[vertex2].push(
            {
                node: vertex1,
                weight
            }
        );
    }

    Dijkstra(start, finish) {
        const nodes = new PriorityQueue();
        const distances = {};
        const previous = {};
        let smallest;
        let path = [];
        
        for(let vertex in this.adjacencyList) {
            if(vertex === start) {
                distances[vertex] = 0;
                nodes.enqueue(vertex,0);
            } else {
                distances[vertex] = Infinity;
                nodes.enqueue(vertex,Infinity);
            }

            previous[vertex] = null;
        }

        while(nodes.values.length) {
            smallest = nodes.dequeue().val;         // nodes.dequeue() {val: Letter, priority: int}
            if(smallest === finish) {

                // We are done
                // build up path to return at end
                while(previous[smallest]) {
                    path.push(smallest);
                    smallest = previous[smallest];
                }
                break;
            }

            if(smallest || distances[smallest] !== Infinity) {
                for(let neighbor in this.adjacencyList[smallest]) {

                    // Find neighboring node
                    let nextNode = this.adjacencyList[smallest][neighbor] // neighbor is a number

                    // Calculate new dsitance to neighboring node
                    let candidate = distances[smallest] + nextNode.weight;
                    let nextNeighbor = nextNode.node;

                    if(candidate < distances[nextNeighbor]) {
                        // updating new smallest distances 
                        distances[nextNeighbor] = candidate;
                        
                        // updating preivous - how we got to neighbor
                        previous[nextNeighbor] = smallest;
                        
                        // enqueue in priority queue with new priority
                        nodes.enqueue(nextNeighbor, candidate)
                    }
                }
            }
        }
        return path.concat(smallest).reverse();
    }
        
}
class PriorityQueue {
    constructor() {
        this.values = [];
    }

    // priority is distance
    enqueue(val, priority) {
        this.values.push({val, priority});
        this.sort();
    }

    dequeue() {
        return this.values.shift();
    }

    sort() {
        this.values.sort((a,b) => a.priority - b.priority);
    }
}

export default PriorityQueue;
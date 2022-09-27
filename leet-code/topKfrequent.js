/**
 * @param {string[]} words
 * @param {number} k
 * @return {string[]}
 */
const topKFrequent = function (words, k) {
    let hash = {};
    for (let word of words) {
        hash[word] = hash[word] + 1 || 1;
    }
    let result = Object.keys(hash).sort((a, b) => {
        let countCompare = hash[b] - hash[a];
        if (countCompare == 0) return a.localeCompare(b);
        else return countCompare;
    }
    );
    return result.slice(0, k);
};


const topKFrequentPriorityQ = (words, k) => {
    if (!words || words.length === 0) return [];

    const freq = getFrequencies(words);
    const minHeap = new Heap(compareFunc);

    for (const word of freq.keys()) {
        const tuple = [word, freq.get(word)];
        minHeap.insert(tuple);
        if (minHeap.size > k) minHeap.extract();
    }

    const ans = new Array();
    while (minHeap.size > 0) ans.unshift(minHeap.extract()[0]);

    return ans;
};

const compareFunc = (a, b) => {
    if (a[1] === b[1]) {
        if (a[0] === b[0]) return 0;
        if (a[0] < b[0]) return 1;
        return -1;
    }

    return a[1] - b[1];
};

const getFrequencies = (words) => {
    const freq = new Map();
    words.forEach(word => {
        if (!freq.has(word)) freq.set(word, 0);
        freq.set(word, freq.get(word) + 1);
    });

    return freq;
};

class Heap {
    constructor(compareFunc) {
        this.compareFunc = compareFunc;
        this.heap = new Array();
    }

    insert(val) {
        this.heap.push(val);
        this.heap.sort(this.compareFunc);
    }

    extract() {
        return this.heap.shift();
    }

    peek() {
        return this.heap[0];
    }

    get size() {
        return this.heap.length;
    }
}

topKFrequent(["the", "day", "is", "sunny", "the", "the", "the", "sunny", "is", "is"], 4)
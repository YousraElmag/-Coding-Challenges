// step 1 >>>>>>>>>>>>>>>>>>
import fs from 'fs'
const text =fs.readFileSync('test2.txt','utf-8')
const frequencyMap=new Map();
for(const char of text){
    frequencyMap.set(char,(frequencyMap.get(char )|| 0) +1)
}
for(const[char,count] of frequencyMap){
   console.log(JSON.stringify(char),'=>',count )
}

class Node {
  constructor(char, freq, left = null, right = null) {
    this.char = char; 
    this.freq = freq;   
    this.left = left;  
    this.right = right; 
  }
}


const nodes = [];
for (const [char, freq] of frequencyMap) {
  nodes.push(new Node(char, freq));
}

while (nodes.length > 1) {
  nodes.sort((a, b) => a.freq - b.freq);

  const node1 = nodes.shift();
  const node2 = nodes.shift();

  const merged = new Node(null, node1.freq + node2.freq, node1, node2);

  nodes.push(merged);
}

const root = nodes[0];

// -----------------------
// step 3

function generateHuffmanTable(node, code = '', table = {}) {
  if (!node) return;
  if (node.char) table[node.char] = code;
  generateHuffmanTable(node.left, code + '0', table);
  generateHuffmanTable(node.right, code + '1', table);
  return table;
}

const huffmanTable = generateHuffmanTable(root);
console.log(huffmanTable);
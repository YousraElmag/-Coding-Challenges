import fs from 'fs'

// Step 1: قراءة النص وحساب تكرار الحروف
const text = fs.readFileSync('test2.txt', 'utf-8')
const frequencyMap = new Map()
for (const char of text) {
  frequencyMap.set(char, (frequencyMap.get(char) || 0) + 1)
}

// Step 2: بناء شجرة Huffman
class Node {
  constructor(char, freq, left = null, right = null) {
    this.char = char
    this.freq = freq
    this.left = left
    this.right = right
  }
}

const nodesArr = []
for (const [char, freq] of frequencyMap) {
  nodesArr.push(new Node(char, freq))
}

while (nodesArr.length > 1) {
  nodesArr.sort((a, b) => a.freq - b.freq)
  const node1 = nodesArr.shift()
  const node2 = nodesArr.shift()
  nodesArr.push(new Node(null, node1.freq + node2.freq, node1, node2))
}

const root = nodesArr[0]

// Step 3: توليد جدول Huffman
function generateHuffmanTable(node, code = '', table = {}) {
  if (!node) return
  if (node.char) table[node.char] = code
  generateHuffmanTable(node.left, code + '0', table)
  generateHuffmanTable(node.right, code + '1', table)
  return table
}

const huffmanTable = generateHuffmanTable(root)

// Step 4: ضغط النص كسلسلة 0 و 1
let compressedBits = ''
for (const char of text) {
  compressedBits += huffmanTable[char]
}

// Step 5: تحويل الـ bits لبايتات حقيقية وكتابة الملف المضغوط
const bytes = []
for (let i = 0; i < compressedBits.length; i += 8) {
  const byteStr = compressedBits.slice(i, i + 8)
  bytes.push(parseInt(byteStr.padEnd(8, '0'), 2))
}

const header = JSON.stringify(Object.fromEntries(frequencyMap))
const separator = '\n---\n'
const headerBytes = Buffer.from(header + separator, 'utf-8')
const compressedBuffer = Buffer.concat([headerBytes, Buffer.from(bytes)])
fs.writeFileSync('compressed.bin', compressedBuffer)

// Step 6: فك الضغط
const compressedFile = fs.readFileSync('compressed.bin')
const sepIndex = compressedFile.indexOf(separator)
const headerBytesRead = compressedFile.slice(0, sepIndex)
const dataBytesRead = compressedFile.slice(sepIndex + separator.length)
const freqMapDecoded = new Map(Object.entries(JSON.parse(headerBytesRead.toString('utf-8'))))

const nodesDecode = []
for (const [char, freq] of freqMapDecoded) {
  nodesDecode.push(new Node(char, Number(freq)))
}

while (nodesDecode.length > 1) {
  nodesDecode.sort((a, b) => a.freq - b.freq)
  const node1 = nodesDecode.shift()
  const node2 = nodesDecode.shift()
  nodesDecode.push(new Node(null, node1.freq + node2.freq, node1, node2))
}

const rootDecode = nodesDecode[0]

let bitStringDecode = ''
for (const byte of dataBytesRead) {
  bitStringDecode += byte.toString(2).padStart(8, '0')
}

function decodeBits(root, bitString) {
  let result = ''
  let node = root
  for (const bit of bitString) {
    node = bit === '0' ? node.left : node.right
    if (node.char) {
      result += node.char
      node = root
    }
  }
  return result
}

const originalText = decodeBits(rootDecode, bitStringDecode)
fs.writeFileSync('decompressed.txt', originalText, 'utf-8')
console.log('compressed.bin and decompressed.txt created')

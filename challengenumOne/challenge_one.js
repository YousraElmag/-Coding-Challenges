#!/usr/bin/env node
// Step One >> option -c and outputs the number of bytes in a file.
// Step Two >> option l to calculete the lines number in the text file
// Step Three >> option -w that outputs the number of words in a file.
// Step four >> option -m that outputs the number of characters in a file
// Step Five >> no options are provided, which is the equivalent to the -c, -l and -w options.
import fs from 'fs'
const fileName='test.txt'
const arg=process.argv.slice(2)
const option=arg[0]
const text=fs.readFileSync(fileName,'utf-8')
const bytes=Buffer.byteLength(text,'utf-8')
   const lines=text.split('\n').length
    const words=text.trim().split(/\s+/).length
     const characters=text.length
if(option == '-c'){

console.log(bytes)}
else if(option == '-l'){
 
    console.log(lines)
}
else if (option =='-w'){

    console.log(words)
}
else if(option=='-m'){
 
    console.log(characters)
}
else {
    console.log(bytes , lines, words )
}


// done👍🏻💃😁
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


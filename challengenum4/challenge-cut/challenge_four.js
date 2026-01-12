// The Challenge - Building cut
import fs from 'fs'

const text = fs.readFileSync('sample.tsv','utf-8')
const lines=text.split('\n')
lines.forEach((line=>{
    const field=line.split('\t')
    if (field[1]){
        console.log(field[1])
    }
   
}))
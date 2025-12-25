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
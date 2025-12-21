import fs from 'fs';
import { json } from 'stream/consumers';
const arg=process.argv.slice(2)
const filename=arg[0]
const text=fs.readFileSync(filename,'utf8')
const cleanText=text.trim();
// first step>>>>>>>>>>>>>>>>>>>>>>>>>>>>.
function stepone(){
return cleanText==='{}'

}
// step two
function steptwo(){

const pattern=  /^\{("[^"]+":"[^"]+")(,"[^"]+":"[^"]+")*\}$/;
return pattern.test(cleanText) }



// step three
function stepthree(){
    
const pattern = /^\{\s*("[^"]+"\s*:\s*(?:"[^"]+"|\d+|true|false|null)\s*)(\s*,\s*"[^"]+"\s*:\s*(?:"[^"]+"|\d+|true|false|null)\s*)*\}$/;
return pattern.test(cleanText)}

function stepfour(){
    try {
        JSON.parse(text)
        return true       
    } catch(err) {
        return false      
    }
}

if(stepone()|| steptwo()|| stepthree() || stepfour()){
      console.log('valid json')
    process.exit(0)
}
else{
      console.log('invalid json')
    process.exit(1)
}
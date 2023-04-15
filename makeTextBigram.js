/** Command-line tool to generate bigram Markov text. */
const fs = require("fs");
const markov = require("./bigram");
const axios = require("axios");
const process = require("process");

//make markov machine and generate text
function generateText(text){
    let mm = new markov.MarkovMachine(text);
    console.log(mm.makeText());
}

//make text from file
function makeText(path){
    fs.readFile(path, "utf8", function cb(err, data){
        if(err){
            console.error(`Cannot read file: ${path}: ${err}`);
            process.exit(1);
        }else{
            generateText(data);
        }
    });
}

//make text from URL
async function makeURLText(url){
    let resp;

    try{
        resp = await axios.get(url);
    }catch(err){
        console.error(`Cannot read URL: ${url}: ${err}`);
        process.exit(1);
    }
    generateText(resp.data)
}


//read cmd input to see what method to use
let [method, path] = process.argv.slice(2);

if(method=== "file"){
    makeText(path);
}
else if(method === "url"){
    makeURLText(path);
}
else{
    console.error(`Unknown method: ${method}`);
    process.exit(1);
}
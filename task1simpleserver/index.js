const { createServer } =  require("http");
const { readFileSync } = require("fs");
const port = 8080;

createServer((req,res)=>{
    const plainContext = {"Content-Type":"text/plain"};
    const jsonContext = {"Content-Type":"application/json"};
    const htmlContext = {"Content-Type":"text/html"};
    const jsonObj = {
        "name": "Oladipupo Durojaiye",
        "country": "Nigeria",
        "hobby": "Adventuring"
    };
    if(req.method == "GET"){
        switch(req.url){
            case "/": res.writeHead(200,htmlContext);
            res.end(readFileSync("./public/index.html"));
            break;

            case "/plain": res.writeHead(200,plainContext);
            res.end("Welcome to this page, my name is Dipo-Jaiye");
            break;

            case "/json": res.writeHead(200,jsonContext);
            res.end(JSON.stringify(jsonObj));
            break;
        }
    }
}).listen(port,()=>console.log(`Server running on port ${port}`));
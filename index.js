const fs = require("fs");
const http = require("http");
const mime = require("mime");
const nunjucks = require("nunjucks");
const path = require("path");
http.createServer((req, res) => {
  if(req.url === "/"){
    res.writeHead(200,{'Content-Type':'text/html'});
    res.end(nunjucks.render("index.html"));
  }else if(mime.getType(req.url) === null){
    console.log("hi")
    res.writeHead(200,{'Content-Type':'text/html'});
    if(fs.existsSync("."+req.url+"index.html")){
      res.end(nunjucks.render("."+req.url+"/index.html"));
    }else if(fs.existsSync("."+req.url+".html")){
      res.end(nunjucks.render("."+req.url+".html"));
    }else{
      console.log("."+req.url+".html");
      res.end(nunjucks.render("404.html"));
    }
  }else if(fs.existsSync("."+req.url)){
    res.writeHead(200,{'Content-Type':mime.getType("."+req.url)});
    res.end(fs.readFile("."+req.url));
  }else{
    console.log(mime.getType(req.url))
    res.writeHead(200,{'Content-Type':'text/html'});
    res.end(nunjucks.render("404.html"));
  }
}).listen(8080);
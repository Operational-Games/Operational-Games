const http = require("http");
const fs = require("fs");
const mime = require("mime");
const nunjucks = require("nunjucks");
http.createServer((req, res) => {
  if(req.url === "/"){
    res.writeHead(200,{'Content-Type':'text/html'});
    res.end(nunjucks.render("index.html"));
  }else if(mime.getType(req.url) === "application/octet-stream"){
    res.writeHead(200,{'Content-Type':'text/html'});
    if(fs.existsSync("."+req.url+"/index.html")){
      res.end(nunjucks.render("."+req.url+"/index.html"));
    }else if(fs.existsSync("."+req.url+".html")){
      res.end(nunjucks.render("."+req.url+".html"));
    }else{
      res.end(nunjucks.render("404.html"));
    }
  }else if(fs.existsSync("."+req.url)){
    res.writeHead(200,{'Content-Type':mime.getType("."+req.url)});
    res.end(fs.readFile("."+req.url));
  }else{
    res.writeHead(200,{'Content-Type':'text/html'});
    res.end(nunjucks.render("404.html"));
  }
}).listen(8080);
var http    = require("http");
var url     = require("url");
var routes  = require("routes")();

routes.addRoute('/',function(req,res){
    res.writeHead(200,{"Content-Type":"text/plain"});
    res.end("index page");
});

routes.addRoute('/profile/:name?/:city?',function(req,res){
    res.writeHead(200,{"Content-Type":"text/plain"});
    res.end("profile page name is "+ this.params.name + " city " + this.params.city);
 });

routes.addRoute('/contact',function(req,res){
    res.writeHead(200,{"Content-Type":"text/plain"});
    res.end("Contact Page");
});

http.createServer(function(req,res){
    var path =url.parse(req.url).pathname;
    var match = routes.match(path);
    
    if(match){
        match.fn(req,res,match);
    }else{
        res.writeHead(404,{"Content-Type":"text/plain"})
        res.end("Page Not Found !!")
    }

}).listen(8888);

console.log("Server is running....");
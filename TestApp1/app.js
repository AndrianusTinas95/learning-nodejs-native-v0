var http    = require("http");
var url     = require("url");
var router  = require("routes")();
var view    = require("swig");

router.addRoute('/',function(req,res){
    var html =view.compileFile('./TestApp1/template/index.html')({
        title :"index",
        data : "ini data"
    });
    res.writeHead(200,{"Cotent-Type":"text/html"});
    res.end(html);  
});

router.addRoute('/contact',function(req,res){
    var html =view.compileFile('./TestApp1/template/contact.html')({
        title:"contact"
    });
    res.writeHead(200,{"Cotent-Type":"text/html"});
    res.end(html);  
});

http.createServer(function(req,res){
    var path =url.parse(req.url).pathname;
    var match = router.match(path);
    
    if(match){
        match.fn(req,res,match);
    }else{
        res.writeHead(404,{"Content-Type":"text/plain"})
        res.end("Page Not Found !!")
    }

}).listen(8888);

console.log("Server is running....");
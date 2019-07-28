var http    = require("http");
var url     = require("url");
var fs      = require("fs");
var qString = require("querystring");

http.createServer(function(req,res){
    if(req.url != "/favicon.ico"){

        var access =url.parse(req.url);
        
        if(access.pathname == "/"){
            var data = qString.parse(access.query);

            res.writeHead(200,{"Content-Type":"text/plain"});
            res.end(JSON.stringify(data));
        }else if(access.pathname=="/form"){
            if(req.method.toUpperCase() == "POST"){
                // post
                var data_post = "";
                req.on('data',function(chunck){
                    data_post +=chunck;
                });

                req.on('end',function(){
                    data_post = qString.parse(data_post);
                    res.writeHead(200,{"Content-Type":"text/plain"});
                    res.end(JSON.stringify(data_post));
                });

            }else{//GET
                res.writeHead(200,{"Content-Type":"text/html"});
                fs.createReadStream("./TestApp1/template/form.html").pipe(res);
            }
        }else{
            res.writeHead(200,{"Content-Type":"text/plain"});
            res.end("Page not Found");
        }

        // var file = "";
        // var kode = 200;
        // var query ="";

        // if(access.pathname == "/"){
        //     kode = 200;
        //     file ="TestApp1/template/index.html";
            
        // }else if(access.pathname == "/contact"){
        //     kode = 200;
        //     file ="TestApp1/template/contact.html";
        // }else{
        //     kode = 400;
        //     file ="TestApp1/template/404.html";
        // }
        
        // res.writeHead(kode,{"Content-Type" : "text/html"});
        // fs.createReadStream(file).pipe(res);
    }

}).listen(8888);

console.log("Server is running....");
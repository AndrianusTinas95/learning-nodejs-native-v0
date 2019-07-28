var http = require("http");

http.createServer(function(req,res){
   if(req.url  != "/favicon.ico"){
       console.log(req.url);
       res.writeHead(200,{"Content-Type" : "text/plain"});
       res.write("Hallo from Node Js Server");
       res.write("You Request " + req.url);
       res.end();
   }

}).listen(8888);

console.log("Server is running....");
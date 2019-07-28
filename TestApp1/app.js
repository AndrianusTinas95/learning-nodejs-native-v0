var http    = require("http");
var url     = require("url");
var router  = require("routes")();
var view    = require("swig");
var mysql   = require('mysql');
var qString = require("querystring");

var conn = mysql.createConnection({
    host:'localhost',
    poet:3306,
    database:"learn_nodejs",
    user:"root",
    password:""
});


router.addRoute('/',function(req,res){
    conn.query("select * from mahasiswa",function(err,rows,field){
        if(err) throw err;
      
        var html =view.compileFile('./TestApp1/template/index.html')({
            title :"index",
            data : rows
        });

        res.writeHead(200,{"Cotent-Type":"text/html"});
        res.end(html);
    });
});

router.addRoute('/insert',function(req,res){
    
    
    if(req.method.toUpperCase() == "POST"){
        // get data
        var data_post = "";
        req.on('data',function(chuncks){
            data_post += chuncks;
        })

        // save on database 
        req.on('end',function(){
            data_post = qString.parse(data_post);
            conn.query("insert into mahasiswa set ?", data_post,
                function(err,field){
                    if(err) throw err;

                    res.writeHead(302,{"Location":"/"});
                    res.end();
                }
            );
        });

    }else{
        var html =view.compileFile('./TestApp1/template/form.html')();
        res.writeHead(200,{"Cotent-Type":"text/html"});
        res.end(html);
    }
});

router.addRoute('/update/:nim',function(req,res){
 
        conn.query("select * from mahasiswa where ? ",{
                nim : this.params.nim
            },
            function(err,rows,field){
                if(err) throw err;
                
                var data = rows[0];

                if (rows.length) {
                    if(req.method.toUpperCase() == "POST"){
                        var data_post = "";
                        
                        req.on('data',function(chuncks){
                            data_post +=chuncks;
                        });

                        req.on('end',function(){
                            data_post = qString.parse(data_post);

                            conn.query("update mahasiswa set ? where ?",
                            [
                                data_post,
                                {nim:data.nim}
                            ],
                            function(err,field){
                                if (err) throw err;
    
                                res.writeHead(302,{"Location":"/"});
                                res.end();
                            });
                        });
                    }else{
                        var html =view.compileFile('./TestApp1/template/update.html')({
                            data:data
                        });
                        
                        res.writeHead(200,{"Cotent-Type":"text/html"});
                        res.end(html);
                    }
                } else {
                    res.writeHead(404,{"Content-Type":"text/plain"})
                    res.end("Page Not Found !!")                
                }
            }
        );
});

router.addRoute('/delete/:nim',function(req,res){
    
    conn.query("delete from mahasiswa where ?",{
        nim:this.params.nim
    },function(err,field) {
        if( err) throw err;

        res.writeHead(302,{"Location":"/"});
        res.end();
    });

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
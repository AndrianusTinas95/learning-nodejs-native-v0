var http    = require("http");
var url     = require("url");
var router  = require("routes")();
var view    = require("swig");
var mysql   = require('mysql');

var conn = mysql.createConnection({
    host:'localhost',
    poet:3306,
    database:"learn_nodejs",
    user:"root",
    password:""
});

// router.addRoute('/',function(req,res){
//     var html =view.compileFile('./TestApp1/template/index.html')({
//         title :"index",
//         data : "ini data"
//     });
//     res.writeHead(200,{"Cotent-Type":"text/html"});
//     res.end(html);  
// });
router.addRoute('/',function(req,res){
    conn.query("select * from mahasiswa",function(err,rows,field){
        if(err) throw err;
      
        res.writeHead(200,{"Content-Type":"text/plain"});
        res.end(JSON.stringify(rows));
    });
});

router.addRoute('/insert',function(req,res){
    
    conn.query("insert into mahasiswa set ?",{
        nim:"H1051141013",
        nama:" lagi",
        alamat:"tes  lagi"
    },function(err,field){
        if(err) throw err;

        console.log(field.affectedRows);
        res.writeHead(200,{"Content-Type":"text/plain"});
        res.end(JSON.stringify(field.affectedRows));
    });
    
});

router.addRoute('/update',function(req,res){
    
    conn.query("update mahasiswa set ? where ?",[
        {nama:"nanas"},
        {nim:"h1051141029"}
    ],function(err,field){
        if (err) throw err;

        res.writeHead(200,{"Content-Type":"text/plain"});
        res.end(field.affectedRows+ " updated");
    })

});

router.addRoute('/delete',function(req,res){
    
    conn.query("delete from mahasiswa where ?",{
        nim:"h1051141029"
    },function(err,field) {
        if( err) throw err;

        res.writeHead(200,{"Content-Type":"text/plain"});
        res.end(field.affectedRows + " delete");

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
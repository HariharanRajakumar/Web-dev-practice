var express = require("express");
var server = express();
var request = require("request");

server.use(express.static('public'));
server.set("view engine","ejs");

server.get('/',function(req,res){
    res.render("search");
});

server.get('/result',function(req,res){
    var query = req.query.tag;
    var final = "http://www.omdbapi.com/?apikey=c49bbd12&s=" + query;
    request(final,function(error,res1,body){
        if(!error && res1.statusCode == 200){
            var data = JSON.parse(body);
            res.render("results",{data : data});
        }
    });
});

server.listen(3000,()=>{
    console.log("server is listening.......");
});
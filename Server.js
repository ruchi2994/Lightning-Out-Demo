var express = require('express'),
    http = require('http'), 
    request = require('request'),
    bodyParser = require('body-parser'),
    app = express();
    var cors = require('cors');
	
//var https = require('https');
var fs = require('fs');
 
	
var logFmt = require("logfmt");

app.use(express.static(__dirname + '/client')); 

app.use(bodyParser.json());  

app.set('port', process.env.PORT || 8080);

/*Allow CORS*/
/*Allow CORS*/
app.use(cors({
  origin: 'http://localhost:8081'
}));

app.all('/proxy',  function(req, res, next) { 
    
    var url = req.header('SalesforceProxy-Endpoint');  
    request({ url: url, method: req.method, json: req.body, 
                    headers: {'Authorization': req.header('X-Authorization'), 'Content-Type' : 'application/json'}, body:req.body }).pipe(res);    
    
});
 
app.get('/' ,  function(req,res,next) {
    res.sendfile('views/index.html');
} ); 

app.get('/index*' ,  function(req,res,next) {
    res.sendfile('views/index.html');
} );  
 
app.get('/oauthcallback.html' ,  function(req,res,next) {
    res.sendfile('views/oauthcallback.html');
} ); 

app.get('/Main*' ,   function(req,res,next) {
    res.sendfile('views/Main.html');
} );
 

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

	var options = {
      key: fs.readFileSync('./key.pem', 'utf8'),
      cert: fs.readFileSync('./server.crt', 'utf8')
   };
   
	http.createServer(options, app).listen(8081);
	console.log("Server listening for HTTP connections on port ", 8081);

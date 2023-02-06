var express = require('express');
var multer = require('multer');
var bodyParser = require('body-parser');

var app = express();
var upload = multer();
var port = 8080;

app.use(bodyParser.json(0));
app.use(bodyParser.urlencoded({extended: true}));
app.use(upload.array());

var products = require('./products');
app.use('/', products);
app.listen(port, function(err){
    if(err) console.log(err);
    console.log(`Server listening on PORT http://localhost:${port}`);
});
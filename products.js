var express = require('express');
var fs = require('fs');
var router = express.Router();

var products = [];


fs.readFile(__dirname + "/" + 'data.json', 'utf-8', (err, data)=>{
    var obj = JSON.parse(data);
    products = Object.values(obj);
});


router.get('/product', function(req, res){
    res.json(products);
});


router.get('/product/:productID', function(req, res){
    var curr = products.filter(function(p){
        if(p.productID == req.params.productID){
            return true;
        }
    });

    if(curr.length == 1){
        res.json(curr[0]);
    } else {
        res.status(404);
        res.json({
            message: "not found"
        });
    }
});


router.post('/product', function(req, res){
    var newID = products[(products.length) - 1].productID +1;
    products.push({
        productID: newID,
        productName: req.body.productName,
        company: req.body.company,
        price: req.body.price
    });
    res.json({
        message: "Create new product success",
        location: "/product/"+newID
    });
});


router.put('/product/:productID',function(req, res){
    var updateProduct = products.map(function(p){
        return p.productID;
    }).indexOf(parseInt(req.params.productID));

    if(updateProduct == -1){
        products.push({
            productID: req.params.productID,
            productName: req.body.productName,
            company: req.body.company,
            price: req.body.price
        });  
        res.json({
            message: "Create new product success"
        });     
    } else{
        products[updateProduct] = {
            productID: req.params.productID,
            productName: req.body.productName,
            company: req.body.company,
            price: req.body.price
        }; 
        res.json({
            message: "Update product success",
            location: "/product/"+req.params.productID
        });
    }
});


router.delete('/product/:productID', function(req, res){
    var removeIndex = products.map(function(p){
        return p.productID;
    }).indexOf(parseInt(req.params.productID));

    if(removeIndex == -1){
        res.json({
            message: "This product is not exist"
        });
    } else{
        products.splice(removeIndex, 1);
        res.json({
            message: "Product id "+req.params.productID+" removed"
        });
    }
});


module.exports = router;
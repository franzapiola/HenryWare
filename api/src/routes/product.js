const server = require('express').Router();
const { Product } = require('../db.js');

server.get('/', (req, res, next) => {
	Product.findAll()
		.then(products => {
			res.status(200).send(products);
			console.log(products);
		})
		.catch(next);
});


//Ruta todos los productos según categoría
server.get('/categorias/:categoria',function(req,res,next){



})


/*
server.put("/addProduct",(req,res,next)=>{

	console.log("Name: ",req.query.name);
	console.log("Price",req.query.price);
	console.log("Descrip",req.query.desc);
	console.log("Rating",req.query.rating);
	console.log("Warr",req.query.warranty);
	console.log("Stock",req.query.stock);
	console.log("Img",req.query.img);


	var obj ={
		nombre : req.query.name,
		price : req.query.price
	}
	

	Product.findOrCreate({
		defaults : {
			name : req.query.name,
			price : req.query.price,
			desciption : req.query.desc,
			rating : req.query.rating,
			warranty : req.query.warranty,
			stock : req.query.stock,
			image : req.query.img
		}
	})

	console.log("Database updated!")



	res.status(201).send("Database Updated");
})
*/


module.exports = server;

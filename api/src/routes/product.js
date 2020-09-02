const server = require('express').Router();
const { Product } = require('../db.js');

server.get('/', (req, res, next) => {
	Product.findAll()
		.then(products => {
			res.send(products);
		})
		.catch(next);
});


//Ruta todos los productos según categoría
server.get('/categorias/:categoria',function(req,res,next){



})

module.exports = server;

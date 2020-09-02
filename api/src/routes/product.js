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




server.get('/search', (req, res, next) => {

	// para buscar productos : /products/search?={nombredeproducto} Jx
    const product = req.query.product 
        
    //esta linea es para mostrar lo que buscamos en la consola del server, se puede comentar. JX
    console.log("Searching ->",product)

    Product.findAll({
        where: {
            name: product,
        },
        include: [
            {all:true}
        ]

    })
    .then( products => {
        res.status(200).send(products);
    })
    .catch(next);
})


module.exports = server;

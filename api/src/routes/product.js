const server = require('express').Router();
const {Op} = require('sequelize')
const bodyParser = require('body-parser')
const { Product } = require('../db.js');
const {Categories} = require('../db.js');
const { response } = require('express');


server.get('/', (req, res, next) => {
	Product.findAll()
		.then(products => {
			res.status(200).send(products);
		})
		.catch(next);
});



//Ruta todos los productos según categoría --> me trae todos los products que tienen esa categoría
server.get('/categorias/:categoria',function(req,res,next){
	const {categoria} = req.params;

	Categories.findAll({
		where:{
			name:categoria,
		},
		include:[{model:Product, as:"products"}]
	}).then(response => res.status(200).send(response[0].products)).catch(err => res.status(404).send(err))

})


server.get('/search', (req, res, next) => {
	// para buscar productos : /products/search?product={nombredeproducto} Jx
    const {product} = req.query

    //esta linea es para mostrar lo que buscamos en la consola del server, se puede comentar. JX
    //console.log("Searching ->",product)

    Product.findAll({
        where: {
            name:{
               [Op.like]:`%${product}%`
            }
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

server.put('/:id',function(req,res){

    const {id} = req.params

    const respuesta = {}

    req.body.name && (respuesta.name = req.body.name)
    req.body.price && (respuesta.price = req.body.price)
    req.body.description && (respuesta.description = req.body.description)
    req.body.rating && (respuesta.rating = req.body.rating)
    req.body.warranty && (respuesta.warranty = req.body.warranty)
    req.body.stock && (respuesta.stock = req.body.stock)
    req.body.image && (respuesta.image = req.body.image)

    // console.log(respuesta)

    Product.update(respuesta,{where:{product_id:id}}).then(res.status(200).json(respuesta))

    



})

module.exports = server;


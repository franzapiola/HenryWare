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
               [Op.iLike]:`%${product}%`        //iLike permite buscar sin importar mayusculas/minisculas
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
});


// buscar producto por id, ruta = products/:id

server.get('/:id',function(req,res,next){
	const {id} = req.params;

	Product.findAll({
		where:{
			product_id: id,
		}
    })
    .then(product => {
        res.status(200).send(product)
    })
    .catch(err => res.status(404).send(err))

});




server.post("/",(req,res,next) =>{
    //para agregar productos: /productos/add . Jx
    const {name, price, description, rating ,warranty , stock, image} = req.query

    console.log(name,price)

    // lo agrego con un form? Por ahora es solo con el body de lo que llega


    Product.create({
        name : name,
        price : price,
        description : description,
        rating : rating,
        warranty : warranty,
        stock : stock,
        image : image
        }
    )
    .then((res) =>{
       console.log({res});
       
    }).catch(error => console.log(error))


    res.status(201).send("Created!")

})


//Ruta para editar un producto por body
server.put('/:id',function(req,res){

    const {id} = req.params;

    const respuesta = {}
    req.body.name && (respuesta.name = req.body.name);
    req.body.price && (respuesta.price = req.body.price);
    req.body.description && (respuesta.description = req.body.description);
    req.body.rating && (respuesta.rating = req.body.rating);
    req.body.warranty && (respuesta.warranty = req.body.warranty);
    req.body.stock && (respuesta.stock = req.body.stock);
    req.body.image && (respuesta.image = req.body.image);
    // console.log(respuesta)
    Product.update(respuesta,{where:{product_id:id}}).then(res.status(200).json(respuesta));
    
})

//Ruta para eliminar productos
server.delete('/:id',function(req,res){
    const {id}=req.params;
    
    Product.destroy({
        where:{
            product_id:id
        }
    }).then(res.status(200).send("Producto eliminado"))
})


//Ruta para crear/agregar categorias
server.post('/category',function(req,res){

    const {name}=req.body
    
    Categories.create({
        name:name
    }).then(res.status(200).send('Categoría creada!'))

})


server.delete('/category/:id',function(req,res){
    const {id} = req.params;

    Categories.destroy({
        where:{
            category_id:id
        }
    }).then(res.status(200).send('Categoría eliminada'))
})

module.exports = server;


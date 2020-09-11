const server = require('express').Router();
const {Op} = require('sequelize')
const bodyParser = require('body-parser')
const { Product, Categories, product_category, Image } = require('../db.js');

//Trae *todos* los productos
server.get('/', (req, res) => {
	Product.findAll({
        order:[
            ['product_id','ASC']
        ],
        include:[{model:Categories,as:'categories'}]
    })
		.then(products => {
			res.status(200).send(products);
		})
		.catch(next);
});

//Ruta que devuleve todas las categorias
server.get('/categories',function(req,res,next){
    Categories.findAll().then( categories => {
        res.status(200).send(categories);
    }).catch(error => {
        console.log(error);
        res.send(error);
    })
})


//Ruta todos los productos según categoría --> me trae todos los products que tienen esa categoría
server.get('/categorias/:categoria',function(req,res){
	const {categoria} = req.params;
	Categories.findAll({
		where:{
			name:categoria,
		},
		include:[{model:Product, as:"products"}]
	}).then(response => res.status(200).send(response[0].products)).catch(err => res.status(404).send(err))
})



//---------------------------------------------------------------------------------------------------------
//--------------------------------Imágenes-----------------------------------------------------------------

//Agregar imagen a un producto
server.post('/:product_id/images', function(req, res){
    const { product_id } = req.params;
    //Front debe enviar por params el product_id y por body el URL de la imagen
    const { img_url } = req.body;

    Image.create({
      product_id,
      img_url
    })
    .then( () => res.status(200).send('Imagen agregada con éxito!'))
    .catch( error => res.status(400).send(error))
});

//Quitar imagen de un producto
server.delete('/:product_id/images/:img_id', function(req, res){
    const { product_id, img_id } = req.params;
    //Front debe enviar por params el product_id y el img_id
    Image.destroy({
        where:{
            img_id,
            product_id
        }
    })
    .then( ()=>res.status(200).send('Imagen eliminada con éxito!'))
    .catch( error => res.status(400).send(error))
});

//Traer todas las imágenes asociadas a un producto
//(aunque no es necesario ya que al hacer un GET a products o product/:product_id,
//ya vienen incluidas todas las imágenes asociadas... quizá esta ruta está al p2)
server.get('/:product_id/images', function(req, res){
    const { product_id } = req.params;

    Image.findAll({
        where: {
            product_id
        }
    })
    .then(images => {
        res.send(images);
    })
    .catch(error => res.status(400).send(error));
});

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
        },
        include:[{model:Categories,as:'categories'}, {model: Image}]
    })
    .then(product => {
        res.status(200).send(product)
    })
    .catch(err => res.status(404).send(err))
});



var jsonParser = bodyParser.json()
server.post("/",jsonParser,(req,res,next) =>{

    //para agregar productos: /products . Jx
    Product.create({
        name : req.body.name,
        price : req.body.price,
        description : req.body.description,
        rating : req.body.rating,
        warranty : req.body.warranty,
        stock : req.body.stock,
        image : req.body.image
    })
    .then((pro) => {
            //console.log("Creado en /product");
            res.status(201).send("Created!")}
        ).catch(error => {
            res.status(404).send(error)
        })
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
    }).then(res.status(200).send("Producto eliminado")).catch(err => res.status(400).send(err))
})


//-------------------------------------------------------------------------------------------------------
//-------------------------------------Categorías--------------------------------------------------------

//Ruta para crear/agregar categorias
server.post('/category',function(req,res){

    const {name}=req.body
    
    Categories.create({
        name:name
    }).then(res.status(200).send('Categoría creada!')).catch(err => res.status(400).send(err))
})

//Ruta para eliminar categorias
server.delete('/category/:id',function(req,res){
    const {id} = req.params;

    Categories.destroy({
        where:{
            category_id:id
        }
    }).then(res.status(200).send('Categoría eliminada')).catch(err => res.status(400).send(err))
})

//Ruta para editar categorias
server.put('/category/:id',function(req,res){

    const {id} = req.params;

    const {name} = req.body

    Categories.update({
        name: name
    },{where:{
        category_id:id
    }}).then(res.status(200).send('Categoría modificada')).catch(err => res.status(400).send(err))
})

//Ruta para agregar categoría a un producto
server.post("/:idproducto/category/:idcategoria",function(req,res){

    const {idproducto,idcategoria} = req.params

    product_category.create({
        product_id:idproducto,
        category_id:idcategoria
    }).then(res.status(200).send(`La categoría ${idcategoria} se agregó en el producto ${idproducto}`)).catch(err => res.status(400).send(err))      
})



module.exports = server;


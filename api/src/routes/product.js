const server = require('express').Router();
const {Op} = require('sequelize')
const bodyParser = require('body-parser')
const { Product } = require('../db.js');
const {Categories} = require('../db.js')


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

    req.body.name && (Product.update({name:req.body.name},
        {where:{
            product_id:id
        }
    }))

    req.body.price && (Product.update({price:req.body.price},
        {where:{
            product_id:id
        }
    }))

    req.body.description && (Product.update({description:req.body.description},
        {where:{
            product_id:id
        }
    }))

    req.body.rating && (Product.update({rating:req.body.rating},
        {where:{
            product_id:id
        }
    }))

    req.body.warranty && (Product.update({warranty:req.body.warranty},
        {where:{
            product_id:id
        }
    }))

    req.body.stock && (Product.update({stock:req.body.stock},
        {where:{
            product_id:id
        }
    }))
    
    req.body.image && (Product.update({image:req.body.image},
        {where:{
            product_id:id
        }
    }))

    Product.findOne({where:{product_id:id}}).then(response => res.status(200).json(response))
})

module.exports = server;


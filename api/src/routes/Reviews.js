const server = require('express').Router()
const bodyParser = require('body-parser')
const { Review, Product, User } = require('../db.js')

server.use(bodyParser.json());


//Ruta que devuelve todas las Reviews
server.get('/:product_id',function( req, res ){
    const { product_id } = req.params
    Review.findAll({
        
        where: {
            product_id
        },
        include: [{model:User}]
    })
    .then( response => {res.status(200).json(response)})
    .catch(err => res.status(404).json(err))
});
//Editar una Review
server.put('/:review_id', (req, res) => {
    
})
//Cargar un rating y descripcion a un producto
server.post('/:product_id',(req, res) => {
    console.log('review router')
    const { product_id } = req.params;
    const { rating, description, user_id } = req.body;
    
    Review.create({
        rating: rating && rating.length > 0 ? rating : null,
        description: description && description.length > 0 ? description : null,
        user_id: user_id && user_id.length > 0 ? user_id : null,
        product_id: product_id && product_id.length > 0 ? product_id : null
    })
    .then((rating) => {
        res.status(201).send({status: 201, message: {
            user_id: rating.user_id,
            product_id: rating.product_id,
            review_id: rating.review_id,
            rating: rating.rating,
            description: rating.description,
        }})        
    })
    .catch((error) => {
        res.status(400).json({status: 400, message: error})
    })
})

module.exports = server;
const server = require('express').Router()
const bodyParser = require('body-parser')
const { User, LineaDeOrden, Order, Product} = require('../db.js')

server.use(bodyParser.json());

//Agregar producto al carrito de un usuario en particular       /order/:user_id/cart
server.post('/:user_id/cart',function(req,res){

    const {user_id} = req.params;
    const { product_id, quantity, price } = req.body;

    Order.findOrCreate({
        where:{
            user_id,
            state: 'Carrito'
        }
    })
    .then(ord => {
        const order_id = ord[0].order_id;
        return LineaDeOrden.create({
            product_id,
            order_id,
            quantity,
            price
        })
    })
    .then((l)=>{
        res.status(200).send(l)
    })

    .catch(err=>{
        console.log(err);
        res.status(400).send(err)})
    
});

module.exports = server;
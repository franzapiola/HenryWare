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

//Traer todos los items del carrito de un usuario en particular         /order/:user_id/cart
server.get('/:user_id/cart', (req, res) => {
    const { user_id } = req.params;

    Order.findOne({
        where: {
            user_id,
            state: 'Carrito'
        }
    })
    .then((response) => {
        return  LineaDeOrden.findAll({
            where: {
                order_id: response.order_id
            }
        })
    })
    .then((items) => {
        res.status(200).send(items)
    })
    .catch((error) => {
        res.status(404).send(error)

    })
});

module.exports = server;
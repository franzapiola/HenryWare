const server = require('express').Router()
const bodyParser = require('body-parser')
const { LineaDeOrden, Order, Product} = require('../db.js')

server.use(bodyParser.json());


//Ruta que devuelve todas las ordenes y, en caso de tener query string Status, trae todas las ordenes con ése estado  /orders
server.get('/',function(req,res){
    const {status} = req.query

    if(status !== 'Carrito' && status !== 'Creada' && status !== 'Procesando' && status !== 'Cancelada' && status !== 'Completa'){
        res.status(404).send('No es un estado válido')
    }

    if(status){

        Order.findAll({
            where:{
                state:status
            }
        })
        .then(response =>{ res.status(200).send(response)})
        .catch(err => res.status(404).send(err,'No hay ordenes en éste estado'))

    }else{

        Order.findAll({})
        .then(response => {res.status(200).send(response)})
        .catch(err => res.status(404).send(err))

    }
});

//Traer una orden en particular según order_id, pasada por params       /orders/:order_id
server.get('/:order_id', function(req, res){
    const { order_id } = req.params;

    Order.findOne({
        where:{
            order_id
        },
        include: [{model: Product, as:'products'}]
    })
    .then(order => {
        res.send(order);
    })
    .catch(error => {
        res.status(400).send(error);
    })
})



module.exports = server;
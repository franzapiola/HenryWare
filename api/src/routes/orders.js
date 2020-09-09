const server = require('express').Router()
const bodyParser = require('body-parser')
const { User, LineaDeOrden, Order, Product} = require('../db.js')

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
})



module.exports = server;
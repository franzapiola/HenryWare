const server = require('express').Router()
const bodyParser = require('body-parser')
const { User, LineaDeOrden} = require('../db.js')

server.use(bodyParser.json());



server.get('/',function(req,res){
    User.findAll({}).then(response => res.status(200).send(response))
})

//Ruta para crear un usuario    /user    NV.
server.post('/',(req, res) => {
    User.create({
        email: req.body.email,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        address: req.body.address,
        phone_number: req.body.phone_number,
        role: req.body.role
    })
    .then((usuario) => {
        console.log(usuario);
       res.status(201).send("Welcome!")
        
    })
    .catch((error) => {
        res.status(404).send(error)
    })
})

server.post('/:idUser/cart',function(req,res){

    const {idUser} = req.params;

    LineaDeOrden.create({
        
    })

})

// users/:id   ruta para eliminar usuario            NV.

server.delete('/:id', (req, res)=>{
    User.destroy({
        where: {
            user_id: req.params.id
        }
    })
    .then(()=>{
        res.status(200).send("User deleted!")
    })
    .catch((error) => {
        res.status(404).send(error)
    })
});

module.exports = server;
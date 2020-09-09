const server = require('express').Router()
const bodyParser = require('body-parser')
const { User, LineaDeOrden} = require('../db.js')

server.use(bodyParser.json());


//Ruta para obtener todos los usuarios  /users

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
        //console.log(usuario);
        res.status(201).send("Welcome!")
        
    })
    .catch((error) => {
        res.status(404).send(error)
    })
})

//Ruta para modificar información de un usuario     /users/:user_id
server.put('/:user_id', function(req, res){
    const user_id = req.params.user_id;

    //Array con todas las keys que contenga req.body
    const reqBody_props = Object.keys(req.body);

    //Objeto que voy a llenar con las propiedades que estén presentes en req.body que
    //sean relevantes para modificar el usuario
    var newInfo = {};
    reqBody_props.forEach(p => {
        switch(p){
            case 'email':
                newInfo.email = req.body.email;
                break;
            case 'first_name':
                newInfo.first_name = req.body.first_name;
                break;
            case 'last_name':
                newInfo.last_name = req.body.last_name;
                break;
            case 'address':
                newInfo.address = req.body.address;
                break;
            case 'phone_number':
                newInfo.phone_number = req.body.phone_number;
                break;
        }
    });

    //Actualizo el usuario con el id correcto, pasándole newInfo
    User.update(newInfo, { where: { user_id } })
    .then( () => res.status(200).send(`La información de usuario fue actualizada con éxito!`))
    .catch( err => res.status(400).send(err));
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
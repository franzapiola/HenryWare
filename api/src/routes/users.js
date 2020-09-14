const server = require('express').Router()
const { json } = require('body-parser');
const bodyParser = require('body-parser')
const { User,Order,LineaDeOrden,Product,Image } = require('../db.js')

server.use(bodyParser.json());


//Ruta para obtener todos los usuarios  /users

server.get('/',function(req,res){
    User.findAll({}).then(response => res.status(200).send(response))
})

//Ruta para crear un usuario    /user    NV.
server.post('/',(req, res) => {
    const { email, first_name, last_name, address, phone_number, role }= req.body
    //Hice algunas modificaciones para que maneje bien los datos recibidos. Ya que el formulario manda a veces strings vacios. y la respuesta no la podia manejar si no era un objeto. 
    User.create({
        email: email && email.length > 0 ? email : null,
        first_name: first_name && first_name.length > 0 ? first_name : null,
        last_name: last_name && last_name.length > 0 ? last_name : null,
        address: address && address.length > 0 ? address:null,
        phone_number: phone_number && phone_number.length > 0 ? phone_number : null,
        role: role?role:null,
    })
    .then((usuario) => {
        res.status(201).send({status: 201, message: usuario})        
    })
    .catch((error) => {
        res.status(400).send({status: 400, message: error})
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

// /users/usersID/email={email} Ruta que trae el id de un usuario en particular pasado por email

server.get('/usersID/',(req,res) => {
    const {email} = req.query;
    
    User.findAll({
        where: {
           email 
        }
    }).then( user =>{
        var obj = {
            id : user[0].dataValues.user_id, 
            name : user[0].dataValues.first_name
        }
        res.status(200).json(obj)
    }).catch(() => res.status(200).json({
        id : "Usuario no encontrado",
        name : "Guest"
    }))
})



//-----------------------CARRITO---------------------------------------------------------------------

//Agregar producto al carrito de un usuario en particular       /users/:user_id/cart
server.post('/:user_id/cart',function(req,res){

    console.log(req.body);
    const {user_id} = req.params;
    const { product_id, quantity, price } = req.body;

    Order.findOrCreate({
        where:{
            user_id,
            state: 'Carrito'
        }
    })
    .then(ord => {
        //findOrCreate devuelve un array [objeto, booleano]
        //Si el registro ya existía y no se creó nada nuevo, el booleano es false.
        const order_id = ord[0].order_id;
        return LineaDeOrden.create({
            product_id,
            order_id,
            quantity,
            price
        });
    })
    .then((l)=>{
        res.status(200).send(l)
    })

    .catch(err=>{
        res.status(400).send(err)})
    
});

//Traer todos los items del carrito de un usuario en particular         /users/:user_id/cart
server.get('/:user_id/cart', (req, res) => {
    const { user_id } = req.params;

    Order.findOne({
        where: {
            user_id,
            state: 'Carrito'
        },
        include:[{model:Product, as: 'products',include:[{model:Image}]}]
    })
    .then((items) => {
        res.status(200).send(items)
    })
    .catch((error) => {
        res.status(404).send(error)

    })
});

//Cambiar cantidad de un determinado producto(product_id) en el carrito de un determinado usuario(user_id) /users/user_id/cart
server.put('/:user_id/cart', function(req, res){
    //El front tiene que mandar por params el user_id, y por body el product_id y la cantidad deseada
    const { user_id } = req.params;
    const { product_id, quantity } = req.body;
    console.log('userID', user_id, 'product_id', product_id, 'quantity', quantity)
    Order.findOne({
        where:{
            user_id,
            state: 'Carrito'
        }
    })
    .then(order => {
        //Busco la línea de orden relacionada al product_id que recibimos por body y al order_id que recibimos por params
        return LineaDeOrden.findOne({
            where:{
                order_id: order.order_id,
                product_id
            }
        });
    })
    .then(response=>{
        //findOne devuelve una referencia directa al registro que encontró
        //por ende con un .update actualizamos el atributo que queremos, y listo!
        return response.update({
            quantity
        });
    })
    .then(() => {
        res.status(200).json({product_id, quantity});
    })
})


//Ruta para eliminar linea de ordenl carrito de determinado usuario pasado por paramas user_id /users/user_id/cart

server.delete('/:user_id/cart', (req, res) => {
    const { user_id } = req.params;
    
    Order.findOne({
        where: {
            user_id: user_id,
            state: 'Carrito'
        }
    })
    .then((orden)=>{
        return LineaDeOrden.findAll({
            where: {
                order_id: orden.order_id
            }
        })
    })
    //  Iteramos sobre la linea de orden y eliminamos 
    .then((relation)=>{
        relation.forEach(element => {
           element.destroy() 
        });
        
    })
    .then(()=>{
        res.send("Eliminado")
    })
    .catch((error)=>{
        res.send(error)
    })
    
})


// Ruta que trae todas las ordenes de un usuario en particular (Por ID (params) )    /users/iduser/orders
server.get('/:user_id/orders',function(req,res){

    const {user_id} = req.params

    Order.findAll({
        where:{
            user_id
        },
        // include:[{model:Product,as:'products'}]
    })
    .then(response => res.status(200).send(response))
    .catch(err => res.status(404).send(err))

})




module.exports = server;
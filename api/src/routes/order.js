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

//Traer todos los items del carrito de un usuario en particular         /order/:user_id/cart
server.get('/:user_id/cart', (req, res) => {
    const { user_id } = req.params;

    Order.findOne({
        where: {
            user_id,
            state: 'Carrito'
        }
    })
    .then((orden) => {
        return  LineaDeOrden.findAll({
            where: {
                order_id: orden.order_id
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

//Cambiar cantidad de un determinado producto(product_id) en el carrito de un determinado usuario(user_id)
server.put('/:user_id/cart', function(req, res){
    //El front tiene que mandar por params el user_id, y por body el product_id y la cantidad deseada
    const { user_id } = req.params;
    const { product_id, quantity } = req.body;

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
        res.status(200).send(`Se ha actualizado la cantidad del producto a ${quantity}`);
    })
})


//Ruta para eliminar linea de ordenl carrito de determinado usuario pasado por paramas user_id

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

module.exports = server;
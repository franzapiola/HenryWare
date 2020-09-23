require('dotenv').config()


const server = require('express').Router()
const { json } = require('body-parser');
const bodyParser = require('body-parser')
const { User } = require('../db.js')
const bcrypt = require('bcrypt');

const jwt = require("jsonwebtoken")

const checkPassword = async(user,password) => {
	const comparacion = await bcrypt.compare(password, user.password)
	
	return comparacion
};


server.post("/login",(req,res,next) => {

	//authenticate with email
	const email = req.body.email
	const password = req.body.password
	
	//buscamos usuario con ese email
	User.findOne({
		where:{ email }
	})
	.then(user => {
		//si no encontramos el email devolvemos error
		if(!user) return res.json({error: 'Esta dirección de correo no se encuentra registrada'})
		// si lo encontramos, controlamos que la contraseñas sean iguales
		checkPassword(user,password)
		.then( match => {
			if(match){//si lo son, devolvemos token
				//No guardamos la password en el token
				const userData = { user: {
					user_id : user.user_id,
					first_name : user.first_name,
					last_name : user.last_name,
					role : user.role,
					email : email
				} }
				//Creamos el token pasándole la información del usuario y el ACCESS_TOKEN_SECRET declarado en .env
				const accessToken = jwt.sign(userData, process.env.ACCESS_TOKEN_SECRET);

				//Mandamos al front la info del usuario y el token
				return res.status(200).json({accessToken , user : {
					user_id : user.user_id,
					first_name : user.first_name,					
					last_name : user.last_name,
					role : user.role,
					email : email
				}})
			}else{
				//si no, mandamos error
				res.json({accessToken : null, error: 'Contraseña incorrecta'})
			}
		})

		

	})
	.catch((err) => res.status(400).json({error:"ERROR!!!!!!!!!!!!!!"}))
	

});

server.post('/logout', ()=>{});



function authenticateToken(req,res,next){
	//console.log(req.headers)
	const authHeader = req.headers['authorization']
	const token = authHeader && authHeader.split(' ')[1]
	if ( token == null) return res.sendStatus(401)
	jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err, user) =>{
		if(err) return res.sendStatus(403);
		res.send(user);
	})
	

}

//		/auth/me
server.get('/me', authenticateToken)

//Promover un usuario a admin
server.post('/promote/:user_id', (req, res) => {
	const { user_id } = req.params;

	User.update({
		role: 'admin'
	}, {
		where: {
			user_id
		}
	})
	.then(() => res.send('Este usuario ahora es admin!'))
	.catch(err => res.send(err));
});

module.exports = server;
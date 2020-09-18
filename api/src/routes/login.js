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



server.get('/',authenticateToken,(req,res) => {
	console.log("usuario autorizado bro")
	res.status(200).json({usuario:" Autorizado"})
})

server.post("/login",(req,res,next) => {

	//authenticate with email
	const email = req.body.email
	const password = req.body.password
	
	//buscamos usuario con ese email
	User.findOne({
		where:{ email : email}
	})
	.then(user => {
		//si no encontramos el email devolvemos error
		if(!user) return res.json({Error: "usuario no encontrado"})
		// si lo encontramos, controlamos que la contraseñas sean iguales
		checkPassword(user,password)
		.then((data) =>{
			if(data){//si lo son, devolvemos token
				const userData = { user}
				
				const accessToken = jwt.sign(userData, process.env.ACCESS_TOKEN_SECRET)
				return res.status(200).json({accessToken , user : {
					id : user.user_id,
					name : user.first_name,					
					last_name : user.last_name,
					role : user.role,
					email : email

				}})
			}else{
				//si no, mandamos error
				res.status(400).json({accessToken : null})
			}
		})

		

	})
	.catch((err) => res.json({error:"ERRRO"}))
	

})


function authenticateToken(req,res,next){
	console.log(req.headers)
	const authHeader = req.headers['authorization']
	const token = authHeader && authHeader.split(' ')[1]
	if ( token == null) return res.sendStatus(401)
	jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,email) =>{
		if(err) return res.sendStatus(403)
		//req.email = email
		next()
	})
	

}


module.exports = server;
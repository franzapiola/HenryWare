import React,{ useState, useEffect } from 'react';
import {useParams}  from 'react-router-dom'
import styles from './register.module.scss'
import { FormControl, TextField, Button } from '@material-ui/core';
import GoogleButton from 'react-google-button'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"


//localhost:3000/loginToken

export default function LoginToken(){
	const axios = require('axios');

	const [actualUserID,setActualUserID] = useState()
	const [actualUserName,setActualUserName] = useState("Guest")
	const [actualUserLastName,setActualUserLastName] = useState()
	const [actualUserRole,setActualUserRole] = useState("guest")

	console.log(actualUserName)

	//localStorage.setItem("actualToken",null)
	//localStorage.setItem("actualUserName",actualUserName)

/*	axios.post(url, {
	  //...data
	}, {
	  headers: {
	    'Authorization': `Basic ${token}` 
	  }
	})
*/
	
	const getToken = async (email,passwd) => {
		
		await axios.post("http://localhost:3001/auth/login",

		 	{
			email : email,
			password : passwd
		})
		.then(response =>{
			// el objeto user tiene datos del usuario ( id, nombre, apelido,rol)
			// el objeto accessToken es el token de sesion
			console.log(response.status)
			if(response.status === 200){
				//la info de usuario la tenemos que guardar en el reduxStore
				console.log(response.data.user) 
				setActualUserID(response.data.user.id)
				setActualUserRole(response.data.user.role)
				setActualUserName(response.data.user.name)
				setActualUserLastName(response.data.user.last_name)

			//el acessToken lo guardamos en el Local storage
				return localStorage.setItem("actualToken",response.data.accessToken)
				
			}

			localStorage.setItem("actualToken",null)
			
			
		})
		.catch( (err) => console.log(err) )

	}

	/*const getToken = (email,passwd) => {
		console.log(email)
		 axios.get("http://localhost:3001/auth",

		 	headers: {
				'Authorization' : `Beared ${localStorage.getItem("actualToken")}`
			}
		})
		.then(response =>{
			console.log(response.data)
			//localStorage.setItem("actualToken",response.data.accessToken)
		})
		.catch( (err) => console.log(err) )

	}*/

		
	return(
		<div className={`pt-3 mt-2 d-flex justify-content-center align-items-center w-100 mx-auto ${styles.container}`}>
			<div class={`card ${styles.cardLogin}`}  >
			<span>TOKEN actual : {localStorage.getItem("actualToken")} </span>
			<form >
				 <div class="form-group">
				    <label for="userInput">Correo Electronico</label>
				    <input name="correo" type="text" class={`form-control ${styles.inputLogin}`} id="correo" />    
				  </div>
				  <div class="form-group">
				    <label for="exampleInputPassword1">Contraseña</label>
				    <input type="password" class={`form-control ${styles.inputLogin}`} id="password"/>
				  </div>
				  
				  <button  className={`${styles.henryColor} col-md-12`} onClick={ (e) => {
				  	getToken(document.getElementById("correo").value,document.getElementById("password").value);
				  	e.preventDefault();

				  }}>Ingresar</button>
				 
				</form>
			</div>
		</div>
		)
}
import React,{ useState, useEffect } from 'react';
import {useParams}  from 'react-router-dom'
import styles from './register.module.scss'
import { FormControl, TextField, Button } from '@material-ui/core';
import GoogleButton from 'react-google-button'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"



export default function Login(){
	const axios = require('axios');



	const [idUser,setIdUser] = useState("Guest")
	const [actualUserName,setActualUserName] = useState("guest")
	localStorage.setItem("actualUserId",idUser)
	localStorage.setItem("actualUserName",actualUserName)

	

	const cambiarLocalId =  async (email)=>{
		 
		 //const username = "juan@gmail.com";
		
		 await axios({
		 	url : `http://localhost:3001/users/usersID?email=${email}`,
		 	method : "GET"
		 }).then(response => {
		 	setIdUser(response.data.id)
		 	setActualUserName(response.data.name)
		 	console.log(response.data.name)
		 })


		 
		 
		 	
	}

		
	return(
		<div className={`pt-3 mt-2 d-flex justify-content-center align-items-center w-100 mx-auto ${styles.container}`}>
			<div class={`card ${styles.cardLogin}`}  >
			{/*<span>Usuario actual : {localStorage.getItem("actualUserId")} </span>*/}
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
				  	cambiarLocalId(document.getElementById("correo").value);
				  	e.preventDefault();

				  }}>Ingresar</button>
				 {/*<span>ACTUAL STATUS : {idUser} </span>*/}
				</form>
			</div>
		</div>
		)
}
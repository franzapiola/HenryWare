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

	const cambiarLocalId =  (usernameId)=>{
		 localStorage.setItem("actualUserId",usernameId)
		 /*axios.get(`http://localhost:3001/users/${username}`).then(resp => {
		 	console.log(resp.data);
		 })*/
		
		
	}

	
	return(
		<div className={`pt-3 mt-2 d-flex align-items-center w-75 mx-auto ${styles.container}`}>
			<div class="card" style={{width : "18rem"}} >
			{/*<span>Usuario actual : {localStorage.getItem("actualUserId")} </span>*/}
				<form >
					<div class="form-group">
				    	<label for="userInput">ID de usuario</label>
				  		<input name="idUsuario" type="text" class="form-control" id="idUsuario" />    
				  </div>
				  <div class="form-group">
				    <label for="userInput">Nombre de usuario</label>
				    <input name="data" type="text" class="form-control" id="data" />    
				  </div>
				  <div class="form-group">
				    <label for="exampleInputPassword1">Contraseña</label>
				    <input type="password" class="form-control" id="password"/>
				  </div>
				  <button type="submit" className={`${styles.henryColor} col-md-12`} onClick={ () => cambiarLocalId(document.getElementById("idUsuario").value)}>Ingresar</button>
				
				</form>
			</div>
		</div>
		)
}
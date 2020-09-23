import React from 'react'
import GoogleLogin from 'react-google-login'
import GoogleButton from 'react-google-button';
import axios from 'axios'

export default function Google () {

    const responseSuccess=(googleResponse) => {
        //console.log(response);
        //console.log(response.profileObj.email);
        axios.post("http://localhost:3001/auth/externalLogin?external=google",{
            email : googleResponse.profileObj.email,
            first_name : googleResponse.profileObj.givenName,
            last_name : googleResponse.profileObj.familyName
        })
        .then(response =>{
            // el objeto user tiene los datos relevantes del usuario ( id, nombre, apellido,rol)
            // el objeto accessToken es el token de sesion
            if(response.data.user){
                //Sacamos el accessToken y la información del usuario de la respuesta
                const { user, accessToken } = response.data
                //Llamando a loadUserData, mandamos el usuario recibido como respuesta a la store de Redux
              //  loadUserData(user);
                //El accessToken, por otro lado, lo guardamos en el Local storage
                localStorage.setItem("actualToken", accessToken);
                
                //Redireccionamos a la homepage
                //history.push('/');
                return;
            } 
        })
    }

    const responseFailure = (response) =>{
        console.log(response)
    }

    return (
        <div>
            <GoogleLogin
            //guardarla en .env
            clientId='243862763103-9oer77jtoipa8qhd4ooflsjv5u31lmj2.apps.googleusercontent.com'
            buttonText='Login'
            onSuccess={responseSuccess}
            onFailure={responseFailure}
            cookiePolicy={'single_host_origin'}
            
            
            
            />

        </div>
    )
}
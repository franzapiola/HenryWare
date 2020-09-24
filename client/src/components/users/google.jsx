import React from 'react'
import GoogleLogin from 'react-google-login'

export default function Google () {

    const responseGoogle=(response) => {
        console.log(response);
        console.log(response.profileObj);
    }

    return (
        <div>
            <GoogleLogin
            clientId='243862763103-9oer77jtoipa8qhd4ooflsjv5u31lmj2.apps.googleusercontent.com'
            buttonText='Login'
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
            
            
            
            />

        </div>
    )
}
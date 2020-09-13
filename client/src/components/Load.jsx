import React from 'react'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import "./load.css"
import Loader from 'react-loader-spinner'



const Load = () => {
    return ( 
        <div className="container">
            <Loader
             type="TailSpin"
             color="#FFFF01"
             height={150}
             width={150}
             timeout={1000000} //3 secs
     
          />

        </div>
    )
}



export default Load
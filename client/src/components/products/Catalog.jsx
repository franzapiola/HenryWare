import React, { useState, useEffect } from 'react'
import Prueba from './Prueba'
//import Card from './Card'

export default function Catalogo() {
    const API_KEY = "276eac7"
    const [ products, setProducts ] = useState([]);
    console.log(products);
    const getProducts = async ()=>{
        try {
            const response = await fetch(`http://www.omdbapi.com/?apikey=276eac7&s=batman`);
            const jsonData = await response.json();
            setProducts(jsonData.Search)
        } catch (error) {
            console.error(error.message)
        }        
    }
    const renderProducts = ()=>{
        const result = products.map( product =>(
            <Prueba data={product}/>
        ))
        return result;
    }
    useEffect(()=>{
        getProducts();      
    },[])
    console.log(products)
    const style={
        categoria: {
            width: '250px',
            height: '90vh',
            backgroundColor: 'grey'
        }

    }
    return (
        <div className='container-fluid'>        
           <h1>Catalog</h1>
           <div className='d-flex'>
               <div className="categoria" style={style.categoria}>
                {renderProducts()}
               </div>
               
           </div>
        </div>
    )
}

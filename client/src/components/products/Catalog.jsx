import React, { useState, useEffect } from 'react'
import ProductCard from '../ProductCard'

export default function Catalogo() {
    const [ products, setProducts ] = useState([]);
    console.log(products);
    const getProducts = async ()=>{
        try {
            const response = await fetch(`http://localhost:3001/products`);
            const jsonData = await response.json();
            setProducts(jsonData)
            console.log(jsonData)
        } catch (error) {
            console.error(error.message)
        }        
    }
    const renderProducts = ()=>{
        const result = products.map( product =>(
            <ProductCard data={product} />
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

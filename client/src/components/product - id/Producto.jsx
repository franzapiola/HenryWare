import React,{ useState, useEffect } from 'react';
import {useParams}  from 'react-router-dom'



export default function Producto (props) {
    const [productData, setProductData] = useState({})
    const {id} = useParams()
    
    const getIdProduct = async (id) =>{
        try {
          const res = await fetch(`http://localhost:3001/products/${id}`);
          const data = await res.json();
          setProductData(data[0])
      } catch (error) {
          console.error(error.message)
        }}
        
    useEffect(() => {
        getIdProduct(id)
        
    },[])



    return (
        <div>
        {/* <div>
            {productData.categories.map(el=>{
                return (
                    <p>{el.name}</p>
                )
            })}
        </div> */}

        <div>
            <h1>{productData.name}</h1>
            <h4>En stock: {productData.stock}</h4>
        </div>

        <div>
            <h3 style={{'color': 'green'}}>${productData.price}</h3>
        </div>

        <img style = {{'max-width': '500px', 'max-height': '500px'}} src={productData.image} alt='Imagen Producto'/>

        <p>{productData.description}</p>
        <p>Garantía: {productData.warranty}</p>
    </div>
    )
}
import React,{ useState, useEffect } from 'react';
import {useParams}  from 'react-router-dom'
import style from './producto.css'
import Rating from './Rating'
import { Button } from 'react-bootstrap'
import axios from "axios"


export default function Producto (props) {
    const [ productData, setProductData ] = useState({})
    const { id } = useParams()
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
     } ,[]) 
    

    const enviarACarrito = async (id,product_id,quantity,price) => { 
        axios.post(`http://localhost:3001/users/${id}/cart`, {
            product_id : product_id,
            quantity : quantity, 
            price : price,
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
        
    }


    return (
        <div className='mt-4 col-md-12 '>
            <div className="card">
            <div className="card-header text-center">
                <h3>{productData.name}</h3>
            </div>
            <div className="card-body">
                <div className="row">
                    <div className="div-imagen col-md-7 col-8">
                        <img 
                            className='imagen-producto img-fluid' 
                            src={productData.img_id} 
                            alt={`Imagen ${productData.name}`}
                        />
                    </div>
                    <div className='product-data col-md-5 col-4'>
                        <div className="vertical-line"></div>
                        <p>{productData.description}</p>
                        <div>
                            <h2>${productData.price}</h2>
                        </div>
                        <p className='text-primary'><Rating rating={productData.rating}/> </p>
                        <p>Garantía: {productData.warranty} días</p>
                        <h4>{productData.stock>0?'Stock Disponible': 'Sin Stock'}</h4>
                        {/*<Button className="col-md-5 col-12 mr-2" variant='comprar'>Comprar</Button>*/}
                        <Button className="col-md-5 col-12" variant='info' onClick={ () => enviarACarrito(1,productData.product_id,1,productData.price)} >Añadir al Carrito</Button>
                    </div>
                </div>
            </div>
            <div className="card-footer">                
            </div>
            </div>
        </div>
    )
}
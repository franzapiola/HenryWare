import React,{ useState, useEffect } from 'react';
import {useParams}  from 'react-router-dom'
import style from './producto.css'
import Rating from './Rating'
import { Button, Carousel } from 'react-bootstrap'
import axios from "axios"


export default function Producto (props) {
    const [ productData, setProductData ] = useState({
        images:[]
    })
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
    
    const userID = localStorage.getItem("actualUserId");
    
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
                <h3>actualID: {localStorage.getItem("actualUserId")}</h3>
            </div>
            <div className="card-body">
                <div className="row">
                    
                    <Carousel style={{width:"50%"}}>
                        {productData.images.map(function(imagen){
                            return <Carousel.Item style={{textAlign:'center'}}><img style={{height:'100%'}}src={imagen.img_url}/></Carousel.Item>
                        })}
                    </Carousel>

                    <div className='product-data col-md-5 col-4'>
                        <div className="vertical-line"></div>
                        <p>{productData.description}</p>
                        <div>
                            <h2>${productData.price}</h2>
                        </div>
                        <p className='text-primary'><Rating rating={productData.rating}/> </p>
                        <p>Garantía: {productData.warranty} días</p>
                        <h4>{productData.stock>0?'Stock Disponible': 'Sin Stock'}</h4>
                        {/*<Button className="col-md-5 col-12 mr-2" variant='comprar'  disabled={productData.stock<=0?'disabled':null}>Comprar</Button>*/}
                        <Button className="col-md-5 col-12" variant='info'  disabled={productData.stock<=0?'disabled':null} onClick={ 
                            () => enviarACarrito(userID,productData.product_id,1,productData.price)} >Añadir al Carrito</Button>
                    </div>
                </div>
            </div>
            <div className="card-footer">                
            </div>
            </div>
        </div>
    )
}
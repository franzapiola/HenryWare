import React,{ useState, useEffect } from 'react';
import {useParams}  from 'react-router-dom'
import styles from './producto.module.css'
import Rating from './Rating'
import { Button, Carousel } from 'react-bootstrap'
import axios from "axios"
import Reviews from '../reviews/reviews';
import {loadUserData} from '../../redux/actions/auth'

import { connect } from 'react-redux'
import {fetchUserCart} from '../../redux/actions/cart'

function Producto (props) {

    const { userInfo, averageReview,fetchUserCart} = props;

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
    
    //Recibimos el id del usuario actual a  través del store
    const { user_id, role} = userInfo
    
    const enviarACarrito = async (id,product_id,quantity,price) => {
        if(role === 'Guest'){
            const lStorCart = localStorage.getItem('guestCart');
            
            if (lStorCart == null){
                let currentCart = {
                    products: []
                }
                currentCart.products.push(productData);
                return localStorage.setItem('guestCart', JSON.stringify(currentCart));    
            } else {
                let currentCart = JSON.parse(lStorCart);
                currentCart.products.push(productData);
                return localStorage.setItem('guestCart', JSON.stringify(currentCart));    
                }
        }
        await axios.post(`http://localhost:3001/users/${user_id}/cart`, {
            product_id : product_id,
            quantity : quantity, 
            price : price,
          })
          .then( () => {
            fetchUserCart(user_id)
          })
          .catch(function (error) {
            console.log(error);
          });
        
    }

    return (

        <div className='mt-4 col-md-12 '>
            <div className="card-header text-center">
                {/*<h3>actualID: {localStorage.getItem("actualUserId")}</h3>*/}
            </div>

            <div className="card-body">
                <div className="row" className={styles.container}>
                    
                    <Carousel className={styles.carousel}>
                        {productData.images.map(function(imagen){
                            return <Carousel.Item className={styles.carouselItem}><img className={styles.carouselImg} src={imagen.img_url}/></Carousel.Item>
                        })}
                    </Carousel>

                    <div className='product-data col-md-5 col-4' className={styles.caja}>
                        <h3><b>  {productData.name} </b></h3>

                        {/* <div className="vertical-line"></div> */}
                        <i className='text-primary' className={styles.r}>Calificación: <Rating rating={productData.rating} className={styles.rating}/> </i>
                        <div className={styles.cajaPrice}>
                            <h2 className={styles.price}>${productData.price}</h2> <span className={styles.ars}>ARS</span>
                        </div>
                        <p className={styles.description}>{productData.description}</p>
                        
                        <p className={styles.garantia}>Garantía | {productData.warranty} días</p>
                        <h4 className={styles.stock}>{productData.stock>0?'Stock Disponible': 'Sin Stock'}</h4>
                        {/*<Button className="col-md-5 col-12 mr-2" variant='comprar'  disabled={productData.stock<=0?'disabled':null}>Comprar</Button>*/}
                        <Button className={`col-md-5 col-12 ${styles.buttonCart}`} variant='info'  disabled={productData.stock<=0?'disabled':null} onClick={ 
                            () => enviarACarrito(user_id,productData.product_id,1,productData.price)} className={styles.button}>Añadir al Carrito</Button>
                    </div>
                </div>
            </div>
            <Reviews id={id} />
            
        </div>
    )
}

const mapStateToProps = state => {
  
    return {
        averageReview: state.review.averageReview,
        userInfo : state.auth
    }
}
  
const mapDispatchToProps = (dispatch, props) => {
    return {
        
        loadUserData: () =>dispatch(loadUserData()),
        fetchUserCart:(user_id) => dispatch(fetchUserCart(user_id))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Producto)
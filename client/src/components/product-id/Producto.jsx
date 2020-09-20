import React,{ useState, useEffect } from 'react';
import {useParams}  from 'react-router-dom'
import styles from './producto.module.css'
import Rating from './Rating'
import { Button, Carousel } from 'react-bootstrap'
import axios from "axios"
import Reviews from '../reviews/reviews';
import {loadUserData} from '../../redux/actions/auth'
import { useSelector, useDispatch, connect } from 'react-redux'

function Producto ({userInfo}) {
    const [ productData, setProductData ] = useState({
        images:[]
    })

    const [updateStars, setupdateStars] = useState();
    
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
        getStars(id)
     } ,[]) 
    
    //Recibimos el id del usuario actual a  través del store
    const userID = userInfo.user_id
    
    const enviarACarrito = async (id,product_id,quantity,price) => { 
        await axios.post(`http://localhost:3001/users/${userID}/cart`, {
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

    const getStars = (id) => {
            
        axios.get(`http://localhost:3001/reviews/${id}`) 
        .then(response => {

            const sumaRating = response.data.map(x => {
                return x.rating})
            const suma = sumaRating.reduce((a, b) => {
                return a+b}) 
            const stars = Math.round(suma / response.data.length);
            setupdateStars(stars)   
            return stars
        })
        .then(stars => {
            axios.put(`http://localhost:3001/products/${id}`,{
                rating: stars
            })
        })
        .catch(error => {
            console.log(error);
        })
    }

    return (

        <div className='mt-4 col-md-12 '>
            <div className="card-header text-center">
                <h3>{productData.name}</h3>
                {/*<h3>actualID: {localStorage.getItem("actualUserId")}</h3>*/}
            </div>
            <div className="card-body">
                <div className="row">
                    
                    <Carousel className={styles.carousel}>
                        {productData.images.map(function(imagen){
                            return <Carousel.Item className={styles.carouselItem}><img className={styles.carouselImg} src={imagen.img_url}/></Carousel.Item>
                        })}
                    </Carousel>

                    <div className='product-data col-md-5 col-4'>
                        <div className="vertical-line"></div>
                        <p>{productData.description}</p>
                        <div>
                            <h2>${productData.price}</h2>
                        </div>
                        <i className='text-primary'><Rating rating={updateStars}/> </i>
                        <p>Garantía: {productData.warranty} días</p>
                        <h4>{productData.stock>0?'Stock Disponible': 'Sin Stock'}</h4>
                        {/*<Button className="col-md-5 col-12 mr-2" variant='comprar'  disabled={productData.stock<=0?'disabled':null}>Comprar</Button>*/}
                        <Button className={`col-md-5 col-12 ${styles.buttonCart}`} variant='info'  disabled={productData.stock<=0?'disabled':null} onClick={ 
                            () => enviarACarrito(userID,productData.product_id,1,productData.price)} >Añadir al Carrito</Button>
                    </div>
                </div>
            </div>
            <Reviews id={id} />
            <div className="card-footer">                
            </div>
        </div>
    )
}

const mapStateToProps = state => {
  
    return {
        
        userInfo : state.auth
    }
}
  
const mapDispatchToProps = (dispatch, props) => {
    return {
        
        loadUserData: () =>dispatch(loadUserData())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Producto)
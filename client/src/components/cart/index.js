import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import styles from './index.module.scss'
import { useSelector, useDispatch, connect } from 'react-redux'
import { fetchProducts, fetchUserCart, setId, changeQuantity } from '../../redux/actions/actions'
import axios from "axios";


function Cart({products}) {
    const dispatch = useDispatch()
    const [cant, setCant] = useState(1)
    const [idCarrito,setIdCarrito] = useState()
    
    const modificarCantidad = (cantidad, product_id) => {
        dispatch(changeQuantity(localStorage.getItem('actualUserId'), product_id, cantidad))
    }
    const idUser = localStorage.getItem("actualUserId");

    axios.get(`http://localhost:3001/users/${idUser}/cart`).then(response => {
        setIdCarrito(response.data.order_id)
        })


    useEffect(() => {
        dispatch(fetchUserCart())
        dispatch(setId(idCarrito))
    }, [])
    return (

    <div className={`${styles.card} offset-1 col-md-10 col-12 mt-3 pt-4 pb-4`}>
            <h4 className='text-center pb-3'>{ localStorage.getItem("actualUserName")}</h4>
            {products.length && products.map(product =>                 
               <div className='d-flex mb-4'>
                    <div className="imagen col-md-2 text-center d-flex align-items-center justify-content-center">
                        <img src={product.images[0].img_url} style={{height: '60px'}}/>
                    </div>
                    <div className="descripcion col-md-5 d-flex flex-column">
                        <h4 className='font-weight-bold'>{product.name}</h4>
                        <h5>{ product.description }</h5>
                    </div>
                    <div className="cantidad offset-1 col-md-2 text-center" style={{padding:0}}>
                        <div className="col-md-12 mb-1">
                            <Form.Control type="text" value={product.LineaDeOrden.quantity} className='text-center col-md-12' />
                        </div>
                        <div className="buttons">
                            <Button className={`${styles.masMenos}`} onClick={ e => product.LineaDeOrden.quantity > 1 && dispatch(changeQuantity(localStorage.getItem('actualUserId'), product.product_id, product.LineaDeOrden.quantity-1))}>-</Button>
                            <Button className={`${styles.masMenos}`} onClick={ e => dispatch(changeQuantity(localStorage.getItem('actualUserId'), product.product_id, product.LineaDeOrden.quantity+1))}>+</Button>
                        </div>
                        <Form.Text className="text-muted">Stock: {product.stock} </Form.Text>
                    </div>
                    <div className="precio col-md-2 d-flex align-items-center justify-content-center ">
                        <h3>${product.price*product.LineaDeOrden.quantity}</h3>
                    </div>                    
                </div> 
            )} 
            <span class="badge badge-primary badge-pill" className={`d-flex justify-content-end`} >
                <a href="/order" class="btn btn-warning font-weight-bold ">SIGUIENTE</a>            
            </span>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        products: state.cart.products.products || []
    }
}
  
const mapDispatchToProps = (dispatch, props) => {
return {
    fetchProducts: () => dispatch(fetchProducts()),
    fetchUserCart: () => dispatch(fetchUserCart())
}
}
    
export default connect(mapStateToProps, mapDispatchToProps)(Cart)
import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import styles from './index.module.scss'
import { useSelector, useDispatch, connect } from 'react-redux'
import { fetchProducts,fetchUserCart} from '../../redux/actions/actions'

function Cart({products}) {
    const dispatch = useDispatch()
    const [cant, setCant] = useState(1)
    const restaUno = () => {
        cant>0&&setCant(cant-1)
    }
    const sumaUno = () => {
        setCant(cant+1)
    }
    useEffect(() => {
        dispatch(fetchUserCart())
    }, [])


    return (

    <div className='card offset-2 col-md-8 col-12 mt-2 pt-4 pb-4'>

            <h4 className='text-center'>Carrito de { localStorage.getItem("actualUserName")}</h4>
            {products.length && products.map(product => 

               <div className='d-flex'>

                    <div className="imagen col-md-2">
                        <img src={product.image} style={{height: '100px'}}/>
                    </div>
                    <div className="descripcion col-md-4">
                        {product.description}
                    </div>
                    <div className="cantidad offset-1 col-md-2 text-center" style={{padding:0}}>
                        <div className="col-md-12 mb-1">
                            <Form.Control type="text" value={cant} className='text-center col-md-12' onChange={ e => setCant(parseInt(e.target.value))} />
                        </div>
                        <div className="buttons">
                            <Button variant='info' className={`${styles.masMenos}`} onClick={restaUno}>-</Button>
                            <Button variant='info' className={`${styles.masMenos}`} onClick={sumaUno}>+</Button>
                        </div>
                        <Form.Text className="text-muted">Stock: {product.stock - cant} </Form.Text>
                    </div>
                    <div className="precio col-md-2">
                        ${product.price*cant}
                    </div>                    
                </div> 
            )} 
            <span class="badge badge-primary badge-pill" className={`${styles.padre}`} >
                <a href="/order" class="btn btn-warning ">SIGUIENTE</a>            
            </span>
        </div>

        
        
    )



}

const mapStateToProps = state => {
    return {
        products: state.cart.products
    }
}
  
const mapDispatchToProps = (dispatch, props) => {
return {
    fetchProducts: () => dispatch(fetchProducts())
}
}
    
export default connect(mapStateToProps, mapDispatchToProps)(Cart)
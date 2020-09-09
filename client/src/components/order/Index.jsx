import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import styles from './index.module.scss'
import { useSelector, useDispatch, connect } from 'react-redux'
import { fetchProducts } from '../../redux/actions/actions'

function Order({products}) {
    const dispatch = useDispatch()
    const [cant, setCant] = useState(1)
    const restaUno = () => {
        cant>0&&setCant(cant-1)
    }
    const sumaUno = () => {
        setCant(cant+1)
    }
    useEffect(() => {
        dispatch(fetchProducts())
    }, [])
    return (
        <div className='card offset-2 col-md-8 col-12 mt-2 pt-4 pb-4'>
            <h4 className='text-center'>Carrito</h4>
            <hr/>
            {products.map(product => 
               <div className='d-flex'>
                    <div className="imagen col-md-2">
                        <img src={product.image} style={{height: '100px'}}/>
                    </div>
                    <div className="descripcion col-md-4">
                        descripcion
                    </div>
                    <div className="cantidad offset-1 col-md-2 text-center" style={{padding:0}}>
                        <div className="col-md-12 mb-1">
                            <Form.Control type="text" value={cant} className='text-center col-md-12' onChange={ e => setCant(parseInt(e.target.value))} />
                        </div>
                        <div className="buttons">
                            <Button variant='info' className={styles.masMenos} onClick={restaUno}>-</Button>
                            <Button variant='info' className={`${styles.masMenos}`} onClick={sumaUno}>+</Button>
                        </div>
                        <Form.Text className="text-muted">15 en Stock</Form.Text>
                    </div>
                    <div className="precio col-md-2">
                        $ 4.318 
                    </div>                    
                </div> 
            )}               
        </div>
    )
}

const mapStateToProps = state => {
    return {
        products: state.order.products
    }
}
  
const mapDispatchToProps = (dispatch, props) => {
return {
    fetchProducts: () => dispatch(fetchProducts())
}
}
    
export default connect(mapStateToProps, mapDispatchToProps)(Order)
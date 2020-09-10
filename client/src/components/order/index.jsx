import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import styles from './orderStyle.module.css'
import { useSelector, useDispatch, connect } from 'react-redux'
import { fetchProducts } from '../../redux/actions/actions_order'

function Order({products}) {
    const dispatch = useDispatch()
    const [cant, setCant] = useState(1)
 
    useEffect(() => {
        dispatch(fetchProducts())
    }, [])


    return ( 

        <div class="row">


        
            <div class="col-25">
                <div class="containerOrder">
                    <div class="row">

                        <div class="card text-center"  >
                             <div class="card-header">
                                Tu orden <span class="badge badge-primary badge-pill">{products.length}</span>
                            </div>

                            {products.map(product => 
                                <div class="card-body">

                                    <ul class="list-group">
                                      <li class="list-group-item d-flex justify-content-between align-items-center">
                                        {product.name}
                                        <span class="badge badge-primary badge-pill">{product.price}</span>
                                      </li>
                                    </ul>
                                </div>
                                 
                            )}
                                <h5 class="card-title">Total: </h5>
                                
                                <p class="card-title">
                                    <div class="input-group input-group-sm mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" id="inputGroup-sizing-sm">PROMO CODE</span>
                                        </div>
                                        <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                                    </div>
                                </p>


                                <div class="card-footer text-muted">
                                <a href="#" class="btn btn-primary">CONFIRMAR</a>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
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
    
export default connect(mapStateToProps, mapDispatchToProps)(Order)
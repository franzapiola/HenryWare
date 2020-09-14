import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import styles from './orderStyle.module.css'
import { useSelector, useDispatch, connect } from 'react-redux'
import { fetchProducts,fetchUserCart,setId} from '../../redux/actions/actions'
import axios from "axios"
import { Link,useHistory } from 'react-router-dom';


function Order({products}) {
    const dispatch = useDispatch()
    const history = useHistory()
    const [cant, setCant] = useState(1)
    
    const [idCarrito,setIdCarrito] = useState()
    const idUser = localStorage.getItem("actualUserId");

    axios.get(`http://localhost:3001/users/${idUser}/cart`)
    .then(response => {
            setIdCarrito(response.data.order_id)
         })

    console.log("[+]id carrito: " +idCarrito)
 
    useEffect(() => {
        dispatch(fetchUserCart())
        dispatch(setId(idCarrito)) 
    }, [])

    function handleSubmit(e) {
      e.preventDefault()
      
       axios.put(`http://localhost:3001/orders/${idCarrito}`,{
          state : "Completa"
        }).then(() => history.push("/"))

    }



    return ( 
        <div className={styles.containerOrder}>
            <div className="py-5 text-center">
                 <h2>Ya casi estamos!</h2>
                <p className="lead">Completa tus datos para terminar con la compra</p>
            </div>
            <div className="row">
                <div className="col-md-4 order-md-2 mb-4">
                    <h4 className="d-flex justify-content-between align-items-center mb-3">
                        <span className="text-muted">Tus productos</span>
                        <span className="badge badge-secondary badge-warning">{products.length} </span>
                    </h4>

                    <ul className="list-group mb-3">
                        {products.length && products.map(product => 
                            <li className="list-group-item d-flex justify-content-between lh-condensed">
                              <div>
                                <h6 className="my-0">{product.name}</h6>
                                
                              </div>
                              <span className="text-muted">${product.price}</span>
                            </li>
                        )}
                        
                        


                        <li className="list-group-item d-flex justify-content-between">
                          <span>Total (pesos)</span>
                          <strong>$PRECIO TOTAL</strong>
                        </li>
                    </ul>
                     <form className="card p-2">
                        <div className="input-group">
                          <input type="text" className="form-control" placeholder="Promo code"/>
                          <div className="input-group-append">
                            <button type="submit" className="btn btn-secondary">Aplicar promo</button>
                          </div>
                        </div>
                      </form>
                </div>
                <div className="col-md-8 order-md-1">
                <h4 className="mb-3">Información de facturación</h4>
      <form className="needs-validation" onSubmit={handleSubmit} >
        <div className="row">
          <div className="col-md-6 mb-3">
            <label for="firstName">Nombre</label>
            <input type="text" className="form-control" id="firstName" placeholder="ingresa tu nombre"  required />
            <div className="invalid-feedback">
              Ingresa tu nombre.
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <label for="lastName">Apellido</label>
            <input type="text" className="form-control" id="lastName" placeholder="ingresa tu apellido" required/>
            <div className="invalid-feedback">
              Tu apellido es necesario.
            </div>
          </div>
        </div>

        <div className="mb-3">
          <label for="username">Nombre de usuario</label>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">@</span>
            </div>
            <input type="text" className="form-control" id="username" placeholder="Nombre de usuario" required/>
            <div className="invalid-feedback" style={{"width": "100%;"}}>
              Tu nombre de usuario es importante!.
            </div>
          </div>
        </div>

        <div className="mb-3">
          <label for="email">Email <span className="text-muted">(Opcional)</span></label>
          <input type="email" className="form-control" id="email" placeholder="herny@gmail.com"/>
          <div className="invalid-feedback">
            Ingresa una dirección de email válida.
          </div>
        </div>

        <div className="mb-3">
          <label for="address">Dirección</label>
          <input type="text" className="form-control" id="direccion" placeholder="Av. Luis Maria Campos 1053" required/>
          <div className="invalid-feedback">
            Por favor ingresa una direción válida.
          </div>
        </div>

        <div className="mb-3">
            <label for="Piso">Piso/Departamento</label>
            <input type="text" className="form-control" id="piso" placeholder="5/H" />
        </div>

       
        <h4 className="mb-3">Forma de Pago</h4>

        <div className="d-block my-3">
          <div className="custom-control custom-box">
            <input id="credit" name="paymentMethod" type="radio" className="custom-control-input" required/>
            <label className="custom-control-label" for="credit">Tarjeta de crédito</label>
          </div>
          <div className="custom-control custom-box">
            <input id="debit" name="paymentMethod" type="radio" className="custom-control-input" required/>
            <label className="custom-control-label" for="debit">Tarjeta de débito</label>
          </div>
          <div className="custom-control custom-box">
            <input id="paypal" name="paymentMethod" type="radio" className="custom-control-input" required/>
            <label className="custom-control-label" for="paypal">PayPal</label>
          </div>
          <div className="custom-control custom-box">
            <input id="efectivo" name="paymentMethod" type="radio" className="custom-control-input" required/>
            <label className="custom-control-label" for="efectivo">Efectivo en la entrega</label>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label for="cc-name">Nombre en la Tarjeta</label>
            <input type="text" className="form-control" id="cc-name" placeholder="" required/>
            <small className="text-muted">Tu nombre como figura en la Tarjeta</small>
            <div className="invalid-feedback">
              Completa tu nombre.
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <label for="cc-number">Numero de Tarjeta</label>
            <input type="text" className="form-control" id="cc-number" placeholder="" required/>
            <div className="invalid-feedback">
              Importante!
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3 mb-3">
            <label for="cc-expiration">Fecha de expiración (MM/AA)  </label>
            <input type="text" className="form-control" id="cc-expiration" placeholder="" required/>
            <div className="invalid-feedback">
              Fecha de expiración requerida.
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <label for="cc-cvv">CVV</label>
            <input type="text" className="form-control" id="cc-cvv" placeholder="" required/>
            <div className="invalid-feedback">
              Código de seguridad requerido.
            </div>
          </div>
        </div>
        <hr className="mb-4"/>
        <button className="btn btn-warning btn-lg btn-block" type="submit">Finalizar compra</button>
      </form> 
      </div></div>
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
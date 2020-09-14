import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import styles from './orderStyle.module.css'
import { useSelector, useDispatch, connect } from 'react-redux'
import { fetchProducts,fetchUserCart } from '../../redux/actions/actions'
import store from '../../redux/store'


function Order(props) {
    const dispatch = useDispatch()
    const [cant, setCant] = useState(1)
 
    useEffect(() => {
        dispatch(fetchUserCart())
    }, [])

    
    const id_order = props.id_order;

    const handleSubmit = (e) => {

      console.log(store)

      
      e.preventDefault();
      //envio datos al servidor
      const result = fetch(`http://localhost:3001/orders/${id_order}`, {
          method: 'PUT',
          body: {
            state: 'Procesando'

          },
          headers: {
              'Content-Type': 'application/json'
          }
      })
      result.then(() => {
        console.log('enviado')
      })
      

  }


    return ( 
        <div className={styles.containerOrder}>
            <div class="py-5 text-center">
                 <h2>Ya casi estamos!</h2>
                <p class="lead">Completa tus datos para terminar con la compra</p>
            </div>
            <div class="row">
                <div class="col-md-4 order-md-2 mb-4">
                    <h4 class="d-flex justify-content-between align-items-center mb-3">
                        <span class="text-muted">Tus productos</span>
                        <span class="badge badge-secondary badge-warning">{props.products.length} </span>
                    </h4>

                    <ul class="list-group mb-3">
                        {props.products.length && props.products.map(product => 
                            <li class="list-group-item d-flex justify-content-between lh-condensed">
                              <div>
                                <h6 class="my-0">{product.name}</h6>
                                
                              </div>
                              <span class="text-muted">${product.price}</span>
                            </li>
                        )}
                        
                        


                        <li class="list-group-item d-flex justify-content-between">
                          <span>Total (pesos)</span>
                          <strong>$PRECIO TOTAL</strong>
                        </li>
                    </ul>
                     <form class="card p-2">
                        <div class="input-group">
                          <input type="text" class="form-control" placeholder="Promo code"/>
                          <div class="input-group-append">
                            <button type="submit" class="btn btn-secondary">Aplicar promo</button>
                          </div>
                        </div>
                      </form>
                </div>
                <div class="col-md-8 order-md-1">
                <h4 class="mb-3">Información de facturación</h4>
      <form class="needs-validation" novalidate onSubmit={() => handleSubmit()}>
        <div class="row">
          <div class="col-md-6 mb-3">
            <label for="firstName">Nombre</label>
            <input type="text" class="form-control" id="firstName" placeholder="ingresa tu nombre"  required />
            <div class="invalid-feedback">
              Ingresa tu nombre.
            </div>
          </div>
          <div class="col-md-6 mb-3">
            <label for="lastName">Apellido</label>
            <input type="text" class="form-control" id="lastName" placeholder="ingresa tu apellido" required/>
            <div class="invalid-feedback">
              Tu apellido es necesario.
            </div>
          </div>
        </div>

        <div class="mb-3">
          <label for="username">Nombre de usuario</label>
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">@</span>
            </div>
            <input type="text" class="form-control" id="username" placeholder="Nombre de usuario" required/>
            <div class="invalid-feedback" style={{"width": "100%;"}}>
              Tu nombre de usuario es importante!.
            </div>
          </div>
        </div>

        <div class="mb-3">
          <label for="email">Email <span class="text-muted">(Opcional)</span></label>
          <input type="email" class="form-control" id="email" placeholder="herny@gmail.com"/>
          <div class="invalid-feedback">
            Ingresa una dirección de email válida.
          </div>
        </div>

        <div class="mb-3">
          <label for="address">Dirección</label>
          <input type="text" class="form-control" id="direccion" placeholder="Av. Luis Maria Campos 1053" required/>
          <div class="invalid-feedback">
            Por favor ingresa una direción válida.
          </div>
        </div>

        <div class="mb-3">
            <label for="Piso">Piso/Departamento</label>
            <input type="text" class="form-control" id="piso" placeholder="5/H" />
        </div>

       
        <h4 class="mb-3">Forma de Pago</h4>

        <div class="d-block my-3">
          <div class="custom-control custom-box">
            <input id="credit" name="paymentMethod" type="radio" class="custom-control-input" required/>
            <label class="custom-control-label" for="credit">Tarjeta de crédito</label>
          </div>
          <div class="custom-control custom-box">
            <input id="debit" name="paymentMethod" type="radio" class="custom-control-input" required/>
            <label class="custom-control-label" for="debit">Tarjeta de débito</label>
          </div>
          <div class="custom-control custom-box">
            <input id="paypal" name="paymentMethod" type="radio" class="custom-control-input" required/>
            <label class="custom-control-label" for="paypal">PayPal</label>
          </div>
          <div class="custom-control custom-box">
            <input id="efectivo" name="paymentMethod" type="radio" class="custom-control-input" required/>
            <label class="custom-control-label" for="efectivo">Efectivo en la entrega</label>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6 mb-3">
            <label for="cc-name">Nombre en la Tarjeta</label>
            <input type="text" class="form-control" id="cc-name" placeholder="" required/>
            <small class="text-muted">Tu nombre como figura en la Tarjeta</small>
            <div class="invalid-feedback">
              Completa tu nombre.
            </div>
          </div>
          <div class="col-md-6 mb-3">
            <label for="cc-number">Numero de Tarjeta</label>
            <input type="text" class="form-control" id="cc-number" placeholder="" required/>
            <div class="invalid-feedback">
              Importante!
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-3 mb-3">
            <label for="cc-expiration">Fecha de expiración (MM/AA)  </label>
            <input type="text" class="form-control" id="cc-expiration" placeholder="" required/>
            <div class="invalid-feedback">
              Fecha de expiración requerida.
            </div>
          </div>
          <div class="col-md-3 mb-3">
            <label for="cc-cvv">CVV</label>
            <input type="text" class="form-control" id="cc-cvv" placeholder="" required/>
            <div class="invalid-feedback">
              Código de seguridad requerido.
            </div>
          </div>
        </div>
        <hr class="mb-4"/>
        <button class="btn btn-warning btn-lg btn-block" type="submit" > Finalizar compra</button>
      </form> 
      <button onClick={() => {console.log(store.getState())}}></button>
      </div></div>
       </div>
     
        )
        

}


const mapStateToProps = state => {
    return {
        products: state.cart.products,
        id_order: state.cart.id_order
    }
}
  
const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchProducts: () => dispatch(fetchProducts())
    }
}
    
export default connect(mapStateToProps, mapDispatchToProps)(Order)
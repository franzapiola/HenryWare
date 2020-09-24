import React, { useEffect, useState } from 'react'
import Order from './index'
import Cart from './../cart'
import {  useDispatch, connect } from 'react-redux'
import { fetchOrders, changeStatus, fetchOrdersFilter, fetchOrdersId, fetchOrdersUserId } from '../../redux/actions/Orders'
import Select from 'react-select'
import {useHistory} from 'react-router-dom'
import s from './orderStyle.module.css'
import { AiOutlineSearch, AiOutlineStop} from "react-icons/ai"
import { TextField, Button } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Selectt from '@material-ui/core/Select';


function OrdersTable(props) {

    const {user, isFetching, orders} = props
    const history = useHistory()
    if(isFetching === false && user.role != "admin"){
         history.push("/404")
    }   

    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(fetchOrders())
    }, [])
    
    const status = [
        { value: 'Carrito', label:'Carrito' },
        { value: 'Creada', label: 'Creada'},
        { value: 'Procesando', label: 'Procesando'},
        { value: 'Cancelada', label: 'Cancelada'},
        { value: 'Completa', label: 'Completa'},

    ];

    const [input, setInput] = useState('');
    const [InputUser, setInputUser] = useState('');
 


    const filterState = (state) => {
        dispatch(fetchOrdersFilter(state))
    }
    
    const filterId = () => {
        if(input){
        dispatch(fetchOrdersId(input))
        setInput('')}
    }

    const filterUserId = () => {
        if(InputUser){
        dispatch(fetchOrdersUserId(InputUser))
        setInputUser('')}
    }

    console.log(orders)
   


    return (

        <div className='col-md-10 offset-1 mt-3'>
            <div className={s.filter}>
                <div className={s.select} >
                <FormControl className={s.state} >
                    <InputLabel id="demo-simple-select-label">
                    Estado </InputLabel>
                    <Selectt
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value='' 
                    onChange={e=> filterState(e.target.value)}
                    >
                    <MenuItem value="Carrito" >Carrito</MenuItem>
                    <MenuItem value="Creada" >Creada</MenuItem>
                    <MenuItem value="Procesando" >Procesando</MenuItem>
                    <MenuItem value="Cancelada" >Cancelada</MenuItem>
                    <MenuItem value="Completa">Completa</MenuItem>
                    </Selectt>
                </FormControl>
                </div>
                <div>
                    <TextField 
                    id="standard-basic" 
                    label="Id orden" 
                    onChange={(e) => setInput(e.target.value)}
                    value={input}
                    className={s.input}
                    type="number"
                    />
                    <AiOutlineSearch className={s.lupa} onClick={() => filterId()}/>
                 </div>
                <div>
                    <TextField 
                    id="standard-basic" 
                    label="Id usuario" 
                    onChange={(e) => setInputUser(e.target.value)}
                    value={InputUser}
                    className={s.input}
                    type="number"
                    />
                    <AiOutlineSearch className={s.lupa} onClick={() => filterUserId()} />
                   
                </div>
                <div className={s.button}>
                <Button onClick={e=> dispatch(fetchOrders())} className={s.b}><b>| Restablecer |</b> </Button>
                </div>
            </div>

            <hr/>

           

            <div >
                <table className='table table-striped table-hover table-collapse'>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Estado</th>
                            <th>Email</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>INFO</th>
                        </tr>
                    </thead>
                    <tbody>                        
                        {orders.orders.map(order => (
                            <tr key={order.order_id}>
                                <td>{order.order_id}</td>
                                <td className='font-weight-bold'>
                                <Select
                                    defaultValue={{value:order.state, label:order.state}}
                                    isLoading={orders.isFetching}
                                    isDisabled={orders.isFetching}
                                    isClearable={false}
                                    isSearchable
                                    name="color"
                                    options={status}
                                    onChange={e=>dispatch(changeStatus(e.value, order.order_id))}
                                />
                                </td>
                                <td>{order.user.email}</td>
                                <td>{order.user.first_name}</td>
                                <td>{order.user.last_name}</td>
                                <td><a href={`/orders/table/${order.order_id}`} className="btn btn-primary"> +</a></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
                {orders.orders.length === 0 ?
                 <div className={s.divv}> <AiOutlineStop className={s.i}/> <div>No existe una orden con esas caracteristicas
                    </div>
                    </div>
                    : '' }
                
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        orders: state.Orders,
        user: state.auth.user,
        isFetching: state.auth.isFetching
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchOrders: () => dispatch(fetchOrders())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrdersTable)
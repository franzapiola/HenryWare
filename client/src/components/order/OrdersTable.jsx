import React, { useEffect } from 'react'
import Order from './index'
import Cart from './../cart'
import {  useDispatch, connect } from 'react-redux'
import { fetchOrders, changeStatus } from '../../redux/actions/Orders'
import Select from 'react-select'
import {useHistory} from 'react-router-dom'


function OrdersTable(props) {

    const {user,orders} = props
    const history = useHistory()
    if(user.role != "admin"){
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

    ]
    return (

        <div className='col-md-10 offset-1 mt-3'>
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
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        orders: state.Orders,
        user: state.User
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchOrders: () => dispatch(fetchOrders())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrdersTable)
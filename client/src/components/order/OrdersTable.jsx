import React, { useEffect, useState } from 'react'
import Order from './index'
import Cart from './../cart'
import { useSelector, useDispatch, connect } from 'react-redux'
import { fetchOrders } from '../../redux/actions/Orders'
import { fetchUser } from '../../redux/actions/User'
import Select from 'react-select'

function OrdersTable({ orders }) {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchOrders())
    }, [])

    return (
        <div className='col-md-10 offset-1'>
            <div >
                <table className='table table-striped table-collapse'>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Estado</th>
                            <th>Email</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.orders.map(order => (
                            <tr>
                                <td>{order.order_id}</td>
                                <td className='font-weight-bold'>
                                    {order.state}
                                </td>
                                <td>{order.user.email}</td>
                                <td>{order.user.first_name}</td>
                                <td>{order.user.last_name}</td>
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
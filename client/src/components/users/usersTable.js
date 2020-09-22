import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import {useHistory} from 'react-router-dom'
import axios from "axios"
import { connect } from 'react-redux'


function UsersTable(props) {

    //para comprobar que sea admin
    const {user} = props

    //const [users,setUsers] = useState()

    const history = useHistory()
    /*if(user.role != "admin"){
         history.push("/404")
    }   */

    const getUsuarios = () => {
        axios.get("http://localhost:3001/users")
        .then(response => {
            console.log(response.data)
            return(response.data)
        })
    }

    /*useEffect( () => {
        usuarios()        
    }, [])*/

   
    return (
        
        <div className='col-md-10 offset-1 mt-3'>
            
            <div >
                <table className='table table-striped table-hover table-collapse'>
                    <thead>
                        <tr>
                            <th>ID usuario</th>
                            <th>Email</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Role</th>
                            <th>Promote</th>
                        </tr>
                    </thead>
                    <tbody>
                        { 


                        /*orders.orders.map(order => (
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
                        ))*/}
                    </tbody>
                </table>
            </div>
        </div>
    )
}


const mapStateToProps = state => {
    return {
        user: state.User
    }
}

export default connect(mapStateToProps)(UsersTable)
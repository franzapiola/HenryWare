import React, { useEffect } from 'react'
import {  useDispatch, connect } from 'react-redux'
import Select from 'react-select'
import { Button } from 'react-bootstrap'
import {useHistory} from 'react-router-dom'

import axios from "axios"
import {addUsers,requestUsers} from '../../redux/actions/users_info'


function UsersTable(props) {
    const {user, isFetching, usersTable, requestUsers} = props
    const history = useHistory()
    //comprobamos que el usuario tenga privilegios de ADMIN
    if(!isFetching && user.role != "admin"){
         history.push("/404");
    }


    const promote = async (userId,oldRole) =>{
        let newRole = "admin";
        if(oldRole == "admin") newRole = "user";
        await axios.put(`http://localhost:3001/users/${userId}`,{
            role : newRole
        })
        .then(requestUsers)
        .catch(err => console.log('error al promover a admin',err));
    }

    const deleteUser = async (userId) =>{
        await axios.delete(`http://localhost:3001/users/${userId}`)
        .then(requestUsers)
        .catch(err => console.log('error al borrar usuario', err));
    }

    useEffect(() =>{
        requestUsers();
    },[])

    return (

        <div className='col-md-10 offset-1 mt-3'>
            <div >
                <table className='table table-striped table-hover table-collapse'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th></th>
                            <th>Órdenes</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                       {
                        usersTable.users.length && usersTable.users.map( user => ( 
                                 <tr>
                                    <td>{user.user_id}</td>
                                    <td>{user.first_name}</td>
                                    <td>{user.last_name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td> <Button style={{borderRadius: '25px'}} className={user.role === 'admin' ? "btn btn-danger" : "btn btn-success"} onClick={() => promote(user.user_id,user.role)} > {user.role === 'admin' ? 'Degradar' : 'Promover'} </Button></td>
                                    <td> <a className="btn btn-info" style={{borderRadius: '25px'}}>Ver...</a> </td>
                                    <td> <Button className="btn btn-danger" style={{borderRadius: '25px'}} onClick={() => deleteUser(user.user_id)} > X </Button></td> 
                                </tr>
                                ))
                        }   
                        
                    </tbody>
                </table>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        usersTable : state.usersInfo,
        user: state.auth.user,
        isFetching: state.auth.isFetching
    }
}

const mapDispatchToProps = dispatch => {
    return {
        requestUsers : () => dispatch(requestUsers())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersTable)
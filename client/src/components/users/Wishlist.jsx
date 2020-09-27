import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import {  Button } from '@material-ui/core';

//Redux
import { fetchUserCart } from '../../redux/actions/cart'
import { connect } from 'react-redux';


const Wishlist = props => {
    const history = useHistory();

    const { user, isFetching, fetchUserCart } = props;
    if(!isFetching && user.role === 'Guest'){
        history.push('/');
    }

    const [ products, setProducts ] = useState([]);

    const getWishlist = () => {
        axios.get(`http://localhost:3001/users/${user.user_id}/wishlist`)
        .then(resp => setProducts(resp.data))
        .catch(err => {if(!isFetching)console.log('ERROR AL TRAER WISHLIST', err)});
    }

    const enviarACarrito =  (product_id,quantity,price) => {        
        axios.post(`http://localhost:3001/users/${user.user_id}/cart`, {
            product_id : product_id,
            quantity : quantity, 
            price : price,
        })
        .then( () => {
            fetchUserCart(user.user_id);
        })
        .catch(error => {
            console.log(error);
        });
    }

    const eliminarDeWishlist = product_id => {
        axios({
            method: 'DELETE',
            url: `http://localhost:3001/users/${user.user_id}/wishlist`,
            data: {
                product_id
            }
        })
        .then(respuesta => setProducts(respuesta.data))
        .catch(err => console.log('ERROR AL ELIMINAR PRODUCTO DE LA WISHLIST:', err));
    }

    useEffect(()=>{
        if(!isFetching) getWishlist();
    }, [isFetching]);

    return (
        <div>
            <table>
                <thead>
                </thead>
                <tbody>
                    {products.length ? products.map( p => 
                        <tr key={p.product_id}>
                            <td>
                                <img src={p.images[0].img_url} alt={p.name}/>
                            </td>
                            <td><Link to={`/products/${p.product_id}`}>{p.name}</Link> {p.price}</td>
                            <td>
                                <Button
                                    onClick={() => enviarACarrito(p.product_id, 1, p.price)}
                                >
                                    Agregar al carrito
                                </Button>
                                <Button
                                    onClick={() => {
                                        console.log('PRODUCTO:', p)
                                        eliminarDeWishlist(p.product_id)
                                    }}
                                >
                                    X
                                </Button>
                            </td>
                        </tr>
                    ) : null}
                </tbody>
            </table>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        isFetching: state.auth.isFetching
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchUserCart: user_id => dispatch(fetchUserCart(user_id))
    }
}

export default connect(mapStateToProps, null)(Wishlist);
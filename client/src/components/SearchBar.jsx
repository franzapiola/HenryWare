import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Navbar, Button, NavDropdown } from 'react-bootstrap'
import './navbar.css'
import img from './Logo largo.svg'

import store from '../redux/store'
import {connect} from 'react-redux';
import { search, selectCategory, selectAll } from '../redux/actions/main'

const SearchBar = (props) => {
    const { getProducts, categories } = props;

    //Redux
    const {searchInput, search, selectCategory, selectAll} = props;
    //Este estado almacena el contenido del input
    const history = useHistory();
    const handleSubmit = (e) => {
        e.preventDefault();
        search(searchInput);
        getProducts();
        history.push('/products')
    }
    // console.log(props)
    return (
        <Navbar className="navbar" >
            <Link to='/'><img className="brand" src={img} /></Link>


            <div className="search-bar">
                <div className="button-navbar">
                    <Link className="navbutton" to='/products' onClick={selectAll}>Catálogo</Link>
                </div>

            <NavDropdown title={<span className="navbutton" > Categorias </span>} >
                        {categories.map(c => <NavDropdown.Item onClick={()=>{
                            selectCategory(c.name);
                            history.push('/products');
                        }} style={{color: 'white'}}> {c.name} </NavDropdown.Item>)}
            </NavDropdown>
            <form onSubmit={(e)=>{handleSubmit(e);}}>
                <input value={searchInput} type='text' placeholder='Busca un producto...' onChange={(e)=>{
                                                                                            search(e.target.value);
                                                                                            getProducts();
                                                                                            //Este getProducts hace que la búsqueda sea "instantánea" pero
                                                                                            //es bastante pesado, quiza haya que sacarlo más adelante
                                                                                            }}/>
                <Button className="nav-submit" type='submit'>Buscar</Button>
            </form>
            </div>


            
            <div className='login-navbar'>
            <div><Link className='navbutton-login' to='/login'>Iniciar Sesion</Link></div>
            <div><Link className='navbutton-login' to='/signin'>Registrarse</Link></div>
            </div>

            <div className='navbar-cart'>
            <NavDropdown title={
                <span className="navbutton-cart"> 
                    <svg width="2em" height="2em" viewBox="0 0 16 16" className="bi bi-border-width" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                         <path d="M0 3.5A.5.5 0 0 1 .5 3h15a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5H.5a.5.5 0 0 1-.5-.5v-2zm0 5A.5.5 0 0 1 .5 8h15a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H.5a.5.5 0 0 1-.5-.5v-1zm0 4a.5.5 0 0 1 .5-.5h15a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5z"/>
                    </svg>
                </span>
            }>
                <NavDropdown.Item><Link to="/profile"> Perfil </Link></NavDropdown.Item>
                <NavDropdown.Item><Link to="/products/edit">Agregar Producto</Link></NavDropdown.Item>
                <NavDropdown.Item><Link to="/products/categories/addcategory">Agregar categoría</Link></NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item> <Link to="/disconnect">Cerrar Sesión</Link> </NavDropdown.Item>
                
            </NavDropdown>
            <Link className="navbutton-cart" to="/cart">
                    
                    <svg width="2em" height="2em" viewBox="0 0 16 16" className="bi bi-cart4" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"/>
                    </svg>
            </Link>
            
            </div>
            {/* <Link>Iniciar sesión</Link>
            <NavDropdown title='Mi cuenta'>
                <NavDropdown.Item>Perfil</NavDropdown.Item>
                <NavDropdown.Item>Historial de compras</NavDropdown.Item>
            </NavDropdown>
            <Link>¿Quiénes somos?</Link> */}
        </Navbar>
    );
}

const mapStateToProps = state => {
    return {
        searchInput: state.main.searchInput
    }
};

const mapDispatchToProps = dispatch => {
    return {
        search: (input) => dispatch(search(input)),
        selectCategory: (category) => dispatch(selectCategory(category)),
        selectAll: () => dispatch(selectAll())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
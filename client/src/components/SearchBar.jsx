import React, { useState } from 'react';
import {withRouter, Link} from 'react-router-dom';
import { Navbar, Button, NavDropdown } from 'react-bootstrap'
import  './navbar.css'
import img from './Logo largo.svg'

const SearchBar = (props) => {
    //Este estado almacena el contenido del input
    const [search, setSearch] = useState('');
    const { onSearch } = props;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(e, search, props);
        setSearch('');
    }
    
    return (
        <Navbar className="navbar" >
            
            <Link to='/'><img className="brand" src={img}/></Link>

            <div className="search-bar">

            <div className="button-navbar"> 
            <Link className="navbutton" to='/products'>Catálogo</Link>
            <NavDropdown  title={<span className="navbutton">Administrar</span>}>
            <NavDropdown.Item><Link to='/products/edit'><div>Productos</div></Link></NavDropdown.Item>
                <NavDropdown.Item><Link to='/products/categories/addcategory'>Agregar una nueva categoría</Link></NavDropdown.Item>
            </NavDropdown>
            </div>
            <form onSubmit={(e)=>{handleSubmit(e);}}>
                <input value={search} type='text' placeholder='Busca un producto...' onChange={(e)=>setSearch(e.target.value)}/>                
                <Button className="nav-submit" type='submit'>Buscar</Button>
            </form>
            </div>
            <div>
                <Link to='/order'>
                    <svg width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-cart4" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
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

export default withRouter(SearchBar);
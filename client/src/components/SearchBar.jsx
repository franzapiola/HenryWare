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
            <NavDropdown title={<span className="navbutton"> Mi Cuenta</span>}>
                <NavDropdown.Item><Link to="/profile"> Perfil </Link></NavDropdown.Item>
                <NavDropdown.Item><Link to="/order"> Carrito </Link></NavDropdown.Item>
                <NavDropdown.Item> <Link to="/profile/payment_methods">Metodos de Pago</Link> </NavDropdown.Item>
            </NavDropdown>
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
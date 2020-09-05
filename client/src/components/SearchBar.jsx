import React, { useState } from 'react';
import {withRouter, Link} from 'react-router-dom';
import { Navbar, Button, NavDropdown } from 'react-bootstrap'
import Style from './navbar.css'

const SearchBar = (props) => {
    //Este estado almacena el contenido del input
    const [search, setSearch] = useState('');
    const { onSearch } = props;
    return (
        <Navbar className="navbar" >
            
            <Link to='/'><img className="brand" src="https://http2.mlstatic.com/porcellanato-eco-ipe-madera-25x100-1ra-calidad-elizabeth-D_Q_NP_735225-MLA31114916244_062019-F.webp"/></Link>

            <div className="search-bar">

            <div className="button-navbar"> 
            <Link className="navbutton" to='/products'>Catálogo</Link>
            <NavDropdown  title={<span className="navbutton">Administrar</span>}>
                <NavDropdown.Item><Link to='/products/edit'>Productos</Link></NavDropdown.Item>
                <NavDropdown.Item><Link to='/products/categories/addcategory'>Agregar una nueva categoría</Link></NavDropdown.Item>
            </NavDropdown>
            </div>

            <form onSubmit={(e)=>{onSearch(e, search, props)}}>
                <input type='text' placeholder='Busca un producto...' onChange={(e)=>setSearch(e.target.value)}/>
                
                <Button variant='warning' type='submit'>Buscar</Button>
            </form>
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
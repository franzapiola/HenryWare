import React, { useState } from 'react';
import {withRouter, Link} from 'react-router-dom';
import { Navbar, Button, NavDropdown } from 'react-bootstrap'

const SearchBar = (props) => {
    //Este estado almacena el contenido del input
    const [search, setSearch] = useState('');
    const { onSearch } = props;
    return (
        <Navbar bg='dark' >
            <form onSubmit={(e)=>{onSearch(e, search, props)}}>
                <input type='text' placeholder='Busca un producto...' onChange={(e)=>setSearch(e.target.value)}/>
                
                <Button variant='warning' type='submit'>Buscar</Button>
            </form>
            <Link to='/products'>Catálogo</Link>
            <NavDropdown title='Administrar'>
                <NavDropdown.Item><Link to='/products/edit'>Productos</Link></NavDropdown.Item>
                <NavDropdown.Item><Link to='/products/categories/addcategory'>Agregar una nueva categoría</Link></NavDropdown.Item>
            </NavDropdown>

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
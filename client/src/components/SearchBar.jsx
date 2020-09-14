import React, { useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Navbar, Button, NavDropdown, Nav } from 'react-bootstrap'
import './navbar.css'
import img from './Logo largo.svg'
import styles from './searchBar.module.scss'

const SearchBar = (props) => {
    //Este estado almacena el contenido del input
    const [search, setSearch] = useState('');
    const { onSearch } = props;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(e, search, props);
        setSearch('');
    }
    // console.log(props)
    return (
        <Navbar className="navbar d-flex flex-wrap pt-2 h-auto" >

            <div className="up col-md-12 d-flex justify-content-center">
                <Link to='/' className='mr-4'><img className="brand" src={img} /></Link>
                <form onSubmit={(e) => { handleSubmit(e); }}>
                    <input value={search} type='text' placeholder='Busca un producto...' onChange={(e) => setSearch(e.target.value)} />
                    <Button className="nav-submit" type='submit'>Buscar</Button>
                </form>
            </div>
            <div className="down h-auto d-flex col-md-12">
                <div className="catalogo col-md-10 offset-1 d-flex justify-content-center">
                    <Link to='/products' className={`navbutton ${styles.navbarLink}`}>Catálogo</Link>
                    <NavDropdown title="Categorias" className='navbutton' style={{color: 'white'}}>
                        <NavDropdown.Item> <span>Categoria1</span></NavDropdown.Item>
                        <NavDropdown.Item> <span>Categoria1</span></NavDropdown.Item>
                        <NavDropdown.Item> <span>Categoria1</span></NavDropdown.Item>
                        <NavDropdown.Item> <span>Categoria1</span></NavDropdown.Item>
                    </NavDropdown>
                    <Link className={`navbutton ${styles.navbarLink}`} to='/login'>Iniciar Sesion</Link>
                    <Link className={`navbutton ${styles.navbarLink}`} to='/signin'>Registrarse</Link>
                    <Link className={`navbutton ${styles.navbarLink}`} to="/cart">
                        <svg width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-cart4" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
                        </svg>
                    </Link>
                    <NavDropdown className="navbutton-cart" title={
                            <span>Administrar <svg width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-border-width" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 3.5A.5.5 0 0 1 .5 3h15a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5H.5a.5.5 0 0 1-.5-.5v-2zm0 5A.5.5 0 0 1 .5 8h15a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H.5a.5.5 0 0 1-.5-.5v-1zm0 4a.5.5 0 0 1 .5-.5h15a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5z" />
                            </svg></span>
                    }>
                        <NavDropdown.Item><Link to="/profile"> Perfil </Link></NavDropdown.Item>
                        <NavDropdown.Item><Link to="/products/edit">Crud de productos</Link></NavDropdown.Item>
                        <NavDropdown.Item><Link to="/products/categories/addcategory">Crud de categorías</Link></NavDropdown.Item>
                        <NavDropdown.Item><Link to="/orders/table">Listado de ordenes</Link></NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item> <Link to="/disconnect">Cerrar Sesión</Link> </NavDropdown.Item>
                    </NavDropdown>
                </div>
            </div>
        </Navbar>
    );
}

export default withRouter(SearchBar);
import React, { useState } from 'react';
import {withRouter} from 'react-router-dom';
import { Navbar, Button, NavDropdown } from 'react-bootstrap'

const SearchBar = (props) => {
    //Este estado almacena el contenido del input
    const [search, setSearch] = useState('');
    const { onSearch } = props;
    return (
        <Navbar bg='dark' >
            <form onSubmit={(e)=>{onSearch(e, search, props)}}>
                <input type='text' placeholder='Busca un producto...' onChange={(e)=>setSearch(e.target.value)}/>
                
                <Button variant='warning' type='submit'> Buscar </Button>
            </form>

        
        </Navbar>
        
    );
}

export default withRouter(SearchBar);
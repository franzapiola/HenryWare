import React, { useState } from 'react';

const SearchBar = (props) => {
    //Este estado almacena el contenido del input
    const [search, setSearch] = useState('');
    const { onSearch } = props;
    return (
        <div>
            <form onSubmit={(e)=>{onSearch(e, search)}}>
                <input type='text' placeholder='Busca un producto...' onChange={(e)=>setSearch(e.target.value)}/>
                <button type='submit'> Buscar </button>
            </form>
        </div>
    );
}

export default SearchBar;
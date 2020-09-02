import React, { useState } from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom'

import Catalog from '../components/products/Catalog';
import 'bootstrap/dist/css/bootstrap.min.css';
import Catalogo from '../components/products/Catalog';


const App = () => {
  const [ categories, setCategories ] = useState([
    {id: 1, name:'Electronica'}, 
    {id: 2, name:'Insumos'}, 
    {id: 3, name:'Componentes'}, 
    {id: 4, name:'Placas de Video'},
]);
  const getCategories = async ()=>{
    try {
        const response = await fetch(`http://localhost:3001/categories`);
        const jsonData = await response.json();
        setCategories(jsonData)
        console.log(jsonData);
    } catch (error) {
        console.error(error.message)
    }
}

  return(
    <BrowserRouter>
      <Switch>
        {/* <Route exact path = '/products' component ={Catalog}/> */}
        <Route>
          <Catalog 
            categories={categories}
            setCategories={setCategories}
          />
        </Route>
      </Switch>
    </BrowserRouter>
    )
}

export default App;

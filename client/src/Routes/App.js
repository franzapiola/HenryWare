import React, { useState, useEffect } from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom'

import Catalog from '../components/products/Catalog';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchBar from '../components/SearchBar';
import Producto from '../components/product - id/Producto'
import ProductCard from '../components/products/ProductCard';



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
        // console.log(jsonData);
    } catch (error) {
        console.error(error.message)
    }
  }
  const [ products, setProducts ] = useState([]);
  const getProducts = async ()=>{
      try {
          const response = await fetch(`http://localhost:3001/products`);
          const jsonData = await response.json();
          setProducts(jsonData);
          // console.log(jsonData)
      } catch (error) {
          console.error(error.message)
      }        
  }
  const categoryFilter = async (name) => {
    const response = await fetch(`http://localhost:3001/products/categorias/${name}`);
    const jsonData = await response.json();
    setProducts(jsonData)
  }
  useEffect(()=>{
      getProducts();   
      //getCategories();  
  },[])

  const onSearch = (e, search) => {
    e.preventDefault();

    fetch(`http://localhost:3001/products/search?product=${search}`)
    .then(res=> res.json())
    .then(res=> setProducts(res));

  }

  return(
    <BrowserRouter>
      <Route path ='/' render={ ()=><SearchBar onSearch = {onSearch}/> }/>
      
      <Switch>
        <Route exact path='/products' render={()=>{
          return <Catalog 
            categories={categories}
            products={products}
            categoryFilter={categoryFilter}
          />
        }}/>

        <Route path='/products/:id' component={Producto}/>
        {/* <Route path='/products/test' component={Producto}/> */}

        
        

      </Switch>
    </BrowserRouter>
    )
}

export default App;

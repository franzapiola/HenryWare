import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import './App.css'
import './App.scss'; 
import Home from '../components/Home/Home'
import Crud from '../components/products/Crud'
import Catalog from '../components/products/Catalog';
import SearchBar from '../components/SearchBar';
import Producto from '../components/product-id/Producto';
import AddCategory from '../components/products/AddCategory';
import Footer from '../components/Footer'
import Register from '../components/users/Register';
import Cart from '../components/cart/index'
import Order from '../components/order'

import Login from '../components/users/login'
import Load from '../components/Load'


//import NotFound from  '../components/NotFound'




const App = () => {
  
  //Estado de productos: los que va a mostrar el catálogo en la ruta /products
  const [ products, setProducts ] = useState([]);

  //Estado categorías. Lo actualiza getCategories
  const [ categories, setCategories ] = useState([]);
  
  //Traer lista entera actualizada de categorías de la base de datos
  const getCategories = async ()=>{
    try {
        const response = await fetch(`http://localhost:3001/products/categories`);
        const jsonData = await response.json();
        setCategories(jsonData)
    } catch (error) {
        console.error(error.message)
    }
  }

  //Traer *todos* los productos de la base de datos
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
      getCategories();  
  },[])

  //Función ejecutada al buscar un producto en la search bar
  const onSearch = (e, search, props) => {
    e.preventDefault();
    //Busca productos con LIKE % %
    fetch(`http://localhost:3001/products/search?product=${search}`)
    .then(res=> res.json())
    //Envía el resultado al state de productos
    .then(res=> setProducts(res))
    //Y esta última línea redirige al usuario a /products, es decir al catálogo
    .then(()=> props.history.push('/products'))
  }

  return(
    <BrowserRouter>
      <Route path ='/' render={ (props)=><SearchBar {...props} onSearch = {onSearch}/> }/>
      <Switch>
        <Route exact path='/' render = {()=>{
          return <Home products={products}/>
        }} />
        <Route exact path='/signin'><Register/></Route>
        <Route exact path='/products' render={()=>{
          return <Catalog
            getProducts={getProducts}
            categories={categories}
            products={products}
            categoryFilter={categoryFilter}
            getCategories={getCategories}
          />
        }}/>
        <Route exact path='/products/edit'> 
          <Crud
            categories={categories}
          />
        </Route>
        <Route exact path='/products/categories/addcategory' component={AddCategory}/>
        <Route path='/products/:id' component={Producto}/>

        
        <Route exact path='/load' component={Load}/>
        {/* <Route component={NotFound} /> */}

      </Switch>
        <Route path='/' component={Footer}/>
        <Route path='/cart'><Cart/></Route>
        <Route path='/order'><Order/></Route>
        <Route exact path='/login'><Login/></Route>
    </BrowserRouter>
    )
}

export default App;

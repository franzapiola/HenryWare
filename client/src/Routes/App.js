import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import './App.css'
import './App.scss'; 
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import Crud from '../components/products/Crud'
import Catalog from '../components/products/Catalog';
import SearchBar from '../components/SearchBar';
import Producto from '../components/product-id/Producto';
import AddCategory from '../components/products/AddCategory';
import Footer from '../components/Footer'
import Register from '../components/users/Register';
import Cart from '../components/cart/index'
import Order from '../components/order'
import OrdersTable from '../components/order/OrdersTable';
import Home from '../components/Home/Home'
import Login from '../components/users/login'
import NotFound from  '../components/NotFound'
//Redux
import { connect } from 'react-redux';
//import store from '../redux/store';


const App = (props) => {
  
  //Estado de productos: los que va a mostrar el catálogo en la ruta /products
  const [ products, setProducts ] = useState([]);

  //Estado categorías. Lo actualiza getCategories
  const [ categories, setCategories ] = useState([]);
  const [carouselIndex, setCarouselIndex] = useState(0);

  //Redux
  const { view, searchInput, selectedCategory } = props;

  const handleCarouselSelect = (selectedIndex, e) => {
    setCarouselIndex(selectedIndex);
  }

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

  //fusioné getProducts, categoryFilter y parte de onSearch en una sola función
  //getProducts: trae productos de la BD y setea el estado local products DEPENDIENDO del estado global 'view'.
  //El valor de este estado se modifica en ocasiones específicas y va a determinar si getProducts:||||
  //  -trae *todos* los productos (view === 'All')
  //  -trae según selectedCategory (view === 'Category')
  //  -trae según searchInput (view === 'Search')
  const getProducts = ()=>{
    switch(view){
      case 'All':
        fetch(`http://localhost:3001/products`)
        .then(r=>r.json())
        .then(json=>setProducts(json))
        .catch(err => console.log(err));
        break;
      case 'Category':
        fetch(`http://localhost:3001/products/categorias/${selectedCategory}`)
        .then(r => r.json())
        .then(json => setProducts(json))
        .catch(err => console.log(err));
        break;
      case 'Search':
        fetch(`http://localhost:3001/products/search?product=${searchInput}`)
        .then(res=> res.json())
        .then(res=> setProducts(res))
        .catch(err => console.log(err));
        break;
    } 
  }

  useEffect(()=>{
      getProducts();
      getCategories();
  },[])

  return(
    <BrowserRouter>
      <Route path ='/' render={ ()=><SearchBar getProducts = {getProducts} categories={categories} getCategories={getCategories}/> }/>
      <Switch>
        <Route exact path='/' render={()=>{
          return <Home products={products}/>
        }}/>
          
        <Route exact path='/signin'>
              <Register/>
        </Route>
        
        <Route exact path='/products' render={()=>{
          return <Catalog
            getProducts={getProducts}
            categories={categories}
            products={products}
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
        <Route component={NotFound} />
      </Switch>
        <Route path='/' component={Footer}/>
        <Route path='/cart'>
          <Cart/>
        </Route>
        <Route path='/order'>
          <Order/>
        </Route>
        <Route exact path='/login'>
          <Login/>
          </Route>
        <Route exact path='/orders/table'>
          <OrdersTable/>
        </Route>
    </BrowserRouter>
    )
}

const mapStateToProps = state => {
  return {
    view: state.main.view,
    selectedCategory: state.main.selectedCategory,
    searchInput: state.main.searchInput
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

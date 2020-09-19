import React, { useState, useEffect } from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import axios from "axios";

//Estilo
import './App.css';
import './App.scss'; 
import 'bootstrap/dist/css/bootstrap.min.css';

//Componentes
import Crud from '../components/products/Crud'
import Catalog from '../components/products/Catalog';
import SearchBar from '../components/SearchBar';
import Producto from '../components/product-id/Producto';
import CategoriesCrud from '../components/products/CategoriesCrud';
import Footer from '../components/Footer'
import Register from '../components/users/Register';
import Cart from '../components/cart/index'
import Order from '../components/order'
import OrdersTable from '../components/order/OrdersTable';
import Home from '../components/Home/Home'
import Login from '../components/users/login'
import OrderInfo from '../components/order/orderInfo'
import ControlPanel from '../components/admin/controlPanel'
import NotFound from  '../components/NotFound'

//Redux
import { connect } from 'react-redux';
//import store from '../redux/store';
import { loadUserData } from '../redux/actions/auth';


const App = (props) => {
  
  //Estado de productos: los que va a mostrar el catálogo en la ruta /products
  const [ products, setProducts ] = useState([]);

  //Estado categorías. Lo actualiza getCategories
  const [ categories, setCategories ] = useState([]);
  const [carouselIndex, setCarouselIndex] = useState(0);

  //Redux
  const { view, searchInput, selectedCategory, currentPage, loadUserData } = props;

  const handleCarouselSelect = (selectedIndex, e) => {
    setCarouselIndex(selectedIndex);
  }

  //Hacemos *siempre* un axios a /auth/me para que, si hay una sesión activa (es decir, hay un accessToken presente en localStorage),
  //ésta se mantenga vigente a través de recargas de la página, o salir y volver a entrar. Hasta que el usuario haga logout.
  const actualToken = localStorage.getItem('actualToken');
  axios.get('http://localhost:3001/auth/me', 
    {
      headers: {
        'Authorization': `Bearer ${actualToken}`
      }
    }
  )
  .then(response => {
    console.log('RESPUESTA:',response)
    const { user } = response.data
    if (user) {
      //Si devuelve un usuario, cargamos sus datos al store de redux
      const { user_id, first_name, last_name, email, role} = user;
      return loadUserData({
        user_id,
        first_name,
        last_name,
        email,
        role
      });
    }
    //El axios a /auth/me no devolvió ningun usuario, por ende no hay usuario logeado
    loadUserData({
      role: 'Guest'
    })
  })
  .catch(err => console.log('ERROR:', err));


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

  //getProducts: trae productos de la BD y setea el estado local products DEPENDIENDO del estado global 'view'.
  //El valor de este estado se modifica en ocasiones específicas y va a determinar si getProducts:||||
  //  -trae *todos* los productos (view === 'All')
  //  -trae según selectedCategory (view === 'Category')
  //  -trae según searchInput (view === 'Search')
  const getProducts = ()=>{
    switch(view){
      case 'All':
        fetch(`http://localhost:3001/products?offset=${currentPage == 1 ? 0 : (currentPage - 1) * 12}&limit=12`)
        .then(r=>r.json())
        .then(json=>setProducts(json))
        .catch(err => console.log(err));
        break;
      case 'Category':
        fetch(`http://localhost:3001/products/categorias/${selectedCategory}?offset=${currentPage == 1 ? 0 : (currentPage - 1) * 12}&limit=12`)
        .then(r => r.json())
        .then(json => setProducts(json))
        .catch(err => console.log(err));
        break;
      case 'Search':
        fetch(`http://localhost:3001/products/search?product=${searchInput}&offset=${currentPage == 1 ? 0 : (currentPage - 1) * 12}&limit=12`)
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
          
        <Route exact path='/signup'>
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
        <Route exact path='/products/categories/edit' render = {()=><CategoriesCrud categories={categories} getCategories={getCategories}/>}/>
        <Route path='/products/:id' component={Producto}/>
        <Route path='/cart'>
          <Cart/>
        </Route>
        <Route exact path='/order'>
          <Order/>
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path='/orders/table/:id'>
          <OrderInfo />
        </Route>
         <Route exact path="/admin"> <ControlPanel/></Route> 
        <Route exact path='/orders/table'>
          <OrdersTable/>
        </Route>
        <Route component={NotFound} />
      </Switch>
        <Route path='/' component={Footer}/>
    </BrowserRouter>
    )
}

const mapStateToProps = state => {
  return {
    view: state.main.view,
    selectedCategory: state.main.selectedCategory,
    searchInput: state.main.searchInput,
    currentPage: state.main.currentPage
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadUserData: (userData) => dispatch(loadUserData(userData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

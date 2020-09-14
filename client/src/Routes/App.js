import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import {BrowserRouter,Route,Switch, Link} from 'react-router-dom'
import { Carousel } from 'react-bootstrap'
import Crud from '../components/products/Crud'
import Catalog from '../components/products/Catalog';
import SearchBar from '../components/SearchBar';
import Producto from '../components/product-id/Producto';
import AddCategory from '../components/products/AddCategory';
import './App.css'
import Footer from '../components/Footer'
import Jumbotron from '../components/Jumbotron';
import './App.scss'; 
import Register from '../components/users/Register';
import Cart from '../components/cart/index'
import Order from '../components/order'
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
  //El valor de este estado se modifica en ocasiones específicas y va a determinar si getProducts:
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

  //Función ejecutada al buscar un producto en la search bar
  const onSearch = (e, props) => {
    e.preventDefault();
    //Esta línea redirige al usuario a /products, es decir al catálogo
    props.history.push('/products');
    getProducts();
  }

  return(
    <BrowserRouter>
      <Route path ='/' render={ (props)=><SearchBar {...props} onSearch = {onSearch} categories={categories} getCategories={getCategories}/> }/>
      <Switch>

        {/* <Route exact path = '/' render={() =>{
          return <Jumbotron />
        }} /> */} 
        <Route exact path='/' >
          <Jumbotron />
          <Carousel style={{width:"100%" }, {height:"50%"}}className="carousel" activeIndex={carouselIndex} onSelect={handleCarouselSelect}>
            {products.map(prod => 
              <Carousel.Item>
                <Link to={`/products/${prod.product_id}`}>
                  <img
                    className="d-block sliderImage"
                    src={prod.images[0] && prod.images[0].img_url}
                    alt={prod.name}
                  />
                  <Carousel.Caption>
                    <h3>{prod.name}</h3>
                    <p>{prod.description.length>15?prod.description.slice(0, 50)+'...':prod.description}</p>
                  </Carousel.Caption>
                </Link>
              </Carousel.Item>
            )}                    
          </Carousel>
        </Route>
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

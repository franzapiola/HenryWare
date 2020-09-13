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
import Cart from '../components/cart/Index'
import Order from '../components/order'

import Login from '../components/users/login'


import NotFound from  '../components/NotFound'



const App = () => {
  
  //Estado de productos: los que va a mostrar el catálogo en la ruta /products
  const [ products, setProducts ] = useState([]);

  //Estado categorías. Lo actualiza getCategories
  const [ categories, setCategories ] = useState([]);

  const [carouselIndex, setCarouselIndex] = useState(0);

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

export default App;

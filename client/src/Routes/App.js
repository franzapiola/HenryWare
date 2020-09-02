import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route,Switch} from 'react-router-dom'

import Catalog from './components/products/Catalog';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Route } from 'react-router-dom';


const App = () => {


    <BrowserRouter>
      <Switch>
        <Route exact path = '/products' component ={Catalog}/>
      </Switch>
    </BrowserRouter>



  
}

export default App;

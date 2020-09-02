import React from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom'

import Catalog from '../components/products/Catalog';
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
  return(
    <BrowserRouter>
      <Switch>
        <Route exact path = '/products' component ={Catalog}/>
      </Switch>
    </BrowserRouter>
    )
}

export default App;

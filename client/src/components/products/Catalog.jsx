import React, { useState, useEffect } from 'react'
import ProductCard from './ProductCard.jsx';
import { Button } from 'react-bootstrap';
import styles from './catalog.module.scss';

//Redux
import store from '../../redux/store';
import { selectAll, selectCategories, selectCategory } from '../../redux/actions/main'
import { connect } from 'react-redux';

function Catalogo(props) {
    const { categories, products, getProducts, getCategories } = props

    //Redux
    const { selectAll, selectCategory, selectedCategory, view, searchInput } = props;

    const style={
        categoria: {
            width: '250px',
            height: '100vh',
        },
        category: {
            cursor: 'pointer',
        }
    }
    useEffect(()=>{
        getProducts();
        getCategories();
    }, [])
    return (
        <div className='container-fluid mt-2 pt-2 mb-2'>
            <button onClick={()=>console.log('PROPS CATALOGO:', props)}>PROPS</button>    
            <button onClick={()=>console.log('DESDE CATALOGO:',store.getState())}>STORE.GETSTATE</button>  
        <div className='d-flex flex-row'>
               <div className="categorias col-md-3" style={style.categoria}>
                {/* <Button>Todos los productos</Button> */}
                <ul className="list-group">

                    {/* Botón mostrar todos */}
                    <li onClick={()=>{
                            selectAll();
                            getProducts();
                        }}
                        className={`list-group-item list-group-item-action ${view==='All' && 'active'}`}
                        style={{cursor:'pointer', fontWeight: 'bold'}}>Todos los productos</li>
                    {/* Botón mostrar todos */}

                { categories.map( cat => {
                  let categoryClass = 'list-group-item list-group-item-action'
                  if(selectedCategory===cat.name) categoryClass += ' active'
                  return <li key={cat.category_id} onClick={()=> {
                        selectCategory(cat.name);
                    }
                    } className={categoryClass} style={style.category}>{cat.name}
                    </li>  
                })}
                </ul>
               </div>
               {(view === 'Category' && products.length > 0) && <h4>{selectedCategory}</h4>}
               {(view === 'Search' && products.length) && <h4>{`Resultados de búsqueda para "${searchInput}"`}</h4>}
               <div className="main d-flex flex-wrap col-md-9 align-content-start">
                    {products.length ? products.map(prod => 
                    <ProductCard key={prod.product_id} data={prod}/>
                    ) : <h4>{view === 'Search' ? `No se encontraron resultados para "${searchInput}"...` : `La categoría "${selectedCategory}" no contiene ningún producto...`}</h4>}
               </div>
           </div>
        </div>
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
    return {
        selectAll: () => dispatch(selectAll()),
        selectCategory: catName => dispatch(selectCategory(catName))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Catalogo);
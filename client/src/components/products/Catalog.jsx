import React, { useState, useEffect } from 'react'
import ProductCard from './ProductCard.jsx';
import { Button } from 'react-bootstrap';
import styles from './catalog.module.css'
//Redux
import store from '../../redux/store';
import { selectAll, selectCategories, selectCategory, changePage } from '../../redux/actions/main'
import { connect } from 'react-redux';

function Catalogo(props) {
    const { categories, products, getProducts, getCategories } = props;

    //Redux
    const { selectAll, selectCategory, selectedCategory, view, searchInput, currentPage, changePage } = props;

    const retrocederPagina = () => {
        changePage(currentPage - 1);
    };
    const avanzarPagina = () => {
        changePage(currentPage + 1);
    };


    useEffect(()=>{
        getProducts();
        getCategories();
    }, [view, selectedCategory, currentPage]);
    
    return (
        <div className='container-fluid mt-2 pt-2 mb-2'>
        <div className='d-flex flex-row'>
               <div className={`${styles.categorias} col-md-3`} >
                {/* <Button>Todos los productos</Button> */}
                <ul className="list-group">

                    {/* Botón mostrar todos */}
                    <li onClick={()=>{
                            selectAll();
                            getProducts();
                        }}
                        className={`list-group-item list-group-item-action ${view==='All' && 'active'}`}
                        >Todos los productos</li>
                    {/* Botón mostrar todos */}

                { categories.map( cat => {
                  let categoryClass = 'list-group-item list-group-item-action'
                  if(selectedCategory===cat.name && view === 'Category') categoryClass += ' active'
                  return <li key={cat.category_id} className={`${categoryClass} ${styles.category}`} onClick={()=> {
                    selectCategory(cat.name);
                    getProducts();
                    }}>{cat.name}</li>  
                })}
                </ul>
               </div>
            <div className='container-fluid'>
                <div>
                {(view === 'Category' && products.length) ? <h4>{`Mostrando productos de la categoría ${selectedCategory}`}</h4> : null}
                {(view === 'Search' && products.length) ? <h4>{`Resultados de búsqueda para "${searchInput}"`}</h4> : null}
                </div>

               <div className="main d-flex flex-wrap align-content-start">
                    {products.length ? products.map(prod => 
                    <ProductCard key={prod.product_id} data={prod}/>
                    ) : <h4>{view === 'Search' ? `No se encontraron resultados para "${searchInput}"...` : `La categoría "${selectedCategory}" no contiene ningún producto...`}</h4>}
               </div>
                   <h5>Página {currentPage}</h5>
               </div>
           </div>

           {/* NAVEGACIÓN DE PÁGINAS */}
           <div>
                {currentPage > 1 && <Button onClick={()=>{
                    retrocederPagina();
                    }}
                    >{`<`}</Button>}
                    <p>{currentPage}</p>
                {!(products.length < 12) && <Button onClick={()=>{
                    avanzarPagina();
                    console.log(products);
                    }}
                    >{`>`}</Button>}
           </div>
        </div>
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
        selectAll: () => dispatch(selectAll()),
        selectCategory: catName => dispatch(selectCategory(catName)),
        changePage: pageNumber => dispatch(changePage(pageNumber))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Catalogo);
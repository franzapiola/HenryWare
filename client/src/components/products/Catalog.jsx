import React, { useState, useEffect } from 'react'
import ProductCard from './ProductCard.jsx';
import { Button } from 'react-bootstrap';
import styles from './catalog.css'

export default function Catalogo(props) {
    const { categories, products, getProducts, categoryFilter, getCategories } = props
    const [ isActive, setIsActive ] = useState('Mostrar todo')
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
        <div className='d-flex flex-row'>
               <div className="categorias col-md-3" style={style.categoria}>
                {/* <Button>Todos los productos</Button> */}
                <ul className="list-group">

                    {/* Botón mostrar todos */}
                    <li onClick={()=>{
                            setIsActive('Mostrar todo')
                            getProducts()
                        }}
                        className={`list-group-item list-group-item-action ${isActive==='Mostrar todo' && 'active'}`}
                        style={{cursor:'pointer', fontWeight: 'bold'}}>Todos los productos</li>
                    {/* Botón mostrar todos */}

                { categories.map( cat => {
                  let categoryClass = 'list-group-item list-group-item-action'
                  if(isActive===cat.name) categoryClass += ' active'
                  return <li key={cat.id} onClick={()=> { //no es cat.category_id ? 
                        setIsActive(cat.name)
                        categoryFilter(cat.name)                        
                    }
                    } className={categoryClass} style={style.category}>{cat.name}
                    </li>  
                })}
                </ul>
               </div>
               <div className="main d-flex flex-wrap col-md-9 aling-content-strech">
                   { products.length ? products.map(prod => 
                    <ProductCard key={prod.product_id} data={prod} />
                    ) : <h3>No se encontraron resultados para tu búsqueda...</h3>} 
               </div>               
           </div>
        </div>
    )
}

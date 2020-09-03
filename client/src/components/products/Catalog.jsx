import React, { useState, useEffect } from 'react'
import ProductCard from './ProductCard';

export default function Catalogo(props) {
    const { categories, products, categoryFilter } = props

    const style={
        categoria: {
            width: '250px',
            height: '90vh',
            backgroundColor: '#fbfafa',
        },
        main: {
            backgroundColor: '#fbfafa',
        },
        category: {
            cursor: 'pointer',
        }

    }

    return (
        <div className='container-fluid'>        
           <h1>Catalog</h1>
           <div className='d-flex'>
               <div className="categorias col-md-3" style={style.categoria}>
                <ul className="list-group">                    
                { categories.map( cat => <li key={cat.id} onClick={()=>categoryFilter(cat.name)} className='list-group-item' style={style.category}>{cat.name}</li>)}
                </ul>
               </div>
               <div className="main d-flex col-md-9" style={style.main}>
                { products.map(prod => 
                    <ProductCard data={prod} />
                    ) } 
               </div>
               
           </div>
        </div>
    )
}

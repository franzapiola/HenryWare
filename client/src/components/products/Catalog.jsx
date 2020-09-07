import React, { useState } from 'react'
import ProductCard from './ProductCard.jsx';

export default function Catalogo(props) {
    const { categories, products, categoryFilter } = props
    const [ isActive, setIsActive ] = useState()
    const style={
        categoria: {
            width: '250px',
            height: '90vh',
        },
        category: {
            cursor: 'pointer',
        }

    }

    return (
        <div className='container-fluid mt-2 pt-2 mb-2'>      
           <div className='d-flex'>
               <div className="categorias col-md-3" style={style.categoria}>
                <ul className="list-group">                    
                { categories.map( cat => {
                  let categoryClass = 'list-group-item list-group-item-action'
                  if(isActive===cat.name) categoryClass += ' active'
                  return <li key={cat.id} onClick={()=> {
                        setIsActive(cat.name)
                        categoryFilter(cat.name)                        
                    }
                    } className={categoryClass} style={style.category}>{cat.name}
                    </li>  
                })}
                </ul>
               </div>
               <div className="main d-flex flex-wrap col-md-9">
                { products.map(prod => 
                    <ProductCard key={prod.product_id} data={prod} />
                    ) } 
               </div>
               
           </div>
        </div>
    )
}

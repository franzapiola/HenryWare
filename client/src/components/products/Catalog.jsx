import React, { useState, useEffect } from 'react'
import ProductCard from '../ProductCard'

export default function Catalogo(props) {
    const [ products, setProducts ] = useState([]);
    const { categories, setCategories } = props
    const getProducts = async ()=>{
        try {
            const response = await fetch(`http://localhost:3001/products`);
            const jsonData = await response.json();
            setProducts(jsonData);
            console.log(jsonData)
        } catch (error) {
            console.error(error.message)
        }        
    }

    useEffect(()=>{
        getProducts();    
        //getCategories();  
    },[])
    console.log(categories)
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
    const categoryFilter = (id)=>{
        const filter = products.filter( prod =>  prod.id===id-1)
        //setProducts(filter)
        console.log(filter)
    }
    return (
        <div className='container-fluid'>        
           <h1>Catalog</h1>
           <div className='d-flex'>
               <div className="categorias col-md-3" style={style.categoria}>
                <ul className="list-group">                    
                { categories.map( cat => <li key={cat.id} onClick={()=>categoryFilter(cat.id)} className='list-group-item' style={style.category}>{cat.name}</li>)}
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

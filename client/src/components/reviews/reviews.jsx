import React,{ useState, useEffect} from 'react';
import s from './reviews.module.css';
import Rating from '../product-id/Rating';
import avatar from './avatar.png';
import Review from './review';
import axios from "axios";

export default function Reviews (id) {

    // const [productReview, setproductReview] = useState();

    const productReview = [
        {
            review_id: 1,
            product: 3,
            rating: 4, 
            description: 'Excelente producto, muy buena páginaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
            name: 'Gaston',
            updateAt: '20/10/2019'
        },
        {
            review_id: 2,
            user_id: 5,
            product: 3,
            rating: 2, 
            description: 'Mi página favorita!!',
            name: 'Kenny',
            updateAt: '15/9/2020 '
        }
            
    ]

// Llamamos a back por los review de determinado producto pasado por id del componente product. NV

      const getReviews = (id) => {
            
        axios.get(`http://localhost:3001/product/${id}/review`) 
        .then(response => {
            const comments = response.data;

        // Seteamos el estado con los todos los review. NV
        //     setproductReview(comments)
            console.log(comments);
        })
        .catch(error => {
            console.log(error);
        })
    }

    useEffect((id) => {
            getReviews(id)  
    } ,[]) 


// Condicionamos si el estado productReview tiene algun review. NV
if(productReview.length !== 0){

    return (
            <div className={s.caja}>
                <h1 className={s.titulo}>Comentarios</h1>
                <hr/>
                {/* x es cada review del producto traido de back */}
                    {productReview.map( x => <Review 
                            review_id={x.review_id}
                            user_id={x.user_id}
                            product={x.product}
                            rating={x.rating} 
                            description={x.description}
                            name={x.name}
                            updateAt={x.updateAt}
                            />
                    )}          
            </div>
    )
}
else {
    return (
        <div>
            <h1 className={s.titulo}>Sin comentarios</h1>
                <hr/>
        </div>
    )
}
    
}
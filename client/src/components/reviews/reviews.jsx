import React,{ useState, useEffect} from 'react';
import s from './reviews.module.css';
import Review from './review';
import axios from "axios";
import Stars from './stars';




export default function Reviews (props) {
    
    const { id } = props;
    
    const [productReview, setproductReview] = useState([]);


// Llamamos a back por los review de determinado producto pasado por id del componente product. NV

      const getReviews = () => {
            
        axios.get(`http://localhost:3001/reviews/${id}`) 
        .then(response => {
        // Seteamos el estado con los todos los review. NV
            setproductReview(response.data)          
        })
        .catch(error => {
            console.log(error);
        })
    }

    useEffect((id) => {
            getReviews(id)  
    } ,[]) 


    return (
            <div className={s.caja}>
                <h2 className={s.titulo}>{productReview.length ? 'Comentarios': 'Sin comentarios'}</h2>
                <hr/>
                <div> <Stars/> </div>
                

                {/* x es cada review del producto traido de back */}
                    {productReview.map( x => <Review 
                            review_id={x.review_id}
                            product={x.product}
                            rating={x.rating} 
                            description={x.description}
                            first_name={x.user.first_name}
                            last_name={x.user.last_name}
                            updatedAt={x.updatedAt}
                            />
                    )}          
            </div>
    )
}
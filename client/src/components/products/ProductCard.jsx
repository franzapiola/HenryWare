import React from "react";
import {Link} from "react-router-dom"
import {AiFillStar,AiOutlineStar} from "react-icons/ai"
import style from './ProductCard.css'


const HowManyStars = (review) => {
    switch (review) {
        case 1:
            return <span>
            {<AiFillStar/>}
            {<AiOutlineStar/>}
            {<AiOutlineStar/>}
            {<AiOutlineStar/>}
            {<AiOutlineStar/>}
            
        </span>//1 sola estrella
            
        case 2: 
            return  <span>
            {<AiFillStar/>}
            {<AiFillStar/>}
            {<AiOutlineStar/>}
            {<AiOutlineStar/>}
            {<AiOutlineStar/>}
            
        </span>//3 estrellas
        
        case 3: 
            return <span>
            {<AiFillStar/>}
            {<AiFillStar/>}
            {<AiFillStar/>}
            {<AiOutlineStar/>}
            {<AiOutlineStar/>}
        </span> //3 estrellas
             
        case 4:
            return <span>
            {<AiFillStar/>}
            {<AiFillStar/>}
            {<AiFillStar/>}
            {<AiFillStar/>}
            {<AiOutlineStar/>}
        </span>//4 estrellas
            
        case 5:
            return <span>
                {<AiFillStar/>}
                {<AiFillStar/>}
                {<AiFillStar/>}
                {<AiFillStar/>}
                {<AiFillStar/>}
            </span> //3 estrellas
        
        default:
          return <p>0</p> //estrellas vacias
      }
}

const ProductCard = (props) =>{
    
        return(
        <Link to={`/products/${props.data.product_id}`} className='col-md-4 col-sm-6 col-12 mb-2'>
            <div className="card bg-light d-flex product-card" >               
                <img src={props.data.image} className="card-img" alt={`Imagen ${props.data.name}`}/>
                <div className="col-md-12">
                    <h5 className="card-title tituloProducto">{props.data.name}</h5>
                    <p className="card-star text-primary">{HowManyStars(props.data.stock)}</p>
                    <p className="card-text font-weight-bold">$ {Number.parseFloat(props.data.price).toFixed(2)}</p>
                </div>
            </div>
        </Link>
            
        )
    }


export default ProductCard
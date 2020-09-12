import './ProductCard.css'
import React from "react";
import {Link} from "react-router-dom"
import {Button} from "react-bootstrap"
import {AiFillStar,AiOutlineStar} from "react-icons/ai"


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
            {<AiFillStar />}
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
          return <span>
          {<AiOutlineStar/>}
          {<AiOutlineStar/>}
          {<AiOutlineStar/>}
          {<AiOutlineStar/>}
          {<AiOutlineStar/>}
        </span> //estrellas vacias
      }
}

const ProductCard = (props) =>{
        return(
        <Link to={`/products/${props.data.product_id}`} className={`mr-4 mb-3 ${props.data.stock<=0?'no-disponible':null} `}>
            <div className="card d-flex product-card mr-3 mx-auto " >               
                {props.data.images.length && <img src={props.data.images && props.data.images[0].img_url} className="card-img" alt={`Imagen ${props.data.name}`}/>}
                <hr className="hr"/>
                <div className="info-card">
                    <h5 className="card-title titulo-producto">{props.data.name}</h5>
                    <p className="card-star estrella">{HowManyStars(props.data.stock)}</p>
                    <p className="card-text font-weight-bold">$ {Number.parseFloat(props.data.price).toFixed(2)}</p>
                </div>
                <Button className='mt-2 w-75 align-self-center' variant="comprar"><b>Ver detalles</b></Button>
            </div>
        </Link>
            
        )
    }


export default ProductCard
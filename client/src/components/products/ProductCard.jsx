import React from "react";
import {Link} from "react-router-dom"
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
            <Link to={`/product/${props.data.product_id}`}>
                <div className="card mb-3" >
                    <div className="row no-gutters">
                        <div className="col-md-4">
                            <img src={props.data.image} className="card-img" alt="..."/>
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">{props.data.name}</h5>
                                <p className="card-star ">{HowManyStars(props.data.stock)}</p>
                                <p className="card-text">{props.data.price}</p>
                            </div>
                        </div>
                    </div>
                </div>
            
            </Link>
        )
    }


export default ProductCard
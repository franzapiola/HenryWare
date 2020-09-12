import './ProductCard.css'
import React from "react";
import {Link} from "react-router-dom"
import {Button, Carousel} from "react-bootstrap"
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
// props.data.images.length && <img src={props.data.images && props.data.images[0].img_url} className="card-img" alt={`Imagen ${props.data.name}`}/>
const ProductCard = (props) =>{
    console.log(props.data.images)

        return(
        <Link to={`/products/${props.data.product_id}`} className={`mr-4 mb-3 ${props.data.stock<=0?'no-disponible':null} `}>
            <div style={{display:'flex',flexDirection:'column',justifyContent:'space-between'}} className="card d-flex product-card mr-3 mx-auto" >               
                <Carousel style={{boxShadow:"none",height:'50%',}}>{props.data.images.map(function(image){
                    return <Carousel.Item><img style={{height:"30%",width:'100%'}} src={image.img_url}/></Carousel.Item>
                })}
                </Carousel>
                <div className="info-card">
                    <h5 className="card-title titulo-producto">{props.data.name}</h5>
                    <p className="card-star estrella">{HowManyStars(props.data.stock)}</p>
                    <p className="card-text font-weight-bold">$ {Number.parseFloat(props.data.price).toFixed(2)}</p>
                </div>
                <hr className="hr"/>
                
                <Button className='mt-2 w-75 align-self-center nodisplay' variant="comprar"><b>Ver detalles</b></Button>
            </div>
        </Link>
            
        )
    }


export default ProductCard
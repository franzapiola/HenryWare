import React from "react";


const HowManyStars = (review) => {
    switch (review) {
        case 1:
            return //1 sola estrella
            break;
        case 2: 
            return //3 estrellas
            break
        case 3: 
            return //3 estrellas
            break; 
        case 4:
            return //4 estrellas
            break;
        case 5:
            return //3 estrellas
            break
        default:
          return "0" //estrellas vacias
      }
}

const ProductCard = (props) =>{
    
        return(
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
        )
    }


export default ProductCard
import React, {useState}from 'react'
import { FaStar }from 'react-icons/fa';
import s from './stars.module.css';
import { AiOutlineSend} from "react-icons/ai";
import { FormControl, TextField, Button } from '@material-ui/core';








    const StarRating = () => {

        const [rating, setRating] = useState(null);
        const [hover, setHover] = useState(null);

        return (
            <div>
                <div>
                <TextField
                id="standard-multiline-flexible"
                label="Deja tu comentario"
                rowsMax={4}
               
                />
                <AiOutlineSend  size={30}/>
                </div>
        <div>
            {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1;
                
                return (
                <label>
                    <input 
                    type='radio' 
                    name='rating' 
                    value={ratingValue}
                    onClick={() => setRating(ratingValue)}
                    
                     />
                <FaStar 
                className={s.stars} 
                color={ratingValue <= (hover || rating) ? '#FFFF01' : '#000000'} 
                size={30}
                onMouseEnter={() =>  setHover(ratingValue)}
                onMouseLeave={() => setHover(null)}
                />

                </label>
                )
            })}
        </div>
        
        </div>
        )
    }


export default StarRating;
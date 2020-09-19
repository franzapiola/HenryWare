import React, {useState}from 'react'
import { FaStar }from 'react-icons/fa';
import s from './stars.module.css';
import { TextField, Button } from '@material-ui/core';
import axios from 'axios';
import { connect } from 'react-redux';

function StarRating (props) {

   let { user_id } = props.auth;
   let { product_id } = props;

    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);
    const [input, setInput] = useState();

    const handleonChange = (e) => {
        setInput(e)
    }

    const createReview = async (e) => {
        e.preventDefault();

        await axios.post(`http://localhost:3001/reviews/${product_id}`, {
            rating,  
            description: input,
            user_id         
        })
        .then(response => {
            console.log(response)
          })
        .catch(error => {
            console.log(error);
        });
    }

    return (
            <div className={s.div}>
                <div >
                    <TextField
                    id="standard-multiline-flexible"
                    label="Deja tu comentario"
                    multiline
                    rowsMax={4}
                    className={s.input}
                    onChange={(e) => handleonChange(e.target.value)}
                    />                
                </div>
                <div>
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
                    <Button className={s.button} onClick={(e) => createReview(e)}>Enviar</Button>
                </div>
        
            </div>
            )
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    };
};
        
export default connect(mapStateToProps)(StarRating)
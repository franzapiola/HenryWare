import React,{ useState, useEffect} from 'react';
import s from './review.module.css';
import Rating from '../product-id/Rating';
import avatar from './avatar.png';
import axios from "axios";

export default function Review (props) {

    const {updateAt, rating, description, user_id} = props;

    const [idReview, setidReview] = useState();

    //Buscamos los nombres del user_id que nos pasaron.     NV.

    const getnames = (user_id) => {
            
        axios.get(`http://localhost:3001/users/${user_id}`) 
        .then(response => {
            const name = response.data.first_name.toUpperCase().toLowerCase().charAt(0).toUpperCase() + response.data.first_name.slice(1);
            const apellido = response.data.last_name.toUpperCase().toLowerCase().charAt(0).toUpperCase() + response.data.last_name.slice(1);
            const fullName = name + ' ' + apellido;
            return fullName;
        })
        .then(response2 => {
            setidReview(response2)
        })
        .catch(error => {
            setidReview('User')
            console.log(error);
        })
    }

    useEffect(() => {
        getnames(user_id)  
    } ,[]) 

    return (

                <div className='comment-container' className={s.commentContainer}>
                    
                    <ul id='comments-list' className='comments-list' className={s.commentsList} >
                        
                        <li className={s.list}>
                            <div className='comment-main-level'>
                                <div className='comments-avatar' className={s.commentsAvatar}><img src={avatar} className={s.img}/></div>
                                <div className='comment-box' className={s.commentsBox}>
                                    <div className='comment-head' className={s.commentsHead}>
                                        <h6 className='comment-name-by-author' className={s.author}><a className={s.a}>{idReview}</a></h6>
                                        <span className={s.date}>{updateAt}</span>
                                        <i className={s.commentsIcons}><Rating rating={rating}/></i>
                                    </div>
                                    <div className='comment-content' className={s.commentsContent}>{description}</div>

                                </div>
                            </div>
                        </li>
                    </ul>
                </div>


            )
};
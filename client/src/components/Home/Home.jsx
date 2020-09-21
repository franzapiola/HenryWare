import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap'
import Jumbotron from './Jumbotron';
import {Link} from 'react-router-dom'
import styles from './home.module.css'
import './home .css'
const Home = (props) => {

const {products} = props

const [carouselIndex, setCarouselIndex] = useState(0);

  const handleCarouselSelect = (selectedIndex, e) => {
    setCarouselIndex(selectedIndex);
  }

    return (
        <>
            <Jumbotron/>

            {/* <Carousel className={`carousel ${styles.carousel}`} activeIndex={carouselIndex} onSelect={handleCarouselSelect}>


                {products.map(prod => 
                    <Carousel.Item>
                        <Link to={`/products/${prod.product_id}`}>
                        <img
                            className="d-block sliderImage"
                            src={prod.images[0] && prod.images[0].img_url}
                            alt={prod.name}
                        />
                        <Carousel.Caption>
                            <h3>{prod.name}</h3>
                            <p>{prod.description.length>15?prod.description.slice(0, 50)+'...':prod.description}</p>
                        </Carousel.Caption>
                        </Link>
                    </Carousel.Item>
                    )}                    
                </Carousel> */}
            </>
    )
}



export default Home
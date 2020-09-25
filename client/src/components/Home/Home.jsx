import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap'
import Jumbotron from './Jumbotron';
import {Link} from 'react-router-dom'
import styles from './home.module.css'
import './home .css'
import Banner from './banner';
import TopProduct from './TopProduct';
import TopCard from '../products/TopCard'

const Home = (props) => {

    const { products } = props;
    const [ topFive, setTopFive] = useState([]);
   
    const fiveProducts = () => {

        const orden = products.sort((a, b) => {
            return a.rating - b.rating
          })
        const topProduc = [];
        topProduc.push(orden[orden.length-1])
        topProduc.push(orden[orden.length-2])
        topProduc.push(orden[orden.length-3])
        topProduc.push(orden[orden.length-4])

        setTopFive(topProduc)
    }

    useEffect(()=>{
        fiveProducts(products);
    }, []);

    console.log('topFive :', topFive);

    return (
        <>
            <Jumbotron/>
            <Banner/>
    
            <div className={styles.topFive}>

                <h3 className={styles.titulotop}>Productos mejores calificados</h3>
                <div className={styles.topBox}>
                {topFive.length ? topFive.map(prod => 

                <TopCard key={prod.product_id} data={prod} className={styles.card}/>
                ) : <p></p> }


                </div>
                
            </div>

            
                    
          

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
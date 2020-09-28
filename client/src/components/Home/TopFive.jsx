import React, { Fragment, useState } from 'react'
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import TopCard from '../products/TopCard'

export default function TopFive(props) {
    
    //const [ topFive, setTopFive ] = useState(props.topFive);
    console.log('props', props.topFive);
    return (
        <AwesomeSlider  bullets={false}>
                {props.topFive && props.topFive.length >1 ? 
                    props.topFive.map( product =>                          
                    <div ><TopCard style={{height:'fit-content'}} key={product.product_id} data={product}/></div>
                )
                 :null
                 }
        </AwesomeSlider>
    )
}

import React from 'react';


export default function Producto (props) {
    const { data } = props;
    return (
    <div>
        <div>
            {data.categories.map(el=>{
                return (
                    <p>{el.name}</p>
                )
            })}
        </div>

        <div>
            <h1>{data.name}</h1>
            <h4>En stock: {data.stock}</h4>
        </div>

        <div>
            <h3 style={{'color': 'green'}}>${data.price}</h3>
        </div>

        <img style = {{'max-width': '500px', 'max-height': '500px'}}src={data.image}/>

        <p>{data.description}</p>
        <p>Garantía: {data.warranty.days && `${data.warranty.days} días,`}{data.warranty.months && `${data.warranty.months} meses y`} {data.warranty.years && `${data.warranty.years} año/s!`}</p>
    </div>
    )
}
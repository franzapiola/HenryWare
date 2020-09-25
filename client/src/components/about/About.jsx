import React from 'react'
import exi from '../../Assets/Exi-Henry.jpg'
import kenny from '../../Assets/Kenny-Henry.jpeg'
import fran from '../../Assets/Fran-Henry.jpeg'
import juan from '../../Assets/Juan-Henry.jpeg'
import colo from '../../Assets/Colo-Henry.jpeg'
import tongas from '../../Assets/Tongas-Henry.jpeg'
import './about.css'
import {AiFillLinkedin} from 'react-icons/ai'



const boxStyle = {
    border: '1px solid black'
}



export default function About() {
    return (
        <div className="container">
            
                <div className="presentation">
                    <div className="text_area">
                        <div className="title">
                            <h1>About</h1>
                        </div>
                        <div className="paragraph">
                            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorem corporis dolorum error dolores officiis perspiciatis, 
                                reiciendis doloribus laboriosam, eos cupiditate nemo recusandae autem nesciunt, quisquam inventore sapiente sint vero. A?
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel ea porro, aut provident nostrum impedit dolore eligendi, 
                                non illo pariatur doloremque corrupti iure tenetur aliquam, laboriosam possimus dolor! Odio, aperiam! Lorem ipsum dolor, sit amet
                                consectetur adipisicing elit. Iste possimus nostrum Lorem ipsum, dolor sit a
                                met consectetur adipisicing elit. Atque, repellat? Quasi necessitatibus quae dolore e
                                um maiores saepe! Magni illo saepe veniam
                                 unde adipisci atque impedit. Eaque inventore doloribus saepe nobis.
                                </p>
                        </div>
                    </div>
                    <div className="empty_space">
                        
                    </div>
                </div>
                <div className="team">
                    <div className="team-title">
                        <h1>Team</h1>
                    </div>
                    <div className="team-mates">
                        <div className="member">
                            <div className="graph">
                                <div className="image_container">
                                    <img className ="image"src={kenny} alt=""/>
                                </div>
                            </div>
                            <div className="data">
                                <div className="net-icons">
                                    <p> <AiFillLinkedin/></p>
                                </div>
                                <div className="name">
                                    <h2>Nicolas Kenny</h2>
                                </div>
                                <div className="description">
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                                        Unde ducimus dolor quod explicabo sit odio ea</p>
                                </div>
                            </div>
                        </div>
                        <div className="member">
                            <div className="graph">
                                <div className="image_container">
                                    <img className ="image"src={fran} alt=""/>
                                </div>
                            </div>
                            <div className="data">
                                <div className="net-icons">
                                    <p><AiFillLinkedin/></p>
                                </div>
                                <div className="name">
                                    <h2>Francisco zapiola</h2>
                                </div>
                                <div className="description">
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                                        Unde ducimus dolor quod explicabo sit odio ea</p>
                                </div>
                            </div>
                        </div>
                        <div className="member">
                            <div className="graph">
                                <div className="image_container">
                                    <img className ="image"src={juan} alt=""/>
                                </div>
                            </div>
                            <div className="data">
                                <div className="net-icons">
                                    <p><AiFillLinkedin/></p>
                                </div>
                                <div className="name">
                                    <h2>Juan Barneix</h2>
                                </div>
                                <div className="description">
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                                        Unde ducimus dolor quod explicabo sit odio ea</p>
                                </div>
                            </div>
                        </div>
                        <div className="member">
                            <div className="graph">
                                <div className="image_container">
                                    <img className ="image"src={tongas} alt=""/>
                                </div>
                            </div>
                            <div className="data">
                                <div className="net-icons">
                                    <p><AiFillLinkedin/></p>
                                </div>
                                <div className="name">
                                    <h2>Gaston Ferreyra</h2>
                                </div>
                                <div className="description">
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                                        Unde ducimus dolor quod explicabo sit odio ea</p>
                                </div>
                            </div>
                        </div>
                        <div className="member">
                            <div className="graph">
                                <div className="image_container">
                                    <img className ="image"src={colo} alt=""/>
                                </div>
                            </div>
                            <div className="data">
                                <div className="net-icons">
                                    <p><AiFillLinkedin/></p>
                                </div>
                                <div className="name">
                                    <h2>Nicolas Velandia</h2>
                                </div>
                                <div className="description">
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                                        Unde ducimus dolor quod explicabo sit odio ea</p>
                                </div>
                              
                            </div>
                        </div>
                        <div className="member">
                            <div className="graph">
                                <div className="image_container">
                                    <img className ="image"src={exi} alt=""/>
                                </div>
                            </div>
                            <div className="data">
                                <div className="net-icons">
                                    <p><AiFillLinkedin/></p>
                                </div>
                                <div className="name">
                                    <h2>Alexis Enriquez</h2>
                                </div>
                                <div className="description">
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                                        Unde ducimus dolor quod explicabo sit odio ea</p>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>

            </div>
        
        
    )
}

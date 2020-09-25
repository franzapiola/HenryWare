import React from 'react'

import styles from './about.module.css'
import {AiFillLinkedin} from 'react-icons/ai'
import {Animated} from "react-animated-css";


const boxStyle = {
    border: '1px solid black'
}



export default function About() {
    return (
        // <div className="container-fluid">
            
        //         <div className="presentation">
        //             <div className="text_area">
        //                 <div className="title">
        //                     <h1>About</h1>
        //                 </div>
        //                 <div className="paragraph">
        //                     <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorem corporis dolorum error dolores officiis perspiciatis, 
        //                         reiciendis doloribus laboriosam, eos cupiditate nemo recusandae autem nesciunt, quisquam inventore sapiente sint vero. A?
        //                         Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel ea porro, aut provident nostrum impedit dolore eligendi, 
        //                         non illo pariatur doloremque corrupti iure tenetur aliquam, laboriosam possimus dolor! Odio, aperiam! Lorem ipsum dolor, sit amet
        //                         consectetur adipisicing elit. Iste possimus nostrum Lorem ipsum, dolor sit a
        //                         met consectetur adipisicing elit. Atque, repellat? Quasi necessitatibus quae dolore e
        //                         um maiores saepe! Magni illo saepe veniam
        //                          unde adipisci atque impedit. Eaque inventore doloribus saepe nobis.
        //                         </p>
        //                 </div>
        //             </div>
        //             <div className="empty_space">
                        
        //             </div>
        //         </div>
        //         <div className="team">
        //             <div className="team-title">
        //                 <h1>Team</h1>
        //             </div>
        //             <div className="team-mates">
        //                 <div className="member">
        //                     <div className="graph">
        //                         <div className="image_container">
        //                             <img className ="image"src={kenny} alt=""/>
        //                         </div>
        //                     </div>
        //                     <div className="data">
        //                         <div className="net-icons">
        //                             <p> <AiFillLinkedin/></p>
        //                         </div>
        //                         <div className="name">
        //                             <h2>Nicolas Kenny</h2>
        //                         </div>
        //                         <div className="description">
        //                             <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
        //                                 Unde ducimus dolor quod explicabo sit odio ea</p>
        //                         </div>
        //                     </div>
        //                 </div>
        //                 <div className="member">
        //                     <div className="graph">
        //                         <div className="image_container">
        //                             <img className ="image"src={fran} alt=""/>
        //                         </div>
        //                     </div>
        //                     <div className="data">
        //                         <div className="net-icons">
        //                             <p><AiFillLinkedin/></p>
        //                         </div>
        //                         <div className="name">
        //                             <h2>Francisco zapiola</h2>
        //                         </div>
        //                         <div className="description">
        //                             <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
        //                                 Unde ducimus dolor quod explicabo sit odio ea</p>
        //                         </div>
        //                     </div>
        //                 </div>
        //                 <div className="member">
        //                     <div className="graph">
        //                         <div className="image_container">
        //                             <img className ="image"src={juan} alt=""/>
        //                         </div>
        //                     </div>
        //                     <div className="data">
        //                         <div className="net-icons">
        //                             <p><AiFillLinkedin/></p>
        //                         </div>
        //                         <div className="name">
        //                             <h2>Juan Barneix</h2>
        //                         </div>
        //                         <div className="description">
        //                             <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
        //                                 Unde ducimus dolor quod explicabo sit odio ea</p>
        //                         </div>
        //                     </div>
        //                 </div>
        //                 <div className="member">
        //                     <div className="graph">
        //                         <div className="image_container">
        //                             <img className ="image"src={tongas} alt=""/>
        //                         </div>
        //                     </div>
        //                     <div className="data">
        //                         <div className="net-icons">
        //                             <p><AiFillLinkedin/></p>
        //                         </div>
        //                         <div className="name">
        //                             <h2>Gaston Ferreyra</h2>
        //                         </div>
        //                         <div className="description">
        //                             <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
        //                                 Unde ducimus dolor quod explicabo sit odio ea</p>
        //                         </div>
        //                     </div>
        //                 </div>
        //                 <div className="member">
        //                     <div className="graph">
        //                         <div className="image_container">
        //                             <img className ="image"src={colo} alt=""/>
        //                         </div>
        //                     </div>
        //                     <div className="data">
        //                         <div className="net-icons">
        //                             <p><AiFillLinkedin/></p>
        //                         </div>
        //                         <div className="name">
        //                             <h2>Nicolas Velandia</h2>
        //                         </div>
        //                         <div className="description">
        //                             <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
        //                                 Unde ducimus dolor quod explicabo sit odio ea</p>
        //                         </div>
                              
        //                     </div>
        //                 </div>
        //                 <div className="member">
        //                     <div className="graph">
        //                         <div className="image_container">
        //                             <img className ="image"src={exi} alt=""/>
        //                         </div>
        //                     </div>
        //                     <div className="data">
        //                         <div className="net-icons">
        //                             <p><AiFillLinkedin/></p>
        //                         </div>
        //                         <div className="name">
        //                             <h2>Alexis Enriquez</h2>
        //                         </div>
        //                         <div className="description">
        //                             <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
        //                                 Unde ducimus dolor quod explicabo sit odio ea</p>
        //                         </div>
        //                     </div>
        //                 </div>
                        
        //             </div>
        //         </div>

        //     </div>
        
        <div className={`container-fluid ${styles.about}`}>
            <Animated animationIn="fadeIn" animationInDelay='150' isVisible={true}> 

            <div className={`${styles.introAbout} `}>
                <h1>Sobre nosotros</h1>

                <p className={styles.descAbout}>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque tenetur iste esse possimus similique architecto laborum inventore consequuntur nemo voluptates sed quibusdam provident alias modi, quo suscipit rerum quod. Provident?
                    Alias minima aliquam aperiam nisi quas consectetur molestias ipsam neque fugiat architecto ratione, explicabo repellat quod nihil totam blanditiis, voluptatibus, quae cupiditate magnam deleniti doloribus illo sit. Earum, voluptates labore.
                    Aliquid debitis excepturi eius, rerum animi dolore magnam perspiciatis corporis doloribus atque quasi maiores? Earum placeat quia quisquam? Quidem odio in aspernatur repellat explicabo voluptate dolorum laudantium dicta quo iure.
                </p>
            </div>
            </Animated>  

            <div className='text-center'>
            <Animated animationIn="fadeIn" animationInDelay='150' isVisible={true}> 

                <h1 className={styles.h1NE}>Nuestro equipo</h1>
                </Animated>  

                <div className={`${styles.cardsAbout} `}>
                <Animated animationIn="fadeInUp" animationInDelay='150' isVisible={true}> 
                <div className={`${styles.cardAbout} card `}>
                    <img src="https://i.ibb.co/89859Sh/Colo-Henry.jpg" className={`card-img-top  ${styles.cardImg}`}/>

                    <div className={`card-body ${styles.bodyCard}`}>
                    <h5 class={`card-title ${styles.cardTitle}`}>Nicolas Velandia</h5>
                    <p class={`${styles.cardText} card-text`}>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" className={`${styles.linkedinButton}`}><AiFillLinkedin/></a>
                    </div>

                </div>
                </Animated>  
                <Animated animationIn="fadeInUp" animationInDelay='400' isVisible={true}> 
                <div className={`${styles.cardAbout} card `}>
                    <img src="https://i.ibb.co/0VWSxq2/Tongas-Henry.jpg" className={`card-img-top  ${styles.cardImg}`}/>

                    <div className={`card-body ${styles.bodyCard}`}>
                    <h5 class={`card-title ${styles.cardTitle}`}>Gastón Ferreyra</h5>
                    <p class={`${styles.cardText} card-text`}>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" className={`${styles.linkedinButton}`}><AiFillLinkedin/></a>
                    </div>

                </div>
                </Animated>  

                <Animated animationIn="fadeInUp" animationInDelay='700' isVisible={true}>
                <div className={`${styles.cardAbout} card `}>
                    <img src="https://i.ibb.co/WHBtr7D/Juan-Henry.jpg" className={`card-img-top  ${styles.cardImg}`}/>
                    <div className={`card-body ${styles.bodyCard}`}>
                    <h5 class={`card-title ${styles.cardTitle}`}>Juan Cruz Barneix</h5>
                    <p class={`${styles.cardText} card-text`}>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" className={`${styles.linkedinButton}`}><AiFillLinkedin/></a>
                    </div>
                </div>
                </Animated > 
                <Animated animationIn="fadeInUp" animationInDelay='1000' isVisible={true}>

                <div className={`${styles.cardAbout} card `}>
                    <img src="https://i.ibb.co/g93zwSF/Kenny-Henry.jpg" className={`card-img-top  ${styles.cardImg}`}/>

                    <div className={`card-body ${styles.bodyCard}`}>
                    <h5 class={`card-title ${styles.cardTitle}`}>Nicolas Kenny</h5>
                    <p class={`${styles.cardText} card-text`}>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" className={`${styles.linkedinButton}`}><AiFillLinkedin/></a>
                    </div>

                </div>
                </Animated > 

                <Animated animationIn="fadeInUp" animationInDelay='1300' isVisible={true}>
                <div className={`${styles.cardAbout} card `}>
                    <img src="https://i.ibb.co/w6wr2Ln/Fran-Henry-jpeg-1.png" className={`card-img-top  ${styles.cardImg}`}/>

                    <div className={`card-body ${styles.bodyCard}`}>
                    <h5 class={`card-title ${styles.cardTitle}`}>Francisco Zapiola</h5>
                    <p class={`${styles.cardText} card-text`}>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" className={`${styles.linkedinButton}`}><AiFillLinkedin/></a>
                    </div>

                </div>
                </Animated >
                <Animated animationIn="fadeInUp" animationInDelay='1600' isVisible={true}>
                
                <div className={`${styles.cardAbout} card `}>
                    <img src="https://i.ibb.co/ZVkMkGn/Exi-Henry.jpg" className={`card-img-top  ${styles.cardImg}`}/>

                    <div className={`card-body ${styles.bodyCard}`}>
                    <h5 class={`card-title ${styles.cardTitle}`}>Alexis Enriquez</h5>
                    <p class={`${styles.cardText} card-text`}>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" className={`${styles.linkedinButton}`}><AiFillLinkedin/></a>
                    </div>

                </div>
                </Animated >

                </div>
            </div>
        </div>
    )
}

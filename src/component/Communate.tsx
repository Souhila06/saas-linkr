import React from 'react';
import '../style/Communate.css'


const Communate = () => {
  return (
   <section className='section-cammunate'>
      <h2> Notre Communauté</h2>
   <div className='div-doublebox-info'>
   <div>
       
       <img src="/image/fleur.png"  width={"180px"} alt="" />
       <h3>Les demandeurs</h3>
       <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis atque at ipsum delectus, reprehenderit unde molestias aliquam quod voluptas ullam id exercitationem nostrum laboriosam minus minima beatae autem! Tenetur, dolorem.</p>
       <a className='abutton1' href="">Commencer</a>
       
   </div>
   <div>
       <img src="/image/fleur.png" width={"180px"} alt="" />
       <h3>Les offreurs</h3>
       <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis atque at ipsum delectus, reprehenderit unde molestias aliquam quod voluptas ullam id exercitationem nostrum laboriosam minus minima beatae autem! Tenetur, dolorem.</p>
       <a className='abutton2' href="">Commencer</a>
       
   </div>
   </div>
   </section>
  );
};

export default Communate;

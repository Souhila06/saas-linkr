import React from 'react';
import { Box, Typography, Container, Rating } from '@mui/material';
import '../style/Footer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faInstagram ,faFacebook, faTwitter} from '@fortawesome/free-brands-svg-icons';


const Footer = () => {
  return (
   <footer>
    <div >
    <div className={'fouter-flex'} >
        <ul>
            <li><h5>PAGES</h5></li>
            <li><a href="">Acceuil</a></li>
            <li><a href="">Nos services </a></li>
            <li><a href="">A propos </a></li>
            <li><a href="">Notre comunauté</a></li>
            <li><a href="">Avis clients </a></li>
        </ul>
        <ul>
            <li><h5>PAGES</h5></li>
            <li><a href="">Acceuil</a></li>
            <li><a href="">Nos services </a></li>
            <li><a href="">A propos </a></li>
            <li><a href="">Notre comunauté</a></li>
            <li><a href="">Avis clients </a></li>
        </ul><ul>
            <li><h5>PAGES</h5></li>
            <li><a href="">Acceuil</a></li>
            <li><a href="">Nos services </a></li>
            <li><a href="">A propos </a></li>
            <li><a href="">Notre comunauté</a></li>
            <li><a href="">Avis clients </a></li>
        </ul>

    
    </div>
   
        <div className='social-media'>
            <span>Follow Us</span>
            <a href="lien_de_votre_compte_instagram">
        <FontAwesomeIcon icon={faInstagram} style={{ color: '#0c0d0d', fontSize: '2em' }} />
      </a>
      <a href="lien_de_votre_compte_facebook">
        <FontAwesomeIcon icon={faFacebook} style={{ color: '#0c0d0d', fontSize: '2em' }} />
      </a>
      <a href="lien_de_votre_compte_twitter">
        <FontAwesomeIcon icon={faTwitter} style={{ color: '#0c0d0d' , fontSize: '2em'}} />
        </a>
        </div>
      
    </div>
    
   
    <div>
        <h3>Donnez votre avis</h3>
        <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
        <textarea  name="" id="" ></textarea>
        <a className='btn-envoyer' href="">envoyer</a>

    </div>
   
  
   </footer>
  );
};

export default Footer;

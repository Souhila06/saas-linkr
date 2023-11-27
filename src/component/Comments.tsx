import React from 'react';
import { Box, Typography, Container, Card, CardMedia, CardContent, Button, CardActions, createTheme } from '@mui/material';
import Carousel from 'react-multi-carousel';
import CardComments from './CardComment';


import 'react-multi-carousel/lib/styles.css';
import '../style/SectionChoice.css';
import '../style/Comments.css'


interface CustomCardProps {
  title: string;
  description: string;
}

const lightTheme = createTheme({ palette: { mode: 'light' } });

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};



const Comments: React.FC = () => (
  <section className="sectionChoice">
    <h2>Avis Clients</h2>
    <div style={{ margin: 'auto' , padding: '0 60px' }}>
    <Carousel responsive={responsive}  >
    <CardComments
    
    avatarSrc="/static/images/avatar/1.jpg"
    username="Souhila yousfi"
    rating={3}
    comment="Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica"
  />
  <CardComments
    
    avatarSrc="/static/images/avatar/1.jpg"
    username="Souhila yousfi"
    rating={3}
    comment="Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica"
  />
  <CardComments
    
    avatarSrc="/static/images/avatar/1.jpg"
    username="Souhila yousfi"
    rating={3}
    comment="Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica"
  />
      {/* Add more CustomCard components as needed */}
    </Carousel>
    </div>
 
  </section>
);

export default Comments;

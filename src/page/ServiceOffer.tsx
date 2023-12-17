import React, { useState } from 'react';
import SearchBar from '@mkyy/mui-search-bar';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, ThemeProvider, Typography, createTheme } from '@mui/material';
import Carousel from 'react-multi-carousel';
import '../style/Footer.css';
import CardInfo from '../component/CardInfo';
import Footer from '../component/Footer';
import NavBar from '../component/NavBar';

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

const CustomCard: React.FC<CustomCardProps> = ({ title, description }) => (
  <Card sx={{ maxWidth: 345 }}>
    <CardMedia
      sx={{ height: 140 }}
      image="/static/images/cards/contemplative-reptile.jpg"
      title="green iguana"
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small">Share</Button>
      <Button size="small">Learn More</Button>
    </CardActions>
  </Card>
);

const ServiceOffer: React.FC = () => {
  const [textFieldValue, setTextFieldValue] = useState('');

  const handleSearch = (newValue: string) => {

    console.log(newValue);
  };

  return (
     <>
        <NavBar/>  
 
     <section className="sectionChoice" style={{ backgroundColor: 'rgb(248, 248, 248)' }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <SearchBar
                  className='searchbar'
                  width={'57%'}
                  value={textFieldValue}
                  onChange={(newValue) => setTextFieldValue(newValue)}
                  onSearch={handleSearch} />
          </div>
          <h2 style={{ color: 'black', textAlign: 'left' }}>Nos services populaire</h2>
          <div style={{ margin: 'auto', padding: '0 60px', marginBottom: '20px' }}>
              <Carousel responsive={responsive}>
                  <CustomCard title="Title 1" description="Description of the card 1." />
                  <CustomCard title="Title 2" description="Description of the card 2." />
                  <CustomCard title="Title 3" description="Description of the card 3." />
                  <CustomCard title="Title 4" description="Description of the card 4." />

              </Carousel>
          </div>
          <h2 style={{ color: 'black', textAlign: 'left' }}>services interessant</h2>
          <div style={{ margin: 'auto', padding: '0 60px' }}>
              <Carousel responsive={responsive}>
                  <CustomCard title="Title 1" description="Description of the card 1." />
                  <CustomCard title="Title 2" description="Description of the card 2." />
                  <CustomCard title="Title 3" description="Description of the card 3." />
                  <CustomCard title="Title 4" description="Description of the card 4." />

              </Carousel>
          </div>
          <h2 style={{ color: 'black', textAlign: 'left' }}>autre service</h2>
          <div style={{ margin: 'auto', padding: '0 60px' }}>
              <Carousel responsive={responsive}>
                  <CustomCard title="Title 1" description="Description of the card 1." />
                  <CustomCard title="Title 2" description="Description of the card 2." />
                  <CustomCard title="Title 3" description="Description of the card 3." />
                  <CustomCard title="Title 4" description="Description of the card 4." />

              </Carousel>
          </div>
      </section>
      <Footer />
      </>

  );
};


export default ServiceOffer;

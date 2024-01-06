import React, { useState, useEffect } from 'react';
import SearchBar from '@mkyy/mui-search-bar';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, ThemeProvider, Typography, createTheme } from '@mui/material';
import Carousel from 'react-multi-carousel';
import '../style/Footer.css';
import CardInfo from '../component/CardInfo';
import Footer from '../component/Footer';
import NavBar from '../component/NavBar';
import { useListOffreursQuery } from '../services/authApi';
interface CustomCardProps {
  lname: string;
  fname: string;
  apropos: string;
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

const CustomCard: React.FC<CustomCardProps> = ({ fname, lname, apropos }) => (
  <Card sx={{ maxWidth: 345 }}>
    <CardMedia
      sx={{ height: 140 }}
      image="/static/images/cards/contemplative-reptile.jpg"
      title="green iguana"
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        {fname}  {lname}
      </Typography>

      <Typography variant="body2" color="text.secondary">
        {apropos}
      </Typography>
    </CardContent>
    <CardActions>

      <Button size="small" style={{ color: 'black' }}>Show More</Button>
    </CardActions>
  </Card>
);
interface Offreur {
  id: number;
  fname: string;
  lname: string
  description: string;
  apropos: string;
  // Add other properties as needed
}
const ServiceOffer: React.FC = () => {
  const [textFieldValue, setTextFieldValue] = useState('');

  const handleSearch = (newValue: string) => {

    console.log(newValue);
  };
  const { data: listOffreurs } = useListOffreursQuery({});
  useEffect(() => {
    // Log the data to the console when it changes
    console.log('Liste des Offreurs:', listOffreurs);
  }, [listOffreurs]);

  return (
    <>
      <NavBar />

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

        <div style={{ display: 'flex' }}>
          <Grid container spacing={3} style={{ marginRight: '10px' }}>
            {listOffreurs && listOffreurs.map((offreur: Offreur) => (
              <Grid item key={offreur.id} xs={12} sm={6} md={4} lg={10}>
                <CustomCard
                  apropos={offreur.apropos}
                  fname={offreur.fname}
                  lname={offreur.lname}
                />
              </Grid>
            ))}
          </Grid>

          <Grid container spacing={3} style={{ marginLeft: '10px' }}>
            {listOffreurs && listOffreurs.map((offreur: Offreur) => (
              <Grid item key={offreur.id} xs={12} sm={6} md={4} lg={10}>
                <CustomCard
                  apropos={offreur.apropos}
                  fname={offreur.fname}
                  lname={offreur.lname}
                />
              </Grid>
            ))}
          </Grid>

          <Grid container spacing={3} style={{ marginLeft: '10px' }}>
            {listOffreurs && listOffreurs.map((offreur: Offreur) => (
              <Grid item key={offreur.id} xs={12} sm={6} md={4} lg={10}>
                <CustomCard
                  apropos={offreur.apropos}
                  fname={offreur.fname}
                  lname={offreur.lname}
                />
              </Grid>
            ))}
          </Grid>
          
          
        </div>

      </section>
      <Footer />
    </>

  );
};


export default ServiceOffer;

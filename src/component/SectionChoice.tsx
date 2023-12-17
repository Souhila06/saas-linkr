import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Button, Card, CardActions, CardContent, CardMedia, Typography, createTheme } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import '../style/SectionChoice.css'

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

const CustomCard: React.FC<CustomCardProps> = ({  }) => (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image="/static/images/cards/contemplative-reptile.jpg"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
);



const SectionChoice: React.FC = () => (
  <section className="sectionChoice">
    <h2>Nos services</h2>
    <div style={{ margin: 'auto' , padding: '0 60px' }}>
    <Carousel responsive={responsive}  >
      <CustomCard title="Title 1" description="Description of the card 1." />
      <CustomCard title="Title 2" description="Description of the card 2." />
      <CustomCard title="Title 3" description="Description of the card 3." />
      <CustomCard title="Title 3" description="Description of the card 3." />
      <CustomCard title="Title 3" description="Description of the card 3." />
      <CustomCard title="Title 3" description="Description of the card 3." />
      {/* Add more CustomCard components as needed */}
    </Carousel>
    </div>
 
  </section>
);

export default SectionChoice;

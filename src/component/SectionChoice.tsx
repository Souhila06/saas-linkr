import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Button, Card, CardActions, CardContent, CardMedia, Chip, Stack, Typography, createTheme } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import '../style/SectionChoice.css'
import StarIcon from '@mui/icons-material/Star';
import LocationOnIcon from '@mui/icons-material/LocationOn';

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
  <Card sx={{ height: '100%', margin: '10px' }}>
  <CardMedia
    sx={{ height: 140 }}
    image="/static/images/cards/contemplative-reptile.jpg"
    title="green iguana"
  />
  <CardContent sx={{ padding: 2 }}>
    <Typography gutterBottom variant="h5" component="div">
      Yousfi Souhila
    </Typography>
    <Typography variant="body2" color="text.secondary"  sx={{
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      width: '250px',
      fontStyle: 'italic',
      paddingBottom: 1,
      height: '1.2em'
    }}>
      Developpeur backend recat et node js
    </Typography>
    <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', paddingBottom: 1 }}>
      <LocationOnIcon sx={{ marginRight: 1 }} /> France,paris 27000
    </Typography>
    <Stack direction="row" spacing={1} sx={{ paddingBottom: 1 }}>
      
        <Chip label='JAVA' />
    
    </Stack>
    <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
      <StarIcon sx={{ marginRight: 1 }} /> Nombre Evaluations: 2
    </Typography>
  </CardContent>

  <CardActions>
    <Button size="small" style={{ color: 'black' }}>
      Show More
    </Button>
  </CardActions>
</Card>

);




const CustomCard2: React.FC<CustomCardProps> = ({  }) => (
  <Card sx={{ height: '100%', margin: '10px' }}>
  <CardMedia
    sx={{ height: 140 }}
    image="/static/images/cards/contemplative-reptile.jpg"
    title="green iguana"
  />
  <CardContent sx={{ padding: 2 }}>
    <Typography gutterBottom variant="h5" component="div">
      Messaoudene Hadjer
    </Typography>
    <Typography variant="body2" color="text.secondary"  sx={{
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      width: '250px',
      fontStyle: 'italic',
      paddingBottom: 1,
      height: '1.2em'
    }}>
      Developpeur backend recat et node js
    </Typography>
    <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', paddingBottom: 1 }}>
      <LocationOnIcon sx={{ marginRight: 1 }} /> France,paris 27000
    </Typography>
    <Stack direction="row" spacing={1} sx={{ paddingBottom: 1 }}>
      
        <Chip label='PHP' />
        
        <Chip label='JAVA' />
    
    </Stack>
    <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
      <StarIcon sx={{ marginRight: 1 }} /> Nombre Evaluations: 3
    </Typography>
  </CardContent>

  <CardActions>
    <Button size="small" style={{ color: 'black' }}>
      Show More
    </Button>
  </CardActions>
</Card>

);


const CustomCard3: React.FC<CustomCardProps> = ({  }) => (
  <Card sx={{ height: '100%', margin: '10px' }}>
  <CardMedia
    sx={{ height: 140 }}
    image="/static/images/cards/contemplative-reptile.jpg"
    title="green iguana"
  />
  <CardContent sx={{ padding: 2 }}>
    <Typography gutterBottom variant="h5" component="div">
      Dagmawit Achnafi
    </Typography>
    <Typography variant="body2" color="text.secondary"  sx={{
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      width: '250px',
      fontStyle: 'italic',
      paddingBottom: 1,
      height: '1.2em'
    }}>
      Developpeur backend recat et node js
    </Typography>
    <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', paddingBottom: 1 }}>
      <LocationOnIcon sx={{ marginRight: 1 }} /> France,paris 27000
    </Typography>
    <Stack direction="row" spacing={1} sx={{ paddingBottom: 1 }}>
      
        <Chip label='Python' />
    
    </Stack>
    <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
      <StarIcon sx={{ marginRight: 1 }} /> Nombre Evaluations: 1
    </Typography>
  </CardContent>

  <CardActions>
    <Button size="small" style={{ color: 'black' }}>
      Show More
    </Button>
  </CardActions>
</Card>

);



const SectionChoice: React.FC = () => (
  <section className="sectionChoice">
    <h2>Nos services</h2>
    <div style={{ margin: 'auto' , padding: '0 60px' }}>
    <Carousel responsive={responsive}  >
      <CustomCard title="Title 1" description="Description of the card 1." />
      <CustomCard title="Title 1" description="Description of the card 1." />
      <CustomCard2 title="Title 1" description="Description of the card 1." />
      <CustomCard3 title="Title 1" description="Description of the card 1." />
      <CustomCard title="Title 1" description="Description of the card 1." />

      {/* Add more CustomCard components as needed */}
    </Carousel>
    </div>
 
  </section>
);

export default SectionChoice;

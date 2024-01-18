import React, { useState, useEffect } from 'react';
import SearchBar from '@mkyy/mui-search-bar';
import { Autocomplete, Box, Button, Card, CardActions, CardContent, CardMedia, Chip, Grid, Stack, TextField, ThemeProvider, Typography, createTheme } from '@mui/material';
import Carousel from 'react-multi-carousel';
import '../style/Footer.css';
import CardInfo from '../component/CardInfo';
import Footer from '../component/Footer';
import NavBar from '../component/NavBar';
import StarIcon from '@mui/icons-material/Star';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MailOutlineIcon from '@mui/icons-material/MailOutline';


import { useListOffreursQuery } from '../services/authApi';
const defaultTheme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-input': {
            color: '#000000',
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#3B556D',
            },
            '&:hover fieldset': {
              borderColor: '#3B556D',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#3B556D',
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#5FC2BA',
          '&:hover': {
            backgroundColor: '#3B556D',
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: '#3B556D',
          '&.Mui-checked': {
            color: '#3B556D',
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#000000', // Couleur du label par défaut
          '&.Mui-focused': {
            color: '#000000', // Couleur du label en état de focus
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: '#000000',
          textDecoration: 'none',
          '&:hover': {
            textDecoration: 'none',
            color: '#000000 !important',
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          '&:focus': {
            borderColor: '#3B556D !important',
          },
        },
      },
    },
  },
});



interface CustomCardProps {

  fname: string;
  lname: string;
  apropos: string;
  country: string;
  city: string;
  zip: string;
  skills: {
    level: number;
    skill: {
      label: string;
    };
  }[];
  _count: {
    evaluations: number;
  };

}
const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength) + '...';
};

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

const CustomCard: React.FC<CustomCardProps> = ({ fname, lname, apropos, skills, city, country, zip, _count }) => (
  <Card sx={{ height: '100%' }}>
    <CardMedia
      sx={{ height: 140 }}
      image="/static/images/cards/contemplative-reptile.jpg"
      title="green iguana"
    />
    <CardContent sx={{ padding: 2 }}>
      <Typography gutterBottom variant="h5" component="div">
        {fname} {lname}
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
        {apropos}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', paddingBottom: 1 }}>
        <LocationOnIcon sx={{ marginRight: 1 }} /> {country}, {city} {zip}
      </Typography>
      <Stack direction="row" spacing={1} sx={{ paddingBottom: 1 }}>
        {skills.map((skill, index) => (
          <Chip key={index} label={skill.skill.label} />
        ))}
      </Stack>
      <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
        <StarIcon sx={{ marginRight: 1 }} /> Nombre Evaluations: {_count.evaluations}
      </Typography>
    </CardContent>

    <CardActions>
      <Button size="small" style={{ color: 'black' }}>
        Show More
      </Button>
    </CardActions>
  </Card>
  
);
interface Offreur {
  id: number;
  fname: string;
  lname: string;
  apropos: string;
  country: string;
  city: string;
  zip: string;
  skills: {
    level: number;
    skill: {
      label: string;
    };
  }[];
  _count: {
    evaluations: number;
  };
  // Add other properties as needed
}
const ServiceOffer: React.FC = () => {
  const [textFieldValue, setTextFieldValue] = useState('');

  const handleSearch = (newValue: string) => {

    console.log(newValue);
  };
  const { data: listOffreurs } = useListOffreursQuery({});
  useEffect(() => {

    console.log('Liste des Offreurs:', listOffreurs);
  }, [listOffreurs]);
  const [offreur, setOfferors] = useState<Offreur[]>([]);


  const [searchTerm, setSearchTerm] = useState<string>('')
  const [filteredOfferors, setFilteredOfferors] = useState<Offreur[]>([]);
  const [allOfferors, setAllOfferors] = useState<Offreur[]>([]);

  useEffect(() => {
    loadAllOfferors();
  }, []);

  useEffect(() => {

    loadAllOfferors();
  }, []);

  const loadAllOfferors = async () => {
    try {
      const storedToken = localStorage.getItem('accessToken');
      if (!storedToken) {
        console.error('No access token found');
        return;
      }

      const response = await fetch(`http://localhost:8080/api/offreurs/search?fname=${searchTerm}`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,

        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('All Offerors:', data);
        setAllOfferors(data);
      } else {
        console.error('Error fetching all offerors:', response.statusText);
      }
    } catch (error) {
      console.error('Error during fetch:', error);
    }
  };

  const handleSearchClick = () => {
    // Filtrez les offreurs en fonction du prénom
    const filteredData = allOfferors.filter((offreur) =>
      offreur.fname.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredOfferors(filteredData);
  };

  return (
    <>
      <NavBar />

      <section className="sectionChoice" style={{ backgroundColor: 'rgb(248, 248, 248)' }}>
      <h2 style={{color:"black"}}>Nos Services</h2>
        <div style={{ padding: '20px' }}>
        <ThemeProvider theme={defaultTheme}>
        
          <div style={{ }}> 
           <div style={{ display: 'flex',alignItems: 'center', justifyContent: 'center' , gap: '20px'}}>
           <TextField
              label="Enter First Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ outline: 'none' }}
            />
             <TextField
              label="Enter Last Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ outline: 'none' }}
            />
             <TextField
              label="Enter Description"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ outline: 'none' }}
            />
             <TextField
              label="Enter Country"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ outline: 'none' }}
            />
             <TextField
              label="Enter City"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ outline: 'none' }}
            />
           </div>
           <div  style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}} >
           <Button variant="contained" onClick={handleSearchClick}>
              Search
            </Button>
           </div>

          </div>
          </ThemeProvider>
    

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridGap: '10px', gridAutoRows: 'minmax(100px, auto)', paddingTop: '50px', paddingBottom: '50px' }}> {(filteredOfferors.length > 0 ? filteredOfferors : allOfferors).map((offreur) => (
            <Grid item key={offreur.id} xs={12} sm={6} md={4} lg={10}>
              <CustomCard
                apropos={offreur.apropos}
                fname={offreur.fname}
                lname={offreur.lname}
                skills={
                  offreur.skills.length > 0
                    ? [
                      {
                        level: offreur.skills[0].level,
                        skill: {
                          label: offreur.skills[0].skill.label,
                        },
                      },
                    ]
                    : []
                }
                country={offreur.country}
                city={offreur.city}
                zip={offreur.zip}
                _count={offreur._count}

              />
              
            </Grid>
            
          ))
          }</div>


        </div>


      </section>
      <Footer />
    </>

  );
};


export default ServiceOffer;

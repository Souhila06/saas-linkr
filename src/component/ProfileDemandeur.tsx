import React, { useState } from 'react';
import { TextField, Button, Grid, Checkbox, FormControlLabel, Box, Container, CssBaseline, Link, createTheme, ThemeProvider, Typography, Card, CardContent, Input } from '@mui/material';
import Footer from '../component/Footer';
import NavBar from '../component/NavBar';


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
            color: '#000000',
            '&.Mui-focused': {
              color: '#3B556D', 
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
  
  
const ProfileDemandeur: React.FC = () => {

    const [demandeurInfo, setDemandeurInfo] = useState({
        fname: '',
        lname: '',
        phone: '',
        email: '',
        address: '',
        country: '',
        city: '',
        zip: '',
    });

    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setDemandeurInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();


        console.log('Informations du demandeur:', demandeurInfo);
    };

    return (
        <><NavBar />
         <ThemeProvider theme={defaultTheme}>
            <Card  style={{ marginBottom: '70px', marginTop: '70px', paddingBottom: '30px',  borderRadius: '20px' }}>
      <CardContent>
        <Typography variant="h5" gutterBottom sx={{textAlign:'center'}}>
          Mon Profile
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField label="First Name" fullWidth    value={demandeurInfo.fname}
             onChange={handleChange} />
          
          </Grid>
          
          <Grid item xs={6}>
            <TextField label="Last Name" fullWidth value={demandeurInfo.lname} onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Email" fullWidth  value={demandeurInfo.email} onChange={handleChange} />
          </Grid>
          <Grid item xs={6}>
          <TextField
                type="file"
               
                inputProps={{ accept: 'image/*' }}
                // onChange={handleImageChange}
                fullWidth
                InputLabelProps={{ style: { color: '#000000' } }}
              />
            </Grid>
            <Grid item xs={6}>
            <TextField label="Adresse" fullWidth  value={demandeurInfo.address} onChange={handleChange} />
          </Grid>

          <Grid item xs={6}>
            <TextField label="Country" fullWidth  value={demandeurInfo.country} onChange={handleChange} />
          </Grid>
          <Grid item xs={6}>
            <TextField label="City" fullWidth value={demandeurInfo.city} onChange={handleChange} />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Zip" fullWidth  value={demandeurInfo.zip} onChange={handleChange} />
          </Grid>
        </Grid>
      </CardContent>
      <Grid container justifyContent="center">
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: '16px' }}
        >
          Envoyer
        </Button>
        </Grid>
    </Card>
    </ThemeProvider>
      </>
  );
};
export default ProfileDemandeur;
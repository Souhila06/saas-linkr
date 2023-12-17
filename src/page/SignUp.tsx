import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { InputLabel } from '@mui/material';



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




const countries = [
  { value: 'fr', label: 'France' },
  { value: 'usa', label: 'United States of America' },
  { value: 'canada', label: 'Canada' },
  { value: 'uk', label: 'United Kingdom' },
];

interface SignUpProps {
  type: string;
}

const SignUp: React.FC<SignUpProps> = ({ type }) => {

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };
  const [selectedCountry, setSelectedCountry] = React.useState('');

  const handleChange = (event: { target: { value: any; }; }) => {
    setSelectedCountry(event.target.value);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="sm" style={{ marginBottom: '70px', marginTop: '70px', paddingBottom: '30px', border: '1px solid black', borderRadius: '20px' }}>

        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          
          <Typography component="h1" variant="h5">
            Sign up {type}
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField 
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  InputProps={{ style: { color: '#000000' } }}
                  InputLabelProps={{ style: { color: '#000000' } }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  InputProps={{ style: { color: '#000000' } }}
                  InputLabelProps={{ style: { color: '#000000' } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  InputProps={{ style: { color: '#000000' } }}
                  InputLabelProps={{ style: { color: '#000000' } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  InputProps={{ style: { color: '#000000' } }}
                  InputLabelProps={{ style: { color: '#000000' } }}
                />
              </Grid>
              <Grid item xs={12}>
              <FormControl fullWidth sx={{ '& .MuiOutlinedInput-notchedOutline': { borderColor: '#3B556D !important' } }}>
              <InputLabel id="demo-simple-select-label" sx={{ color: '#000000' }}>Country</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedCountry}
                label="Country"
                onChange={handleChange}
                inputProps={{ style: { color: '#000000' } }}
                sx={{ '&:focus': { borderColor: '#3B556D !important' } }} 
            
              >
                {countries.map((country) => (
                  <MenuItem key={country.value} value={country.value}>
                    {country.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
              </Grid>
              
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
              <Link href="#" variant="body2"  style={{ color: '#000000' }}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
   
      </Container>
    </ThemeProvider>
  );
}

export default SignUp;
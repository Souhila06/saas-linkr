import React, { useState } from 'react';
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
import { useRegisterUserMutation } from '../services/authApi';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { InputLabel } from '@mui/material';
import { Navigate, useNavigate } from 'react-router-dom';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react'
import { SerializedError } from '@reduxjs/toolkit/';



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
interface User {
  username: string;
  email: string;
  role: string;
}

interface LoginResponse {
  data?: { token: string, user: User };
  error?: FetchBaseQueryError | SerializedError;
}


const countries = [
  { value: 'fr', label: 'France' },
  { value: 'usa', label: 'United States of America' },
  { value: 'canada', label: 'Canada' },
  { value: 'uk', label: 'United Kingdom' },
];

interface SignUpProps {
  role: 'offreur' | 'demandeur';
}

const SignUp: React.FC<SignUpProps> = ({ role }) => {

  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   console.log('username:', username);
  //   console.log('Email:', email);
  //   console.log('Password:', password);

  // };
  const [selectedCountry, setSelectedCountry] = React.useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);



  const [username, setusername] = useState('');
  // const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [role, setRole] = useState('');

  const [registerUser,
    {
      data: registerData,
      isSuccess: isRegisterSuccess,
      isError: isRegisterError,
      error: registerError,
    }
  ] = useRegisterUserMutation();

  const handleRegister = async () => {
    if (username && password && email && (role === "demandeur" || role === "offreur")) {
      const response = await registerUser({
        username,
        email,
        password,
        role,
      });
      if ('data' in response) {
        if (response.data.accessToken) {
          const token = response.data.accessToken;
          const user = response.data.user;


          const username = user.username;
          const email = user.email;
          const role = user.role;

          localStorage.setItem('accessToken', token);
          localStorage.setItem('user', JSON.stringify(user));

          console.log('Utilisateur enregistré avec succès.');
        } else {
          console.log('Erreur lors de l\'enregistrement : pas de jeton d\'accès.');
        }
      } else {
        console.log('Erreur lors de l\'enregistrement : la propriété \'data\' n\'existe pas dans la réponse.');
      }
    } else {
      console.log('Veuillez remplir les champs requis');
    }
  };

  const navigate = useNavigate();
  React.useEffect(() => {
    if (isRegisterSuccess) {
      
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
        navigate("/");
      }, 8000);
    } else {
      // Afficher un message d'erreur si l'inscription échoue
      setShowErrorMessage(true);
      setTimeout(() => {
        setShowErrorMessage(false);
      }, 8000);
    }
  }, [isRegisterSuccess, navigate]);


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
            Sign up {role}
          </Typography>
          <Box component="form" noValidate /*onSubmit={handleSubmit}*/ sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="given-name"
                  name="username"
                  required
                  fullWidth
                  id="username"
                  label="username"
                  autoFocus
                  InputProps={{ style: { color: '#000000' } }}
                  InputLabelProps={{ style: { color: '#000000' } }}
                  value={username}
                  onChange={(e) => setusername(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                {/* <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  InputProps={{ style: { color: '#000000' } }}
                  InputLabelProps={{ style: { color: '#000000' } }}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                /> */}
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>

              {/* <Grid item xs={12}>
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
              </Grid> */}

              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button

              fullWidth
              id='sign-btn'
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => handleRegister()}
            >
              Sign Up
            </Button>
            {showSuccessMessage && (
              <div style={{ color: 'green' }}>
                User created successfully. Please check your email
              </div>
            )}
            {showErrorMessage && (
              <div style={{ color: 'red' }}>
                Registration failed. Please try again.
              </div>
            )}
          


          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="#" variant="body2" style={{ color: '#000000' }}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>

    </Container>
    </ThemeProvider >
  );
}

export default SignUp;
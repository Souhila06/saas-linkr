import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useLoginUserMutation, useForgotPasswordMutation  } from '../services/authApi';
import { TonalitySharp } from '@mui/icons-material';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react'
import { SerializedError } from '@reduxjs/toolkit/';
import { Navigate, useNavigate } from 'react-router-dom';







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
  },
});


const initialState = {
  username: "",
  password: "",
  email: "",

};

interface LoginResponse {
  data?: { accessToken: string , username:string};
  error?: FetchBaseQueryError | SerializedError;
}

export default function SignIn() {
  const [formValue, setFormValue] = useState(initialState);
  const [emailSent, setEmailSent] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const navigate= useNavigate();
  const { username, password, email} = formValue;
  const [loginUser,
    {
      data: loginData,
      isSuccess: isLoginSuccess,
      isError: isLoginError,
      error:loginError,
    }
  ] = useLoginUserMutation();

  const [forgotPassword] = useForgotPasswordMutation();
  const handleLogin = async () => {
    if (!showForgotPassword && (username && password)) {
      const response: LoginResponse = await loginUser({
        username,
        password,
      });
      if (response.data && response.data.accessToken ) {

        const token = response.data.accessToken;
        const username = response.data.username;
        localStorage.setItem('accessToken', token);
        localStorage.setItem('username', username);

        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 3000); 
      } else {
        console.log('Token introuvable dans la réponse');
      }
    } else {
      console.log('Veuillez remplir les champs requis');
    }
  };
        
      
  const [showAlert, setShowAlert] = useState(false);
  React. useEffect(() => {
    if (isLoginSuccess) {
     navigate("/");
    }
  }, [isLoginSuccess]);


  const handleChange=(e:any)=>{
    setFormValue({... formValue, [e.target.name]: e.target.value})
  };

  


  const handleForgotPassword = async () => {
    if (email) {
      await forgotPassword({ email });
      console.log(`Email sent to ${email}`);
    } else {
      console.log('Veuillez fournir une adresse e-mail pour la réinitialisation du mot de passe');
    }
  };

  
  return (
    
    <ThemeProvider theme={defaultTheme}>
    <Container component="main" maxWidth="sm" style={{ marginBottom: '70px', marginTop: '70px', paddingBottom: '30px', border: '1px solid black', borderRadius: '20px' }}>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5" style={{ color: '#3B556D' }}>
          Sign in
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          {!showForgotPassword && (
            <>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="User Name"
                name="username"
                value={username}
                onChange={handleChange}
                autoComplete="email"
                autoFocus
                InputProps={{ style: { color: '#000000' } }}
                InputLabelProps={{ style: { color: '#000000' } }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={password}
                onChange={handleChange}
                autoComplete="current-password"
                InputProps={{ style: { color: '#000000' } }}
                InputLabelProps={{ style: { color: '#000000' } }}
              />
            </>
          )}
          {showForgotPassword && (
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={email}
              onChange={handleChange}
              autoComplete="email"
              InputProps={{ style: { color: '#000000' } }}
              InputLabelProps={{ style: { color: '#000000' } }}
            />
          )}
          {!showForgotPassword && (
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
          )}
          {!showForgotPassword && (
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => handleLogin()}
            >
              Sign In
            </Button>
          )}
          {!showForgotPassword && (
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2" style={{ color: '#000000' }} onClick={() => setShowForgotPassword(true)}>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2" style={{ color: '#000000' }}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          )}
           
            {showForgotPassword && (
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => handleForgotPassword()}
              >
                Send Reset Email
              </Button>
            )}
             <div style={{ display: showAlert ? 'block' : 'none', marginTop: '10px', padding: '10px', backgroundColor: 'green', color: 'white', borderRadius: '5px' }}>
              User login Successfully
            </div>
        </Box>
      </Box>
    </Container>
  </ThemeProvider>
  );
}
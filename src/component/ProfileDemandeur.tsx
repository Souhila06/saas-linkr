import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Grid, Checkbox, FormControlLabel, Box, Container, CssBaseline, Link, createTheme, ThemeProvider, Typography, Card, CardContent, Input, IconButton, Avatar } from '@mui/material';
import Footer from '../component/Footer';
import NavBar from '../component/NavBar';
import { useListDemandeursQuery, useCreateDemandeurMutation, useModifyDemandeurMutation,useDeleteDemandeurMutation  } from '../services/authApi';
import { User } from '../page/SignIn';

import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react'
import { SerializedError } from '@reduxjs/toolkit/';

interface Demandeur {
  id: number;
  fname: string;
  lname: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  zip: string;
  country: string;
  user: Omit<User, "email" | "password" | "role">;
}

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

interface Response {
  data?: { token: string, user: User };
  error?: FetchBaseQueryError | SerializedError;

}
const ProfileDemandeur: React.FC = () => {


  const [username, setUsername] = useState<string | null>(null);
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const handleFieldChange = (fieldName: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setDemandeurInfo((prevInfo) => ({
      ...prevInfo,
      [fieldName]: e.target.value,
    }));
  };



  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();


    console.log('Informations du demandeur:', demandeurInfo);
  };


  useEffect(() => {

    const storedToken = localStorage.getItem('accessToken');
    if (storedToken) {
      setAccessToken(storedToken);


      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        setUsername(user.username);
      }
    }
  }, []);
  const { data: listDemandeurs, error: listDemandeursError } = useListDemandeursQuery({});

  // État local pour stocker la liste des demandeurs
  const [demandeurs, setDemandeurs] = useState<Demandeur[]>([]);
  useEffect(() => {

    if (listDemandeurs) {
      console.log('Liste des Demandeurs:', listDemandeurs);

      setDemandeurs(listDemandeurs);
    } else if (listDemandeursError) {
      console.error('Erreur lors de la récupération de la liste des demandeurs:', listDemandeursError);
    }
  }, [listDemandeurs, listDemandeursError]);
  let userString = localStorage.getItem('user');
  let user = userString ? JSON.parse(userString) : null;
  const userDemandeurNotNull = user && user.demandeur !== null;

const [isDemandeurNotNull, setIsDemandeurNotNull] = useState<boolean>(userDemandeurNotNull);
  // create demandeur 
  const [createDemandeurMutation] = useCreateDemandeurMutation();
  const handleSave = async () => {
    try {
      const response: Response = await createDemandeurMutation(demandeurInfo);
      // repmlcer nouvelle valeu de demandeur dans local storage 
      user.demandeur = response.data;
      localStorage.setItem('user', JSON.stringify(user));
      
      console.log(user)
      console.log('Demandeur créé avec succès:', response);

      setIsDemandeurNotNull(true)


    } catch (error) {
      console.error('Erreur lors de la création du demandeur:', error);
    }
  };
  // uppdate demandeur 
  // Example of useModifyDemandeurMutation hook
const [modifyDemandeurMutation, { data, error }] = useModifyDemandeurMutation();


const handleModify = async () => {
  try {
  
       
    const response = await modifyDemandeurMutation(demandeurInfo);

    console.log(response)
    if (data) {
   
      
      // Mise à jour des informations dans le localStorage 
      // user.demandeur = modifiedDemandeur;
      // localStorage.setItem('user', JSON.stringify(user));

      console.log('Demandeur modifié avec succès:', data);
    } else if (error) {
      console.error('Erreur lors de la modification du demandeur:', error);
    }
  } catch (error) {
    console.error('Erreur lors de la modification du demandeur:', error);
  }
};

  // delete demandeur 
  
  const [deleteDemandeurMutation] = useDeleteDemandeurMutation();

  const handleDelete = async () => {
   
      try {
   
        const response = await deleteDemandeurMutation(Number(user.demandeur.id));
  
        if ('data' in response) {

          console.log('Demandeur supprimé avec succès:', response.data);
     
          setDemandeurInfo({
            id: "",
            fname: "",
            lname: "",
            phone: "",
            address: "",
            country: "",
            city: "",
            zip: "",
          });
          user.demandeur = null;
          setIsDemandeurNotNull(false)

          localStorage.setItem('user', JSON.stringify(user));
        } else {
          console.error('Erreur lors de la suppression du demandeur:', response.error);
        }
      } catch (error) {
        console.error('Erreur lors de la suppression du demandeur:', error);
      }
    } 
  
  
  const [demandeurInfo, setDemandeurInfo] = useState({
    id: user.demandeur?.id ? String(user.demandeur.id) : "",
    fname: user.demandeur?.fname || "",
    lname: user.demandeur?.lname || "",
    phone: user.demandeur?.phone || "",
    address: user.demandeur?.address || "",
    country: user.demandeur?.country || "",
    city: user.demandeur?.city || "",
    zip: user.demandeur?.zip || "",
  });
  

  return (
    <><NavBar />
      <div style={{ display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
        <ThemeProvider theme={defaultTheme}>
          <Card style={{ marginBottom: '70px', marginTop: '70px', paddingBottom: '30px', maxWidth: '700px', padding: '50px' }}>
            <div>
              <div>
                <Grid container spacing={2} justifyContent="center">


                  <Grid item xs={10}>
                    <Typography variant="h5" gutterBottom sx={{ textAlign: 'center', marginBottom: '20px' }}>
                      Mon Profil
                    </Typography>
                    <input
                      accept="image/*"
                      style={{ display: 'none' }}
                      id="icon-button-file"
                      type="file"
                    />
                    <label htmlFor="icon-button-file" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '30px' }}>
                      <IconButton color="primary" component="span">
                        <Avatar sx={{ width: 100, height: 100 }}>
                          {username ? username[0].toUpperCase() : ''}
                        </Avatar>
                      </IconButton>
                    </label>
                  </Grid>
                </Grid>
              </div>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    label="First Name"
                    fullWidth
                    value={demandeurInfo.fname}
                    onChange={handleFieldChange("fname")}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    label="Last Name"
                    fullWidth
                    value={demandeurInfo.lname}
                    onChange={handleFieldChange("lname")}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    label="Adresse"
                    fullWidth
                    value={demandeurInfo.address}
                    onChange={handleFieldChange("address")}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    label="Country"
                    fullWidth
                    value={demandeurInfo.country}
                    onChange={handleFieldChange("country")}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    label="City"
                    fullWidth
                    value={demandeurInfo.city}
                    onChange={handleFieldChange("city")}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    label="Zip"
                    fullWidth
                    value={demandeurInfo.zip}
                    onChange={handleFieldChange("zip")}
                  />
                </Grid>
              </Grid>

            </div>
            <Grid container justifyContent="center">
              {isDemandeurNotNull ? (
                // Afficher le bouton Modify si le champ 'demandeur' n'est pas null
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={{ marginTop: '30px' }}
                  onClick={handleModify}
                >
                  Modify
                </Button>
              ) : (

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={{ marginTop: '30px' }}
                  onClick={handleSave}
                >
                  save
                </Button>



              )}
                {!!isDemandeurNotNull && (
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ marginTop: '30px' }}
                onClick={handleDelete}
              >
                Delete
              </Button>
                )}
            </Grid>
              
          </Card>
        </ThemeProvider>
      </div>
    </>
  );
};
export default ProfileDemandeur;
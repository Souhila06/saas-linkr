import { Box, Button, Dialog, DialogActions, DialogTitle, Grid, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';

interface AddFormProps {
  closeEvent: () => void;

}
const createUser = (nom: string, titre: string, email: string, telephone: string) => {

  console.log('Nom:', nom);
  console.log('Titre:', titre);
  console.log('Email', email);
  console.log('Téléphone:', telephone);



};

const AddForm: React.FC<AddFormProps> = ({ closeEvent }) => {
  const [nom, setNom] = useState('');
  const [titre, setTitre] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');


  const [showDialog, setShowDialog] = useState(false);

  const handleSubmit = () => {

    if (nom && titre && email && telephone) {
      setShowDialog(true);

    } else {

      window.alert('Veuillez remplir tous les champs.');
    }
  };

  const handleCloseDialog = () => {

    setShowDialog(false);
    setNom('');
    setTitre('');
    setEmail('');
    setTelephone('');
    closeEvent();

  };

  return (
    <>
      <Box sx={{ m: 2 }} />
      <Typography variant="h5" align="center" >
        Ajouter
      </Typography>
      <IconButton style={{ position: "absolute", top: "0", right: "0" }}
        onClick={closeEvent}
      >
        <CloseIcon />
      </IconButton>
      <Box height={20} />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField id="outlined-basic" label="Nom" variant="outlined" size="small" sx={{
            minWidth: '100%',

            '& .MuiInputLabel-root': {
              color: '#3B556D',
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#3B556D',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#3B556D',
            },
            '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#3B556D',
            },
          }}
            value={nom} onChange={(e) => setNom(e.target.value)} />
        </Grid>
        <Grid item xs={12}>
          <TextField id="outlined-basic" label="Titre de poste" variant="outlined" size="small" sx={{
            minWidth: '100%',

            '& .MuiInputLabel-root': {
              color: '#3B556D',
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#3B556D',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#3B556D',
            },
            '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#3B556D',
            },
          }}
            value={titre} onChange={(e) => setTitre(e.target.value)} />
        </Grid>
        <Grid item xs={12}>
          <TextField id="outlined-basic" label="Email" variant="outlined" size="small" sx={{
            minWidth: '100%',

            '& .MuiInputLabel-root': {
              color: '#3B556D',
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#3B556D',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#3B556D',
            },
            '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#3B556D',
            },
          }}
            value={email} onChange={(e) => setEmail(e.target.value)} />
        </Grid>
        <Grid item xs={12}>
          <TextField id="outlined-basic" label="Téléphone" variant="outlined" size="small" sx={{
            minWidth: '100%',

            '& .MuiInputLabel-root': {
              color: '#3B556D',
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#3B556D',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#3B556D',
            },
            '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#3B556D',
            },
          }}
            value={telephone} onChange={(e) => setTelephone(e.target.value)} />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" align="center">
            <Button variant="contained" style={{ backgroundColor: '#3B556D', color: 'white' }} onClick={() => { createUser(nom, titre, email, telephone); handleSubmit(); }}>
              Ajouter Membre
            </Button>
          </Typography>
        </Grid>
      </Grid>
      <Box sx={{ m: 4 }} />

      <Dialog open={showDialog} onClose={handleCloseDialog}>
        <DialogTitle>Projet ajouté avec succès!</DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Fermer</Button>
        </DialogActions>
      </Dialog>

    </>
  );
}

export default AddForm;

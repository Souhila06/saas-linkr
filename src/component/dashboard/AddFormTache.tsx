import { Box, Button, Dialog, DialogActions, DialogTitle, Grid, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

interface AddFormProps {
  closeEvent: () => void;

}

const createUser = (titre: string, dateDebut: string, dateLimite: string, projet: string, afecter: string, duré: string, statu: string) => {

  console.log('Titre:', titre);
  console.log('dateDebut:', dateDebut);
  console.log('dateLimite', dateLimite);
  console.log('projetr', projet);
  console.log('afecter', afecter);
 
  console.log('statu:', statu);




};


const currencies = [
  {
    value: 'souhila',
    label: 'souhila',
  },
  {
    value: 'hadjer',
    label: 'hadjer',
  },
  {
    value: 'souhila',
    label: 'souhila',
  },
  {
    value: 'dagi',
    label: 'dagi',
  },
];

const AddForm: React.FC<AddFormProps> = ({ closeEvent }) => {

  const [titre, setTitre] = useState('');
  const [dateDebut, setDateDebut] = useState('');
  const [dateLimite, setDateLimite] = useState('');
  const [projet, setProjet] = useState('');
  const [afecter, setAfecter] = useState('');
  const [duré, setDuré] = useState('');
  const [statu, seTstatu] = useState('');


  const [showDialog, setShowDialog] = useState(false);

  const handleSubmit = () => {

    if (titre && dateDebut && dateLimite && afecter && duré && statu && projet) {
      setShowDialog(true);

    } else {

      window.alert('Veuillez remplir tous les champs.');
    }
  };

  const handleCloseDialog = () => {

    setShowDialog(false);
    setTitre('');
    setDateDebut('')
    setDateLimite('');
    setProjet('');
    setAfecter('');
    setDuré('');
    seTstatu('');
    closeEvent();

  };
  return (
    <>
      <Box sx={{ m: 2 }} />
      <Typography variant="h5" align="center">
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
          <TextField id="outlined-basic" label="Titre" variant="outlined" size="small" sx={{
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
          <TextField id="outlined-basic" type="date" /*label="Date de Débue"*/ variant="outlined" size="small" sx={{
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
            value={dateDebut} onChange={(e) => setDateDebut(e.target.value)} />
        </Grid>
        <Grid item xs={12}>
          <TextField id="outlined-basic" type="date" /*label="Date limite"*/ variant="outlined" size="small" sx={{
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
            value={dateLimite} onChange={(e) => setDateLimite(e.target.value)} />
        </Grid>
        <Grid item xs={12}>
          <TextField id="outlined-basic" label="Projet" variant="outlined" size="small" sx={{
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
            value={projet} onChange={(e) => setProjet(e.target.value)} />
        </Grid>
        <Grid item xs={12}>
          <TextField id="outlined-basic" label="Affecté a" select variant="outlined" size="small" sx={{
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
            value={afecter} onChange={(e) => setAfecter(e.target.value)} >
            {currencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField id="outlined-basic" label="Collaborateur" select variant="outlined" size="small" sx={{
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
            value={duré} onChange={(e) => setDuré(e.target.value)} >
            {currencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField id="outlined-basic" label="Statue" variant="outlined" size="small" sx={{
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
            value={statu} onChange={(e) => seTstatu(e.target.value)} />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" align="center">
            <Button variant="contained" style={{ backgroundColor: '#3B556D', color: 'white' }} onClick={() => { createUser(titre, dateDebut, dateLimite, projet, afecter, duré, statu); handleSubmit(); }}>
              Envoyer
            </Button>
          </Typography>
        </Grid>
      </Grid>
      <Box sx={{ m: 4 }} />
      <Dialog open={showDialog} onClose={handleCloseDialog}>
        <DialogTitle>Membre ajouté avec succès!</DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Fermer</Button>
        </DialogActions>
      </Dialog>

    </>
  );
}

export default AddForm;

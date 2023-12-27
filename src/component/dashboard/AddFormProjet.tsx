import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';


interface AddFormProps {
  closeEvent: () => void;
}

const currencies = [
  { value: 'souhila', label: 'souhila' },
  { value: 'hadjer', label: 'hadjer' },
  { value: 'souhila', label: 'souhila' },
  { value: 'dagi', label: 'dagi' },
];


const createUser = (titre: string, client: string, dateDebut: string, dateLimite: string, progression: string) => {

  console.log('Titre:', titre);
  console.log('Client:', client);
  console.log('Date de début:', dateDebut);
  console.log('Date limite:', dateLimite);
  console.log('Progression:', progression);


};

const AddForm: React.FC<AddFormProps> = ({ closeEvent }) => {
  const [titre, setTitre] = useState('');
  const [client, setClient] = useState('');
  const [dateDebut, setDateDebut] = useState('');
  const [dateLimite, setDateLimite] = useState('');
  const [progression, setProgression] = useState('');

  const [showDialog, setShowDialog] = useState(false);

  const handleSubmit = () => {

    if (titre && client && dateDebut && dateLimite && progression) {
      setShowDialog(true);

    } else {

      window.alert('Veuillez remplir tous les champs.');
    }
  };

  const handleCloseDialog = () => {

    setShowDialog(false);
    setTitre('');
    setClient('');
    setDateDebut('');
    setDateLimite('');
    setProgression('');
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
            value={titre} onChange={(e) => setTitre(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField id="outlined-basic" label="Client" select variant="outlined" size="small" sx={{
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
            value={client} onChange={(e) => setClient(e.target.value)}
          >
            {currencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12}>
  <TextField
    id="date-debut"
    type="date"  
    variant="outlined"
    size="small"
    sx={{
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
    value={dateDebut}
    onChange={(e) => setDateDebut(e.target.value)}
    // label="Date de début"
  />
</Grid>
<Grid item xs={12}>
  <TextField
    id="date-limite"
    type="date"
    variant="outlined"
    size="small"
    sx={{
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
    value={dateLimite}
    onChange={(e) => setDateLimite(e.target.value)}
    // label="Date limite"
  />
</Grid>

        <Grid item xs={12}>
          <TextField id="outlined-basic" label="Progression" variant="outlined" size="small" sx={{
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
            value={progression} onChange={(e) => setProgression(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" align="center">
            <Button variant="contained" style={{ backgroundColor: '#3B556D', color: 'white' }}  onClick={() => { createUser(titre, client, dateDebut, dateLimite, progression); handleSubmit(); }}>
            Ajouter Projet
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

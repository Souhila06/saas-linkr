import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import React from "react";
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

interface AddFormProps {
  closeEvent: () => void;
  
}
const createUser = () => {
    
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
      <TextField id="outlined-basic" label="Titre" variant="outlined" size="small" sx={{minWidth:"100%"}} />
      </Grid>
      <Grid item xs={12}> 
      <TextField id="outlined-basic" label="Client" select variant="outlined" size="small" sx={{minWidth:"100%"}} >
      {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={12}> 
      <TextField id="outlined-basic" label="Date de Débue" variant="outlined" size="small" sx={{minWidth:"100%"}} />
      </Grid>
      <Grid item xs={12}> 
      <TextField id="outlined-basic" label="Date limite" variant="outlined" size="small" sx={{minWidth:"100%"}} />
      </Grid>
      <Grid item xs={12}> 
      <TextField id="outlined-basic" label="Progression" variant="outlined" size="small" sx={{minWidth:"100%"}} />
      </Grid>
      <Grid item xs={12}> 
      <Typography variant="h5" align="center">
        <Button variant="contained" onClick={createUser}>
            Submit
        </Button>
      </Typography>
      </Grid>
      </Grid>
      <Box sx={{m:4}} />
    
    </>
  );
}

export default AddForm;

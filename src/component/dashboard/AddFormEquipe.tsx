import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import React from "react";
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';

interface AddFormProps {
  closeEvent: () => void;
  
}
const createUser = () => {
    
  };

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
      <TextField id="outlined-basic" label="Nom" variant="outlined" size="small" sx={{minWidth:"100%"}} />
      </Grid>
      <Grid item xs={12}> 
      <TextField id="outlined-basic" label="Titre de poste" variant="outlined" size="small" sx={{minWidth:"100%"}} />
      </Grid>
      <Grid item xs={12}> 
      <TextField id="outlined-basic" label="Email" variant="outlined" size="small" sx={{minWidth:"100%"}} />
      </Grid>
      <Grid item xs={12}> 
      <TextField id="outlined-basic" label="Téléphone" variant="outlined" size="small" sx={{minWidth:"100%"}} />
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

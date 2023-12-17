import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

interface AddFormProps {
  closeEvent: () => void;
  rowData: {
    id: number;
    titre: string;
    client: string;
    dateDebut: string;
    dateLimite: string;
    progression: string;
  };
}
const createUser = () => {
  
    
  };
  

const EditForm: React.FC<AddFormProps> = ({ closeEvent, rowData }) => {
  const [titre, setTitre] = useState("");
  const [client, setClient] = useState("");
  const [dateDebut, setDateDebut] = useState("");
  const [dateLimite, setDateLimite] = useState("");
  const [progression, setProgression] = useState("");

  console.log("Titre:", titre);
  console.log("Client:", client);
  console.log("Date de Début:", dateDebut);
  console.log("Date limite:", dateLimite);
  console.log("Progression:", progression);
    
  return (
    <>
      <Box sx={{ m: 2 }} />
      <Typography variant="h5" align="center">
        Modifier 
      </Typography>
      <IconButton style={{ position: "absolute", top: "0", right: "0" }}
        onClick={closeEvent}
      >
        <CloseIcon />
      </IconButton>
      <Box height={20} />
      <Grid container spacing={2}>
      <Grid item xs={12}> 
      <TextField id="outlined-basic" label="Titre" variant="outlined" size="small" sx={{minWidth:"100%"}} value={rowData.titre}  />
      </Grid>
      <Grid item xs={12}> 
      <TextField
            id="outlined-basic"
            label="Client"
       
            variant="outlined"
            size="small"
            sx={{ minWidth: "100%" }}
            value={rowData.client}
          
          >
           
          </TextField>
      </Grid>
      <Grid item xs={12}> 
      <TextField id="outlined-basic" label="Date de Débue" variant="outlined" size="small" sx={{minWidth:"100%"}}  value={rowData.dateDebut}
          />
      </Grid>
      <Grid item xs={12}> 
      <TextField id="outlined-basic" label="Date limite" variant="outlined" size="small" sx={{minWidth:"100%"}}   value={rowData.dateLimite}
 />
      </Grid>
      <Grid item xs={12}> 
      <TextField id="outlined-basic" label="Progression" variant="outlined" size="small" sx={{minWidth:"100%"}}      value={rowData.progression}
           />
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

export default EditForm;

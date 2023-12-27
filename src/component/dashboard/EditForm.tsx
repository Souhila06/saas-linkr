import React, { useState, useEffect } from "react";
import { Box, Button, Dialog, DialogActions, Typography, Grid, IconButton, TextField, DialogTitle } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

interface EditFormProps {

  closeEvent: () => void;
  rowData: {
    id: number;
    titre: string;
    client: string;
    dateDebut: string;
    dateLimite: string;
    progression: string;
  };
  updateUser: (updatedData: any) => void;
}


const EditForm: React.FC<EditFormProps> = ({ closeEvent, rowData, updateUser }) => {
  const [titre, setTitre] = useState("");
  const [client, setClient] = useState("");
  const [dateDebut, setDateDebut] = useState("");
  const [dateLimite, setDateLimite] = useState("");
  const [progression, setProgression] = useState("");
  const [showDialog, setShowDialog] = useState(false);

  const handleCloseDialog = () => {

    setShowDialog(false);
    setTitre('');
    setClient('');
    setDateDebut('');
    setDateLimite('');
    setProgression('');
    closeEvent();

  };
 
  useEffect(() => {

    setTitre(rowData.titre);
    setClient(rowData.client);
    setDateDebut(rowData.dateDebut);
    setDateLimite(rowData.dateLimite);
    setProgression(rowData.progression);

    console.log(" Nouvelles valeurs :", rowData);
  }, [rowData]);

  console.log("Valeurs actuelles :", {
    titre,
    client,
    dateDebut,
    dateLimite,
    progression,
  });

  const handleSubmit = () => {
    const updatedData = {
      id: rowData.id,
      titre,
      client,
      dateDebut,
      dateLimite,
      progression,
    };
  
    updateUser(updatedData);
    // closeEvent();
    // window.alert('ligne modifier');
    setShowDialog(true);
  };
  console.log('Before return. showDialog:', showDialog);

  return (
    <>
      <Box sx={{ m: 2 }} />
      <Typography variant="h5" align="center">
        Modifier
      </Typography>
      <IconButton style={{ position: "absolute", top: "0", right: "0" }} onClick={closeEvent}>
        <CloseIcon />
      </IconButton>
      <Box height={20} />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="Titre"
            variant="outlined"
            size="small"
            sx={{ minWidth: "100%" }}
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="Client"
            variant="outlined"
            size="small"
            sx={{ minWidth: "100%" }}
            value={client}
            onChange={(e) => setClient(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="Date de Début"
            variant="outlined"
            size="small"
            sx={{ minWidth: "100%" }}
            value={dateDebut}
            onChange={(e) => setDateDebut(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="Date limite"
            variant="outlined"
            size="small"
            sx={{ minWidth: "100%" }}
            value={dateLimite}
            onChange={(e) => setDateLimite(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="Progression"
            variant="outlined"
            size="small"
            sx={{ minWidth: "100%" }}
            value={progression}
            onChange={(e) => setProgression(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" align="center">
            <Button variant="contained" onClick={handleSubmit}>
              Submit
            </Button>
          </Typography>
        </Grid>
      </Grid>
      <Box sx={{ m: 4 }} />

      <Dialog open={showDialog} onClose={handleCloseDialog}>
        <DialogTitle>projet mis a jour  avec succès!</DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Fermer</Button>
        </DialogActions>
      </Dialog>
    </>
  );

}

export default EditForm;

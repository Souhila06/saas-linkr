// Personelle.tsx
import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const Profile: React.FC = () => {
  const fauxInfoPersonelle = {
    nom: 'Souhila yousfi',
    titrePoste: 'Développeur Web',
    email: 'souhila.yousfi@gmail.com',
    telephone: '0772851706',
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Information Personnelle
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField label="Nom" fullWidth value={fauxInfoPersonelle.nom} />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Titre de Poste" fullWidth value={fauxInfoPersonelle.titrePoste} />
          </Grid>
          <Grid item xs={12}>
            <TextField label="E-mail" fullWidth value={fauxInfoPersonelle.email} />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Téléphone" fullWidth value={fauxInfoPersonelle.telephone} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Profile;

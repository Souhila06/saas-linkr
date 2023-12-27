import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const Personelledeman: React.FC = () => {
  const fauxInfoPersonelle = {
    nom: 'Souhila yousfi',
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
            <Typography variant="body1" gutterBottom>
              <strong>Nom:</strong> {fauxInfoPersonelle.nom}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" gutterBottom>
              <strong>E-mail:</strong> {fauxInfoPersonelle.email}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" gutterBottom>
              <strong>Téléphone:</strong> {fauxInfoPersonelle.telephone}
            </Typography>

        
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Personelledeman;

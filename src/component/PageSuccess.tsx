import { Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const PaiementSuccess: React.FC = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh', 
    }}>
      <h1>Paiement Réussi</h1>
      <p>Merci pour votre paiement !</p>
      <Link style={{marginTop: '30px'}} to="/"> 
      <Button
                  variant="contained"
                  color="primary"
              
                  style={{
                    marginTop: "10px",
                    backgroundColor: "#3B556D",
                    color: "white",
                  }}
                >
                  Retourner au site 
                </Button>
      </Link>
    </div>
  );
}

export default PaiementSuccess;

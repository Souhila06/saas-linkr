import React from 'react';
import { Link } from 'react-router-dom';

const PageFailed: React.FC = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh', // Hauteur de la vue à 100%
    }}>
      <h1>Échec du Paiement</h1>
      <p>Le paiement a échoué. Veuillez réessayer.</p>
      <Link style={{marginTop: '30px'}} to="/demandeur/">
        <button>Retourner au site</button>
      </Link>
    </div>
  );
}

export default PageFailed;

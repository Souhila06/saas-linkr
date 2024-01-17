import React from 'react';
import { Link } from 'react-router-dom';

interface Styles {
  container: React.CSSProperties;
  image: React.CSSProperties;
  title: React.CSSProperties;
  text: React.CSSProperties;
  button: React.CSSProperties;
}

const NotFound404: React.FC = () => {
  const styles: Styles = {
    container: {
      textAlign: 'center',
      paddingTop: '100px',
    },
    image: {
      maxWidth: '100%',
      height: 'auto',
      margin: '20px 0',
    },
    title: {
      fontSize: '2em',
      margin: '20px 0',
    },
    text: {
      fontSize: '1.2em',
      marginBottom: '20px',
    },
    button: {
      padding: '10px 20px',
      fontSize: '1em',
      backgroundColor: '#5FC2B1',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      textDecoration: 'none',
    },
  };

  return (
    <div style={styles.container}>
   
      <h1 style={styles.title}>Not Found 404</h1>
      <p style={styles.text}>La page que vous recherchez semble introuvable.</p>
      <Link to="/">
        <button style={styles.button}>Home</button>
      </Link>
    </div>
  );
};

export default NotFound404;

import React from 'react';
import { Button, Typography, Container, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const VerifyEmail = () => {
  const navigate = useNavigate();
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;

  const handleButtonClick = () => {
 
    navigate('/login');
  };

  return (
    <Container>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh" 
      >
        <Typography variant="h4" gutterBottom>
          Welcome <span style={{ color: '#5FC2B1' }}>{user && user.username}</span>
        </Typography>
        <Typography variant="body1" paragraph>
          Check Email Verification
        </Typography>
        <Button
          variant="contained"
          style={{ backgroundColor: '#3B556D', color: 'white' }}
          onClick={handleButtonClick}
        >
          Click Here
        </Button>
      </Box>
    </Container>
  );
};

export default VerifyEmail;

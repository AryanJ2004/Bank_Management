import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token from local storage
    localStorage.removeItem('isAdmin'); // Remove the isAdmin field from local storage
    navigate('/login'); // Redirect to the login page
  };

  const isAuthenticated = !!localStorage.getItem('token'); // Check if the user is authenticated
  const isAdmin = localStorage.getItem('isAdmin') === 'true'; // Check if the user is an admin

  return (
    <AppBar 
      position="sticky" 
      sx={{ backgroundColor: 'white', borderRadius: 0 }} // Removed rounded corners
      elevation={0}
    >
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Box
            component={Link}
            to="/"
            sx={{
              color: 'black', // Changed text color to black
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Box
              component="span"
              sx={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                backgroundColor: 'white',
                color: 'black',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                marginRight: 1,
              }}
            >
              BH
            </Box>
            Bank Hamara
          </Box>
        </Typography>
        
        {!isAuthenticated && <Button sx={{ color: 'black' }} component={Link} to="/login">Login</Button>}
        {!isAuthenticated && <Button sx={{ color: 'black' }} component={Link} to="/register">Register</Button>}
        
       
        {isAuthenticated && <Button sx={{ color: 'black' }} component={Link} to="/dashboard">Dashboard</Button>}
        
        {isAuthenticated && isAdmin && ( // Show Admin Dashboard button if the user is an admin
          <Button sx={{ color: 'black' }} component={Link} to="/admin">Admin Dashboard</Button>
        )} 
        {isAuthenticated && <Button sx={{ color: 'black' }} onClick={handleLogout}>Logout</Button>}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

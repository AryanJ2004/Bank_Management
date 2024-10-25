import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton, Divider } from '@mui/material';
import { Facebook, Twitter, LinkedIn, Instagram } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'primary.main',
        color: 'primary.contrastText',
        py: 6,
        mt: 'auto',
      }}
    >
      <Container maxWidth="xlg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              BankSys
            </Typography>
            <Typography variant="body2">
              Secure and efficient banking solutions for a better financial future.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Link href="#" color="inherit" display="block" sx={{ mb: 1 }}>
              About Us
            </Link>
            <Link href="#" color="inherit" display="block" sx={{ mb: 1 }}>
              Services
            </Link>
            <Link href="#" color="inherit" display="block" sx={{ mb: 1 }}>
              FAQs
            </Link>
            <Link href="#" color="inherit" display="block">
              Contact Us
            </Link>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Contact Information
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              123 Banking Street, Financial District
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              City, State 12345
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Phone: (123) 456-7890
            </Typography>
            <Typography variant="body2">
              Email: info@banksys.com
            </Typography>
          </Grid>
        </Grid>
        <Divider sx={{ my: 3, backgroundColor: 'primary.contrastText' }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
          <Typography variant="body2" sx={{ mb: { xs: 2, sm: 0 } }}>
            © 2023 BankSys. All rights reserved.
          </Typography>
          <Box>
            <IconButton color="inherit" aria-label="Facebook" component="a" href="#" target="_blank">
              <Facebook />
            </IconButton>
            <IconButton color="inherit" aria-label="Twitter" component="a" href="#" target="_blank">
              <Twitter />
            </IconButton>
            <IconButton color="inherit" aria-label="LinkedIn" component="a" href="#" target="_blank">
              <LinkedIn />
            </IconButton>
            <IconButton color="inherit" aria-label="Instagram" component="a" href="#" target="_blank">
              <Instagram />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;

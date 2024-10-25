// SearchBar.jsx
import React from 'react';
import { Grid, TextField, Button } from '@mui/material';
import { Search } from '@mui/icons-material';

function SearchBar({ searchQuery, setSearchQuery, onSearch }) {
  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={12} sm={8}>
        <TextField
          fullWidth
          label="Search by name or bank details"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          variant="outlined"
          onKeyPress={(e) => e.key === 'Enter' && onSearch()}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <Button
          fullWidth
          variant="contained"
          onClick={onSearch}
          startIcon={<Search />}
          sx={{ height: '56px' }}
        >
          Search
        </Button>
      </Grid>
    </Grid>
  );
}

export default SearchBar;

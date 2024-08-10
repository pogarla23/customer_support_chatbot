import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

export default function Header({ darkMode, toggleDarkMode }) {
  return (
    <AppBar
      position="static"
      sx={{
        background: darkMode ? 'linear-gradient(90deg, #434343, #000000)' : 'linear-gradient(90deg, #a1c4fd, #c2e9fb)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
        alignContent: 'center',
        width: '100%',
        marginBottom: "3%",
        borderRadius: '0 0 10px 10px',
      }}
    >
      <Toolbar
        sx={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px 10px',
        }}
      >
        <Box sx={{ flex: 1 }} />

        <Typography
          variant="h6"
          component="div"
          sx={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            color: "white",
            letterSpacing: '2px',
            fontWeight: 'bold',
          }}
        >
          Chat with Customer Service
        </Typography>

        <Box sx={{ display: 'flex', gap: '6px' }}>
          <Button
            onClick={toggleDarkMode}
            sx={{
              bgcolor: darkMode ? '#555' : 'lightblue',
              color: darkMode ? '#fff' : '#fff',
              textTransform: 'none',
              padding: '6px 16px',
              borderRadius: '20px',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
              '&:hover': {
                bgcolor: darkMode ? '#777' : '#37989e',
              },
            }}
          >
            {darkMode ? <LightModeIcon sx={{ mr: 1 }} /> : <DarkModeIcon sx={{ mr: 1 }} />}
            {darkMode ? "Light Mode" : "Dark Mode"}
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

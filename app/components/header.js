import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";

export default function Header({ darkMode, toggleDarkMode }) {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: '#253A4A',
        boxShadow: 'none',
        alignContent: 'center',
        width: '100%',
        marginBottom: "3%",
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '10px',
        }}
      >
        <Box sx={{ flex: 1 }} />
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            textAlign: 'center',
            color: "white",
            letterSpacing: '2px',
          }}
        >
          Chat with Customer Service
        </Typography>
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            onClick={toggleDarkMode}
            sx={{
              alignSelf: 'flex-end',
              mb: 2,
              bgcolor: darkMode ? "grey.800" : "grey.300",
              color: darkMode ? "white" : "black",
              marginTop: "10px",
            }}
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

import * as React from 'react';
import { Link, Button, TextField, Typography, Container, Box, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from './header';

function ModeToggle() {
  const [mode, setMode] = React.useState('light');

  React.useEffect(() => {
    // Check the current theme mode from local storage or default to light
    const savedMode = localStorage.getItem('themeMode');
    if (savedMode) {
      setMode(savedMode);
    }
  }, []);

  React.useEffect(() => {
    // Save the current theme mode to local storage
    localStorage.setItem('themeMode', mode);
  }, [mode]);

  const theme = createTheme({
    palette: {
      mode: mode,
    },
  });

  return (
    <Button
      variant="contained"
      onClick={() => {
        setMode(mode === 'light' ? 'dark' : 'light');
      }}
    >
      {mode === 'light' ? 'Turn dark' : 'Turn light'}
    </Button>
  );
}

export default function LoginFinal() {
  const theme = createTheme({
    // Default theme configuration can be added here if needed
  });

  return (
    <Header/>,
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="xs">
        <ModeToggle />
        <Box
          sx={{
            width: '100%',
            mt: 4, // margin top
            py: 3, // padding top & bottom
            px: 2, // padding left & right
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            borderRadius: 1,
            boxShadow: 3,
            backgroundColor: theme.palette.background.paper,
          }}
        >
          <div>
            <Typography variant="h4" component="h1">
              <b>Welcome</b>
            </Typography>
            <Typography variant="body2">Sign in to continue.</Typography>
          </div>
          <TextField
            label="Email"
            name="email"
            type="email"
            placeholder="enter"
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            margin="normal"
          />
          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 1 /* margin top */ }}
          >
            Log in
          </Button>
          <Typography
            variant="body2"
            align="center"
            sx={{ mt: 2 }}
          >
            Don&apos;t have an account? <Link href="/sign-up">Sign up</Link>
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

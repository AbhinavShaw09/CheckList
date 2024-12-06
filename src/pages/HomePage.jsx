import { Box, Typography, Paper, Container } from '@mui/material';

const HomePage = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to Check List App 🏠
        </Typography>
        <Paper sx={{ p: 3, mt: 3, backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
          <Typography variant="h6" gutterBottom>
            Features
          </Typography>
          <Typography >
            • Create and manage your todos easily
          </Typography>
          <Typography >
            • Track your progress with a simple interface
          </Typography>
          <Typography >
            • Access your profile and settings
          </Typography>
          <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
            Get started by navigating to the CheckList page from the sidebar!
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default HomePage;
import {
  Box,
  Typography,
  Paper,
  Container,
  Avatar,
  Grid2 as Grid,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';

const ProfilePage = () => {
  const userProfile = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    joinDate: 'January 2024',
    totalTasks: 42,
    completedTasks: 28,
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Paper sx={{ p: 3, backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item>
              <Avatar
                sx={{
                  width: 100,
                  height: 100,
                  bgcolor: 'primary.main',
                  fontSize: '2rem',
                }}
              >
                {userProfile.name.charAt(0)}
              </Avatar>
            </Grid>
            <Grid item>
              <Typography variant="h4" gutterBottom>
                {userProfile.name}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Member since {userProfile.joinDate}
              </Typography>
            </Grid>
          </Grid>

          <List sx={{ mt: 3 }}>
            <ListItem>
              <ListItemText
                primary="Email"
                secondary={userProfile.email}
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="Total Tasks"
                secondary={userProfile.totalTasks}
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="Completed Tasks"
                secondary={userProfile.completedTasks}
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="Completion Rate"
                secondary={`${Math.round((userProfile.completedTasks / userProfile.totalTasks) * 100)}%`}
              />
            </ListItem>
          </List>
        </Paper>
      </Box>
    </Container>
  );
};

export default ProfilePage;
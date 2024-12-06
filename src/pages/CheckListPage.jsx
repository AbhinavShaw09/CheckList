import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import TodoList from '../components/todo/TodoList';

const CheckListPage = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          My Tasks ✓
        </Typography>
        <TodoList />
      </Box>
    </Container>
  );
};

export default CheckListPage;
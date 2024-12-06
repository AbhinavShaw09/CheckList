import { useState, useEffect } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  TextField,
  Checkbox,
  Paper,
  CircularProgress,
  Alert,
  Snackbar,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import databaseService from '../../services/appwrite/database';
import authService from '../../services/appwrite/auth';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const initializeUser = async () => {
      try {
        const user = await authService.getCurrentUser();
        if (user) {
          setUserId(user.$id);
          loadTodos(userId);
        }
      } catch (err) {
        setError('Failed to load user information');
        setIsLoading(false);
        console.log(err);
      }
    };

    initializeUser();
  }, [userId]);

  const loadTodos = async (uid) => {
    try {
      const loadedTodos = await databaseService.listTodos(uid);
      setTodos(loadedTodos);
    } catch (err) {
      setError('Failed to load todos');
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (newTodo.trim() === '') return;

    try {
      const newTodoDoc = await databaseService.createTodo(newTodo.trim());
      setTodos([newTodoDoc, ...todos]);
      setNewTodo('');
    } catch (err) {
      setError('Failed to add todo');
      console.log(err);
      
    }
  };

  const handleToggleTodo = async (todo) => {
    try {
      const updatedTodo = await databaseService.updateTodo(todo.$id, {
        completed: !todo.completed,
      });
      setTodos(todos.map((t) => (t.$id === todo.$id ? updatedTodo : t)));
    } catch (err) {
      setError('Failed to update todo');
      console.log(err);
    }
  };

  const handleDeleteTodo = async (todoId) => {
    try {
      await databaseService.deleteTodo(todoId);
      setTodos(todos.filter((todo) => todo.$id !== todoId));
    } catch (err) {
      setError('Failed to delete todo');      
      console.log(err);
    }
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Paper
        component="form"
        onSubmit={handleAddTodo}
        sx={{
          p: 2,
          mb: 2,
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
        }}
      >
        <TextField
          fullWidth
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new task..."
          variant="outlined"
          size="small"
        />
      </Paper>
      <List>
        {todos.map((todo) => (
          <ListItem
            key={todo.$id}
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleDeleteTodo(todo.$id)}
              >
                <DeleteIcon />
              </IconButton>
            }
            disablePadding
          >
            <ListItemButton onClick={() => handleToggleTodo(todo)}>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={todo.completed}
                  tabIndex={-1}
                  disableRipple
                />
              </ListItemIcon>
              <ListItemText
                primary={todo.text}
                sx={{
                  textDecoration: todo.completed ? 'line-through' : 'none',
                  color: todo.completed ? 'text.secondary' : 'text.primary',
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError('')}
      >
        <Alert severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default TodoList;
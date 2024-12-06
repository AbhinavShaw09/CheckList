import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import PropTypes from "prop-types";

const Navbar = ({ onLogout }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setOpen(false);
  };

  const IconsMapTop = [
    { label: "Home", icon: <HomeIcon />, path: "/" },
    { label: "Profile", icon: <AccountCircleIcon />, path: "/profile" },
  ];

  const IconsMapBottom = [
    { label: "CheckList", icon: <FactCheckIcon />, path: "/checklist" },
  ];

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        {IconsMapTop.map(({ label, icon, path }) => (
          <ListItem key={label} disablePadding>
            <ListItemButton
              onClick={() => handleNavigation(path)}
              selected={location.pathname === path}
            >
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {IconsMapBottom.map(({ label, icon, path }) => (
          <ListItem key={label} disablePadding>
            <ListItemButton
              onClick={() => handleNavigation(path)}
              selected={location.pathname === path}
            >
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar position="fixed" sx={{ backgroundColor: "#640D5F" }}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer(true)}
          edge="start"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>

        <Drawer open={open} onClose={toggleDrawer(false)}>
          {DrawerList}
        </Drawer>

        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, fontWeight: "bold" }}
        >
          Check 🗸 List
        </Typography>

        <Button color="inherit" onClick={onLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};


Navbar.propTypes = {
  onLogout: PropTypes.func.isRequired,
};

export default Navbar;

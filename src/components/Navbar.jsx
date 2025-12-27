import React from "react";
import { AppBar, Toolbar, Typography, Box, IconButton, Menu, MenuItem } from "@mui/material";
import { Logout as LogoutIcon, Menu as MenuIcon, AccountCircle as AccountIcon } from "@mui/icons-material";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const userName = Cookies.get("name") || "User";

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("name");
    Cookies.remove("id");
    Cookies.remove("friendId");
    Cookies.remove("friendName");
    navigate("/login");
    handleMenuClose();
  };

  return (
    <AppBar position="static" className="navbar">
      <Toolbar className="navbar-toolbar">
        {/* Logo */}
        <Box className="navbar-logo-box">
          <Typography className="navbar-logo">
            💬 ChatWeb
          </Typography>
        </Box>

        {/* Spacer */}
        <Box sx={{ flex: 1 }} />

        {/* User Menu */}
        <Box className="navbar-user-menu">
          <AccountIcon className="navbar-user-icon" />
          <Typography className="navbar-user-name">{userName}</Typography>
          
          <IconButton
            size="small"
            onClick={handleMenuOpen}
            className="navbar-menu-button"
            title="Menu"
          >
            <MenuIcon />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            className="navbar-dropdown-menu"
          >
            <MenuItem disabled className="navbar-menu-header">
              <Typography variant="body2" fontWeight="600">
                {userName}
              </Typography>
            </MenuItem>
            <MenuItem onClick={handleLogout} className="navbar-logout-item">
              <LogoutIcon fontSize="small" sx={{ mr: 1 }} />
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

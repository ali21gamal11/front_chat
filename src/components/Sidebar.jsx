import React from "react";
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Toolbar, useTheme, useMediaQuery } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import PublicIcon from "@mui/icons-material/Public";
import ChatIcon from "@mui/icons-material/Chat";
import { Link, useLocation } from "react-router-dom";
import Cookies from "js-cookie";


const drawerWidth = 240;

export default function Sidebar({ mobileOpen, handleDrawerToggle }) {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const userName = Cookies.get("name");
  const items = [
    { text: "Home", icon: <HomeIcon />, to: "/" },
    { text: "People", icon: <PeopleIcon />, to: "/PeopleList" },
    { text: "Public Chat", icon: <PublicIcon />, to: "/chat/public" },
    { text: "Private Chat", icon: <ChatIcon />, to: `/chat/private` },
  ];

  const drawer = (
    <>
      <Toolbar />
      <List>
        <h2 style={{ textAlign: "center",marginBottom: "10%" }}>{userName}</h2>
        {items.map((it) => (
          <ListItemButton
            key={it.text}
            component={Link}
            to={it.to}
            selected={location.pathname === it.to}
            onClick={isMobile ? handleDrawerToggle : undefined}
          >
            <ListItemIcon>{it.icon}</ListItemIcon>
            <ListItemText primary={it.text} />
          </ListItemButton>
        ))}
      </List>
    </>
  );

  return (
    <>
      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* Desktop Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
}

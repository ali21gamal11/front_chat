import React from "react";
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Toolbar } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import PublicIcon from "@mui/icons-material/Public";
import ChatIcon from "@mui/icons-material/Chat";
import { Link, useLocation } from "react-router-dom";
import Cookies from "js-cookie";


const drawerWidth = 240;

export default function Sidebar() {
  const location = useLocation();
  const userName = Cookies.get("name");
  const items = [
    { text: "Home", icon: <HomeIcon />, to: "/" },
    { text: "People", icon: <PeopleIcon />, to: "/PeopleList" },
    { text: "Public Chat", icon: <PublicIcon />, to: "/chat/public" },
    { text: "Private Chat", icon: <ChatIcon />, to: `/chat/private` },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box" },
      }}
    >
      <Toolbar />
      <List>
        <h2 style={{ textAlign: "center",marginBottom: "10%" }}>{userName}</h2>
        {items.map((it) => (
          <ListItemButton
            key={it.text}
            component={Link}
            to={it.to}
            selected={location.pathname === it.to}
          >
            <ListItemIcon>{it.icon}</ListItemIcon>
            <ListItemText primary={it.text} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
}

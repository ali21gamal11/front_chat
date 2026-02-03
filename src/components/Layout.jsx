import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { Navigate  } from "react-router-dom";
import Cookies from "js-cookie";

export default function Layout() {
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const token = Cookies.get("token")
    if(!token || token.trim() === ""){
        return <Navigate to ="/register"  replace/>
    }
    
  return (
    <Box sx={{ display: "flex", minHeight: "100vh", flexDirection: "column" }}>
      <Navbar handleDrawerToggle={handleDrawerToggle} />
      <Box sx={{ display: "flex", flex: 1 }}>
        <Sidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
        <Box component="main" sx={{ flex: 1, p: 2, bgcolor: "background.default" }}>
          <Outlet />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}

// src/components/Layout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

export default function Layout() {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh", flexDirection: "column" }}>
      <Navbar />
      <Box sx={{ display: "flex", flex: 1 }}>
        <Sidebar />
        <Box component="main" sx={{ flex: 1, p: 2, bgcolor: "background.default" }}>
          <Outlet />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}

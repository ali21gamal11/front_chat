// src/components/Navbar.jsx
import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";

export default function Navbar() {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h6">ChatWeb</Typography>
        </Box>
        {/* ممكن تضيف أي أيقونات / زرار خروج هنا */}
      </Toolbar>
    </AppBar>
  );
}

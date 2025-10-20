import React from "react";
import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box component="footer" sx={{ py: 1, bgcolor: "background.paper", textAlign: "center" }}>
      <Typography variant="body2">© {new Date().getFullYear()} ChatWeb — All rights reserved</Typography>
    </Box>
  );
}

import React from "react";
import { Box, Typography, Container } from "@mui/material";
import "./Footer.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Box component="footer" className="footer">
      <Container maxWidth="lg">
        <Box className="footer-content">
          <Typography className="footer-copyright">
            © {currentYear} Section.dev — All rights reserved
          </Typography>
          <Typography className="footer-subtitle">
            student project A.G.A
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

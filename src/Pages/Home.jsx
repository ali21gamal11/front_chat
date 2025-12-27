import React from "react";
import Cookies from "js-cookie";
import { Box, Typography, Container, Grid } from "@mui/material";
import { People as PeopleIcon, Chat as ChatIcon } from "@mui/icons-material";
import PublicIcon from "@mui/icons-material/Public";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const userName = Cookies.get("name") || "Guest";

  return (
    <Container maxWidth="lg" className="home-container">
  
      <Box className="home-header">
        <Typography className="home-site-title">
          💬 Section.dev
        </Typography>
        <Box className="home-greeting">
          Welcome back, <Typography component="span" className="name-highlight">{userName}</Typography>!
        </Box>
        <Typography className="home-subtitle">
          Stay connected with your friends in real-time
        </Typography>
      </Box>

      {/* Features Section */}
      <Box className="home-features-section">
        <Typography className="features-title">
          What you can do
        </Typography>
        
        <Grid container spacing={3} className="features-grid">
          {/* Feature 1: People List */}
          <Grid item xs={12} sm={6} md={4}>
            <Link to="/peoplelist" style={{ textDecoration: "none" }}>
            <Box className="feature-card">
              <Box className="feature-icon people-icon">
                <PeopleIcon />
              </Box>
              <Typography className="feature-name">
                Meet People
              </Typography>
              <Typography className="feature-desc">
                Browse and connect with all registered users in the community.
              </Typography>
            </Box>
            </Link>
          </Grid>

          
          <Grid item xs={12} sm={6} md={4}>
            <Link to="/chat/private" style={{ textDecoration: "none" }}>
            <Box className="feature-card">
              <Box className="feature-icon chat-icon">
                <ChatIcon />
              </Box>
              <Typography className="feature-name">
                Private Chat
              </Typography>
              <Typography className="feature-desc">
                Have one-on-one conversations with your friends securely.
              </Typography>
            </Box>
            </Link>
          </Grid>

       
          <Grid item xs={12} sm={6} md={4}>
            <Link to="/chat/public" style={{ textDecoration: "none" }}>
            <Box className="feature-card">
              <Box className="feature-icon public-icon">
                <PublicIcon />
              </Box>
              <Typography className="feature-name">
                Public Room
              </Typography>
              <Typography className="feature-desc">
                Join the community chat and discuss with everyone!
              </Typography>
            </Box>
            </Link>
          </Grid>
        </Grid>
      </Box>

     
      <Box className="home-stats">
        <Typography className="stats-title">
          Ready to Chat?
        </Typography>
        <Typography className="stats-desc">
          Use the sidebar to navigate to People List, Public Chat, or Private Chat.
        </Typography>
        <Box className="stats-buttons">
          <Box className="stat-item">
            <Typography className="stat-number">100%</Typography>
            <Typography className="stat-label">Online</Typography>
          </Box>
          <Box className="stat-item">
            <Typography className="stat-number">∞</Typography>
            <Typography className="stat-label">Messages</Typography>
          </Box>
          <Box className="stat-item">
            <Typography className="stat-number">🔒</Typography>
            <Typography className="stat-label">Secure</Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Home;

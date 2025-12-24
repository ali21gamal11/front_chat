import axiosInstance from "../api/axiosInstance.js";
import { useState,useEffect } from "react"
import { Card, CardContent, Typography, Grid, Box, Container, Skeleton, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Person as PersonIcon } from "@mui/icons-material";
import "./PeopleList.css";


export default function PeopleList(){

    const [users,setusers] = useState([]);
    const [loading,setloading] = useState(true);
    const [error,seterror] = useState(null);
    
    const navigate = useNavigate();

    useEffect(()=>{
        const fetchUsers = async()=>{
            try{
                setloading(true);
                const res = await axiosInstance.get("/api/user");
                const data = res.data;
                setusers(data);
                console.log(res);
            }catch{
                seterror("فشل في جلب المستخدمين");
            }finally{
                setloading(false)
            }
        }
        fetchUsers();
    },[]);

    const handleUserClick = (userId, userName) => {
        Cookies.set("friendId", userId);
        Cookies.set("friendName", userName);
        navigate("/chat/private");
    };

    return (
        <Container maxWidth="lg" className="people-list-container">
            {/* Header */}
            <Box className="people-list-header">
                <Typography className="people-list-title">
                    👥 Users Directory
                </Typography>
                <Typography className="people-list-subtitle">
                    Select a user to start chatting
                </Typography>
            </Box>

            {/* Loading State */}
            {loading && (
                <Grid container spacing={3} className="people-grid">
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                        <Grid item xs={12} sm={6} md={4} key={item}>
                            <Box className="user-card-skeleton">
                                <Skeleton variant="circular" width={60} height={60} />
                                <Skeleton variant="text" width="80%" height={24} style={{ marginTop: 12 }} />
                                <Skeleton variant="text" width="60%" height={16} />
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            )}

            {/* Error State */}
            {error && !loading && (
                <Alert severity="error" className="people-error-alert">
                    {error}
                </Alert>
            )}

            {/* Users Grid */}
            {!loading && !error && users.length > 0 && (
                <Grid container spacing={3} className="people-grid">
                    {users.map((u) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={u._id}>
                            <Card
                                onClick={() => handleUserClick(u._id, u.name)}
                                className="user-card"
                            >
                                <Box className="user-card-avatar">
                                    {u.avatar ? (
                                        <img src={u.avatar} alt={u.name} className="avatar-image" />
                                    ) : (
                                        <Box className="avatar-placeholder">
                                            {u.name?.charAt(0).toUpperCase()}
                                        </Box>
                                    )}
                                </Box>
                                <CardContent className="user-card-content">
                                    <Typography className="user-card-name">
                                        {u.name}
                                    </Typography>
                                    <Typography className="user-card-email">
                                        {u.email}
                                    </Typography>
                                    <Box className="user-card-status">
                                        <Box className="status-indicator"></Box>
                                        <Typography className="status-text">Online</Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}

            {/* Empty State */}
            {!loading && !error && users.length === 0 && (
                <Box className="people-empty-state">
                    <PersonIcon className="empty-icon" />
                    <Typography className="empty-title">
                        No Users Found
                    </Typography>
                    <Typography className="empty-subtitle">
                        There are no users available at the moment.
                    </Typography>
                </Box>
            )}
        </Container>
    );
}
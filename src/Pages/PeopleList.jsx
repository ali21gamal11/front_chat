import axiosInstance from "../api/axiosInstance.js";
import { useState,useEffect } from "react"
import { Card, CardContent, Typography, Grid, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";


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

    if(loading){return "جاري التحميل..."}
    if(error){return error}
    
    


return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        قائمة المستخدمين
      </Typography>
      <Grid container spacing={3}>
        {users.map((u) => (
          <Grid item xs={12} sm={6} md={4} key={u._id}>
            <Card
              onClick={() => {
                Cookies.set("friendId",u._id);
                Cookies.set("friendName",u.name);
                navigate("/chat/private")}}
              sx={{
                cursor: "pointer",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "scale(1.03)",
                  boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
                },
              }}
            >
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  {u.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {u.email}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
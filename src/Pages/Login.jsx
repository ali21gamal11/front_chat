import React,{ useState } from "react";
import Link from '@mui/material/Link';
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom"
import axiosInstance from "../api/axiosInstance"
import { Box, TextField, Button, Typography } from "@mui/material";


export default function Register() {

  const navigate = useNavigate(); 
  const [form,setform ] = useState({
    email:"",
    password:""
  })

  function handleform(e){

    setform({...form, [e.target.name]: e.target.value})
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const res = await axiosInstance.post("/api/auth/login",form);

      Cookies.set("token", res.data.token,{expires:1/50});
      Cookies.set("name", res.data.name,{expires:1});
      Cookies.set("id", res.data._id,{expires:1});
      
      console.log("senderId",Cookies.get("id"))

      console.log(res)
      console.log("mytoken:",Cookies.get("token"));

      navigate("/")

      setform({
        email: "",
        password: ""
      })
      
      alert("تم تسجيل دخولك يا اسد");
    }catch(err){
      console.error(err);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      color="text.primary"
      bgcolor="background.paper"
  style={{
    display: "grid",
    gridTemplateColumns: "2fr",
    gap: "16px",
    maxWidth: "400px",
    margin: "64px auto 0",
    padding: "32px",
    borderRadius: "16px",
    boxShadow: "0px 3px 6px rgba(0,0,0,0.2)",
  }}
    >
    <Typography variant="h5" mb={3} color="text.primary" textAlign="center">
      تسجيل الدخول 
    </Typography>

    
        <TextField
            name="email"
            value={form.email}
            onChange={handleform}
            type="email"
            label="البريد الالكتروني"
            fullWidth
            margin="normal"
            required
        />
    

    
        <TextField
            name="password"
            value={form.password}
            onChange={handleform}
            label="كلمة المرور"
            type="password"
            fullWidth
            margin="normal"
            required
        />
    

      <Button
        
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
      >
        سجل
      </Button>
      <Link href="/register" underline="hover" color="primary">
        ليس لدي حساب
      </Link>
    </Box>
  );
}

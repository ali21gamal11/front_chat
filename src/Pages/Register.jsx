import React,{ useState } from "react";
import Link from '@mui/material/Link';
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom"
import axiosInstance from "../api/axiosInstance"
import { Box, TextField, Button, Typography,Alert } from "@mui/material";


export default function Register() {

  const [errorMessage, setErrorMessage] = useState("");
  
  const navigate = useNavigate(); 
  const [form,setform ] = useState({
    name:"",
    age:"",
    email:"",
    password:""
  })

  function handleform(e){

    setform({...form, [e.target.name]: e.target.value})
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const res = await axiosInstance.post("/api/auth/register",form);

      Cookies.set("token", res.data.token,{expires:1/50});
      Cookies.set("name", res.data.name,{expires:1});
      Cookies.set("id", res.data._id,{expires:1});

      navigate("/")

      setform({
        name: "",
        age: "",
        email: "",
        password: ""
      })
      
      alert("تم تسجيل مستخدم جديد");
    }catch(err){
      setErrorMessage(err.response?.data?.message || "حدث خطأ غير متوقع");
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
      تسجيل مستخدم جديد 
    </Typography>
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
    


    <Box style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "16px",
        }}>
        <TextField 
            name="name"
            value={form.name}
            onChange={handleform}
            label="الاسم"
            type="text"
            fullWidth
            margin="normal"
            required
        />
    
        <TextField
            name="age"
            value={form.age}
            onChange={handleform}
            label="العمر"
            type="number"
            fullWidth
            margin="normal"
            required
        />
    </Box>

    
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
      <Link href="/login" underline="hover" color="primary">
        لدي حساب بالفعل
      </Link>
      
    </Box>
  );
}

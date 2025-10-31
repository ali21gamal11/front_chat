import axios from "axios";
import Cookies from "js-cookie"

const axiosInstance = axios.create({
    baseURL:"http://localhost:5000",
    headers: { "Content-Type": "application/json"}
});

    axiosInstance.interceptors.request.use((config)=>{
        const token = Cookies.get("token");
        if(token){
            config.headers.token = token;
        }
        return config;
    });


export default axiosInstance;
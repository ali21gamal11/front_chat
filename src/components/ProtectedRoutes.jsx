import { Navigate,useLocation  } from "react-router-dom";
import Cookies from "js-cookie";

export default function ProtectedRoutes({children}){
    const location = useLocation();
    const token = Cookies.get("token")
    if(!token || token.trim() === ""){
        return <Navigate to ="/register" state={{ from: location }} replace/>
    }
    return children;
    
}
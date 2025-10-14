import logo from './logo.svg';
import './App.css';
import { Routes,Route,Navigate} from "react-router-dom";
import Home from "./Pages/Home.jsx";
import Layout from "./components/Layout";
import PeopleList from "./Pages/PeopleList";
import PublicChat from "./Pages/PublicChat";
import PrivateChat from "./Pages/PrivateChat";
import Login from "./Pages/Login";
import Register from "./Pages/Register.jsx";

function App() {
  return (
    <div className="App">

    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>

      <Route index element={<Home/>}/>
      <Route path="/PeopleList" element={<PeopleList/>}/>
      <Route path="chat/public" element={<PublicChat/>}/>
      <Route path="chat/private/:userId" element={<PrivateChat/>}/>
      <Route path="*" element={<Navigate to="/" replace  />}/>
    </Routes>


      
    </div>
  );
}

export default App;

import { useEffect,useState } from "react";
import Cookies from "js-cookie";
import io from "socket.io-client";
import axiosInstance from "../api/axiosInstance.js";
import "./PrivateChat1.css";
import{ Alert } from "@mui/material";


const socket = io("http://localhost:5000");


export default function PrivateChat(){
    
    const [errorMessage, setErrorMessage] = useState("");
    
    const [ content , setContent ] = useState("");
    const [ messages , setMessages ] = useState([]);
    
    const userID = Cookies.get("id");
    const roomID = "650e2f1b3f1a2c0012345678";
    const friendName = "public";

    useEffect(()=>{
        const fetchMessages = async ()=>{
            try{
                const res  = await axiosInstance.get(`http://localhost:5000/api/message/room/${roomID}`);
                setMessages(res.data);
                console.log(res);
            }catch(err){
              setErrorMessage((err.response?.data?.message || err.response?.data?.error ) || "حدث خطأ غير متوقع");
                console.log(err);
            }
        };
        fetchMessages();
    },[roomID,userID]);

    
    useEffect(()=>{
        socket.on("newMessageRoom",(msg)=>{
            
                console.log("Received new message via socket:", msg);
                setMessages((prev)=>[...prev,msg]);
            
        });

        socket.on("deleteMessage",({messageId})=>{
          setMessages((prev)=>
          prev.map((msg)=>
          msg._id === messageId ? {...msg,deleted:true}:msg
        )
      );
    });

      return ()=> {
        socket.off("newMessageRoom");
        socket.off("deleteMessage");
      }
    },[roomID,userID]);



    // Send Message
    const sendMessage = async (e)=>{
        e.preventDefault();
        if(!content.trim()) return;

        try{
            console.log("senderId:", userID);
            console.log("receiverId:", roomID);
            console.log("content:", content);

            const res = await axiosInstance.post("http://localhost:5000/api/message/room",{
                senderId:userID,
                receiverId: roomID,
                content,
            });
            
            socket.emit("newMessageRoom",res.data);
            console.log("Message sent:", res.data);
            setContent("");
        }catch(err){
              setErrorMessage((err.response?.data?.message || err.response?.data?.error ) || "حدث خطأ غير متوقع");
            console.error(err);
        }
    };

    const deleteMessage = async(id)=>{
      try{
        await axiosInstance.put(`http://localhost:5000/api/message/likeDeleted/${id}`,{
          deleted:true,
        });
        setMessages((prev)=>
          prev.map((msg)=>
            msg._id === id ? {...msg,deleted:true}:msg
          )
        );

      socket.emit("deleteMessage",{messageId:id,senderId:userID,receiverId:roomID});

      }catch(err){
        setErrorMessage((err.response?.data?.message || err.response?.data?.error ) || "حدث خطأ غير متوقع");
        console.error("Error deleting message:",err);
      }
    };

     return (
    <div className="chat-page">
      <h2>{`${friendName}`}</h2>
       {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

      <div className="messages">
        {messages.map((msg) => (
          <div
            key={msg._id}
            className={`message ${msg.senderId._id === userID || msg.senderId === userID ? "sent" : "received"}`}
          >
            {msg.deleted === true ?
              <b style={{color:"red"}}>رسالة محذوفة</b>
            :
              
              <p><div>{msg.senderId.name}</div>{msg.content}</p>}
            
            
    {!msg.deleted && ( msg.senderId._id === userID || msg.senderId === userID )&& (
      <button
        onClick={() => deleteMessage(msg._id)}
        className="delete-btn"
      >
        حذف
      </button>
    )}
            
          </div>
        ))}
      </div>

      <form onSubmit={sendMessage} className="send-box">
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
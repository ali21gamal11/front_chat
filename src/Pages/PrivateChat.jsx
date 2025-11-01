import { useEffect,useState } from "react";
import Cookies from "js-cookie";
import io from "socket.io-client";
import axiosInstance from "../api/axiosInstance.js";
import "./PrivateChat1.css"

const socket = io("http://localhost:5000");


export default function PrivateChat(){
    
    const [ content , setContent ] = useState("");
    const [ messages , setMessages ] = useState([]);
    
    const userId = Cookies.get("id");
    const friendId = Cookies.get("friendId");
    const friendName = Cookies.get("friendName");

    useEffect(()=>{
        const fetchMessages = async ()=>{
            try{
                const res  = await axiosInstance.get(`http://localhost:5000/api/message/${userId}/${friendId}`);
                setMessages(res.data);
            }catch(err){
                console.log(err);
            }
        };
        fetchMessages();
    },[friendId,userId]);

    
    useEffect(()=>{
        socket.on("newMessage",(msg)=>{
            if(
                (msg.senderId === userId && msg.receiverId === friendId)||
                (msg.senderId === friendId && msg.receiverId === userId)
            ){
                setMessages((prev)=>[...prev,msg]);
            }
        });

        socket.on("deleteMessage",({messageId})=>{
          setMessages((prev)=>
          prev.map((msg)=>
          msg._id === messageId ? {...msg,deleted:true}:msg
        )
      );
    });

      return ()=> {
        socket.off("newMessage");
        socket.off("deleteMessage");
      }
    },[friendId,userId]);

    const sendMessage = async (e)=>{
        e.preventDefault();
        if(!content.trim()) return;

        try{
            console.log("senderId:", userId);
console.log("receiverId:", friendId);
console.log("content:", content);

            const res = await axiosInstance.post("http://localhost:5000/api/message",{
                senderId:userId,
                receiverId: friendId,
                content,
            });
            socket.emit("sendMessage",res.data);
            setContent("");
        }catch(err){
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

      socket.emit("deleteMessage",{messageId:id,senderId:userId,receiverId:friendId});

      }catch(err){
        console.error("Error deleting message:",err);
      }
    };

     return (
    <div className="chat-page">
      <h2>{`${friendName}`}</h2>

      <div className="messages">
        {messages.map((msg) => (
          <div
            key={msg._id}
            className={`message ${msg.senderId === userId ? "sent" : "received"}`}
          >
            {msg.deleted === true ?
              <b style={{color:"red"}}>رسالة محذوفة</b>
            :
              <p>{msg.content}</p>}
            
             {/* زر الحذف */}
    {!msg.deleted && msg.senderId === userId && (
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
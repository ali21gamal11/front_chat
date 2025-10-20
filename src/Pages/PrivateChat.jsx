import { useEffect,useState } from "react";
import Cookies from "js-cookie";
import io from "socket.io-client";
import axios from "axios";
import "./PrivateChat.css"

const socket = io("http://localhost:5000");


export default function PrivateChat(){
    
    const [ content , setContent ] = useState("");
    const [ messages , setMessages ] = useState([]);
    
    const userId = Cookies.get("id");
    const friendId = Cookies.get("friendId");

    useEffect(()=>{
        const fetchMessages = async ()=>{
            try{
                const res  = await axios.get(`http://localhost:5000/api/message/${userId}/${friendId}`);
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

        return ()=> socket.off("newMessage");
    },[friendId,userId]);

    const sendMessage = async (e)=>{
        e.preventDefault();
        if(!content.trim()) return;

        try{
            console.log("senderId:", userId);
console.log("receiverId:", friendId);
console.log("content:", content);

            const res = await axios.post("http://localhost:5000/api/message",{
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

     return (
    <div className="chat-page">
      <h2>Private Chat</h2>

      <div className="messages">
        {messages.map((msg) => (
          <div
            key={msg._id}
            className={`message ${msg.senderId === userId ? "sent" : "received"}`}
          >
            <p>{msg.content}</p>
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
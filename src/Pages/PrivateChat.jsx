import { useEffect,useState,useRef } from "react";
import Cookies from "js-cookie";
import io from "socket.io-client";
import axiosInstance from "../api/axiosInstance.js";
import "./PrivateChat1.css";
import{ Alert,IconButton } from "@mui/material";

import BlockIcon from '@mui/icons-material/Block';


const socket = io("http://localhost:5000");


export default function PrivateChat(){
    const [isbanned, setIsBanned] = useState({status:false,by:""});
    
    const [errorMessage, setErrorMessage] = useState("");
    
    const [ content , setContent ] = useState("");
    const [ messages , setMessages ] = useState([]);
    const LastMessageRef = useRef(null)
    const userId = Cookies.get("id");
    const friendId = Cookies.get("friendId");
    const friendName = Cookies.get("friendName");

    useEffect(()=>{
        const fetchMessages = async ()=>{
            try{
                const res  = await axiosInstance.get(`http://localhost:5000/api/message/${userId}/${friendId}`);
                setMessages(res.data);
                console.log(res);

                const user  = await axiosInstance.get(`http://localhost:5000/api/user/${userId}`);
                const isblocked = user.data.bannedList.includes(friendId);
                if(isblocked){
                  setIsBanned({status: true,by:userId});
                  setErrorMessage("انت حظرت هذه المحادثة");
                }

                const friend  = await axiosInstance.get(`http://localhost:5000/api/user/${friendId}`);
                const isHeblockedMe = friend.data.bannedList.includes(userId);
                if(isHeblockedMe){
                  setIsBanned({status: true,by:friendId});
                  setErrorMessage("تم حظرك بواسطة الطرف الاخر");
                }

            }catch(err){
              setErrorMessage((err.response?.data?.message || err.response?.data?.error ) || "حدث خطأ غير متوقع");
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
                console.log("Received new message via socket:", msg);
                setMessages((prev)=>[...prev,msg]);
                
            }

        });

          socket.on("block",(msg)=>{
            if(msg.senderId === friendId && msg.receiverId === userId){
                console.log("تم ضغط زر الحظر بواسطة:", msg.senderId);
                setIsBanned({status: msg.status,by:msg.senderId});
                setErrorMessage("تم حظرك بواسطة الطرف الاخر")

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

    useEffect(()=>{
      LastMessageRef.current?.scrollIntoView({behavior:"smooth"},[messages]);
    })

    

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
              setErrorMessage((err.response?.data?.message || err.response?.data?.error ) || "حدث خطأ غير متوقع");
            console.error(err);
        }
    };

    const block = async()=>{
      try{
      if(isbanned.status === true){
        if(isbanned.by === userId){

          const res = await axiosInstance.put("http://localhost:5000/api/user/block",{
                userblockedId:friendId
          });
          console.log("ضغطت على حظر وراحت للباك صح");
          console.log(res.data)


          socket.emit("block",{senderId: userId,receiverId: friendId,status:!isbanned.status});
          console.log("تم ضغط زر الحظر بواسطتك");
          setIsBanned({status:!isbanned.status,by:userId});
      }else{
        setErrorMessage("لا يمكنك الغاء الحظر..الطرف الاخر قام بحظرك");
      }
      }else{
        const res = await axiosInstance.put("http://localhost:5000/api/user/block",{
                userblockedId:friendId
          });
        console.log(res.data)

        socket.emit("block",{senderId: userId,receiverId: friendId,status:!isbanned.status});
        console.log("تم ضغط زر الحظر بواسطتك");
        setIsBanned({status:!isbanned.status,by:userId});
        setErrorMessage("انت حظرت هذه المحادثة");
        
      }
      

    }catch(err){
          setErrorMessage((err.response?.data?.message || err.response?.data?.error ) || "حدث خطأ غير متوقع");
          console.error(err);
          console.log("في مشكلة في ال api");
        }
      };


    const deleteMessage = async(id)=>{
      try{
        if(isbanned.status === false ){

          await axiosInstance.put(`http://localhost:5000/api/message/likeDeleted/${id}`,{
            deleted:true,
          });
          setMessages((prev)=>
            prev.map((msg)=>
              msg._id === id ? {...msg,deleted:true}:msg
            )
          );
          socket.emit("deleteMessage",{messageId:id,senderId:userId,receiverId:friendId});
        }else{
          setErrorMessage("لا يمكنك حذف الرسائل اثناء الحظر");
        }

      }catch(err){
        setErrorMessage((err.response?.data?.message || err.response?.data?.error ) || "حدث خطأ غير متوقع");
        console.error("Error deleting message:",err);
      }
    };

     return (
    <div className="chat-page">
      <div className="header">
        <h2>{`${friendName}--${isbanned.status}--id:${isbanned.by}`}</h2>
        <IconButton onClick={block} color="error" aria-label="block user">
          <BlockIcon/>
        </IconButton>
      </div>



      <div className="messages">
        {messages.map((msg) => (
          <div
            key={msg._id}
            className={`message ${msg.senderId._id === userId || msg.senderId === userId ? "sent" : "received"}`}
          >
            {msg.deleted === true ?
              <b style={{color:"red"}}>رسالة محذوفة</b>
            :
              <p>{msg.content}</p>}
            
            
    {!msg.deleted &&( msg.senderId._id === userId || msg.senderId === userId )&& (
      <button
        onClick={() => deleteMessage(msg._id)}
        className="delete-btn"
      >
        حذف
      </button>
    )}
            
          </div>
        ))}
        <div ref={LastMessageRef}/>
      </div>
      
      {isbanned.status && <Alert severity="error">{errorMessage}</Alert> }
      {!isbanned.status && 
      <form onSubmit={sendMessage} className="send-box">
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
      }
    </div>
  );
}
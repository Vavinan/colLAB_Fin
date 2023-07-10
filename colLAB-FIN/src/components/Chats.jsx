import React, { useContext, useEffect, useState } from 'react'
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';

const Chats = () => {
  const [chats,setChats] = useState({});
  const {currentUser} = useContext(AuthContext);
  const {dispatch} = useContext(ChatContext);

  useEffect(()=>{
    const getChats = ()=>{
      const unsubscribe = onSnapshot(doc(db,"userChats", currentUser.uid),(doc)=>{
        setChats(doc.data());
      });
      return()=>{
        unsubscribe();
      };
    };
    currentUser.uid && getChats();
  },[currentUser.uid]);

const handleSelect = (u)=>{
  dispatch ({ 
    type:"CHANGE_USER",
    payload: u,
  })
  dispatch({
    type:"TOGGLE_INPUT",
    payload:true,
  })
}
return (
  <div className='chats'>
    {Object.entries(chats || {})?.sort((a,b) => b[1].date - a[1].date).map((chat) => {
      const chatId = chat[0];
      const { userInfo, lastMessage } = chat[1];
      const { displayName, photoURL } = userInfo || {};
      const { text } = lastMessage || {};

      return (
        <div className="userChat" key={chatId} onClick={() => handleSelect(userInfo)}>
          <img src={photoURL} alt="" />
          <div className="userChatInfo">
            <span>{displayName}</span>
            <p>{text}</p>
          </div>
        </div>
      );
    })}
  </div>
);
}
  /*return (
    <div className='chats'>
      {Object.entries(chats) ?.map( (chat) => (
        <div className="userChat" key = {chat[0]}  onClick={ () =>handleSelect(chat[1].userInfo)}  >
        <img src={chat[1].userInfo.photoURL} alt="" />
        <div className="userChatInfo">
          <span>{chat[1].userInfo.displayName}</span>
          <p> {chat[1].lastMessage?.text}</p>
        </div>
      </div>
      ))}

    </div>
  )
}*/

export default Chats;
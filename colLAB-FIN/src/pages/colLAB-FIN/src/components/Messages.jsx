import React, { useContext, useState, useEffect } from 'react'
import Message from "./Message"
import { ChatContext } from '../context/ChatContext'
import { onSnapshot, doc } from 'firebase/firestore';
import { db } from '../firebase';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const unSubscribe = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages)
    });

    return () => {
      unSubscribe();
    }
  }, [data.chatId]);
  console.log(messages)

  return (
    <div className='messages'>
      {messages.map((m) => (
        <Message message={m} key={m.id} />
      )
      )}

    </div>
  );
};

export default Messages
import React, { useContext, useState } from 'react'
import {db} from "../firebase"
import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore';
import {AuthContext} from "../context/AuthContext"
import { ChatContext } from '../context/ChatContext';
const Search = () => {
   const [username,setUsername] = useState("");
   const [user,setUser] = useState(null);
   const [err,setErr] = useState(false);
   const {currentUser} = useContext(AuthContext);
   const { dispatch } = useContext(ChatContext);
   const handleSearch = async () =>{
   const q = query(
    collection(db,"users"),
    where("displayName","==",username) 
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) =>{
        setUser(doc.data())
      });
    } catch(err){
        setErr(true);
    }
   };

   const handleKey = e=>{
    e.code == "Enter" && handleSearch();
   }

   const handleSelect = async () => {
    if (user) {
      const combineId =
        currentUser.uid > user.uid
          ? currentUser.uid + user.uid
          : user.uid + currentUser.uid;
      try {
        const res = await getDoc(doc(db, "chats", combineId));
        if (!res.exists()) {
          // create a chat in the Firebase collection
          await setDoc(doc(db, "chats", combineId), { messages: [] });
  
          // create user chats
          await updateDoc(doc(db, "userChats", currentUser.uid), {
            [combineId + ".userInfo"]: {
              uid: user.uid,
              displayName: user.displayName,
              photoURL: user.photoURL,
            },
            [combineId + ".date"]: serverTimestamp(),
          });
  
          await updateDoc(doc(db, "userChats", user.uid), {
            [combineId + ".userInfo"]: {
              uid: currentUser.uid,
              displayName: currentUser.displayName,
              photoURL: currentUser.photoURL,
            },
            [combineId + ".date"]: serverTimestamp(),
          });
        }
      } catch (err) {
        console.error(err);
      }
  
      dispatch({
        type: "CHANGE_USER",
        payload: user,
      });
      dispatch({
        type:"TOGGLE_INPUT",
        payload:true,
      })
      setUser(null);
      setUsername("");
    }
  };
  
  return (
    <div className='search'>
      <div className="searchform">
        <input type="text" placeholder='find contact' 
        onKeyDown={handleKey}  
        onChange={ (e) =>setUsername(e.target.value)} 
          value={username}
        />
      </div>
      {err && <span> Not found</span>}
      { user && <div className="userChat" onClick={handleSelect}>
        <img src={user.photoURL} alt="" />
        <div className="userChatInfo">
          <span>{user.displayName}</span>
        </div>
      </div> }
    </div>
  )
}

export default Search



/*


const handleSelect = async () =>{
    //checking whether chats in firestore exists, if not we create new chat
    const combineId =  currentUser.uid > user.uid ?
      currentUser.uid + user.uid :
      user.uid + currentUser.uid ;
    try{
      const res = await getDoc(doc(db,"chats",combineId));
      if(!res.exists()){
        //create a chat in the firebase collection
        await setDoc(doc(db,"chats",combineId),{messages:[]});

        //create user chats
        await updateDoc(doc(db,"userChats",currentUser.uid),{
          [combineId+".userInfo"]:{
            uid:user.uid,
            displayName:user.displayName,
            photoURL:user.photoURL
          },
          [combineId+".date"]:serverTimestamp(),
        });

        await updateDoc(doc(db,"userChats",user.uid),{
          [combineId+".userInfo"]:{
            uid:currentUser.uid,
            displayName:currentUser.displayName,
            photoURL:currentUser.photoURL
          },
          [combineId+".date"]:serverTimestamp(),

        });

      }
    } catch(err){

    }  

    
    setUser(null);
    setUsername("") 


   };




*/
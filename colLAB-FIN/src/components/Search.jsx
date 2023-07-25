import React, { useContext, useState } from 'react'
import {db} from "../firebase"
import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where,orderBy } from 'firebase/firestore';
import {AuthContext} from "../context/AuthContext"
import { ChatContext } from '../context/ChatContext';


const Search = () => {
   const [username,setUsername] = useState("");
   const [user,setUser] = useState(null);
   const [err,setErr] = useState(false);
   const {currentUser} = useContext(AuthContext);
   const { dispatch } = useContext(ChatContext);
   const handleSearch = async () => {
    if (!username) {
      setUser(null);
      setErr(false);
      return;
    }
  
    const q = query(
      collection(db, "users"),
      orderBy("displayName")
    );
  
    try {
      const querySnapshot = await getDocs(q);
      let closestUser = null;
  
      // Create a case-insensitive regular expression from the search term
      const searchTermRegex = new RegExp(username, "i");
  
      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        const displayName = userData.displayName;
  
        if (searchTermRegex.test(displayName)) {
          if (!closestUser || displayName.length < closestUser.displayName.length) {
            closestUser = {
              ...userData,
            };
          }
        }
      });
  
      if (closestUser) {
        setUser(closestUser);
        setErr(false);
      } else {
        setErr(true);
        setUser(null);
      }
    } catch (err) {
      setErr(true);
      setUser(null);
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
      
      <div>
        <input className="chat-searchbar" type="text" placeholder='find contact... @' 
        onKeyDown={handleKey}  
        onChange={ (e) =>setUsername(e.target.value)} 
          value={username}
        />
      </div>

      {err && <span> Not found</span>}
      
      { user && 
      <div className="searched-user" onClick={handleSelect}>
        <img className='searched-user-pic' src={user.photoURL} alt="" />
        <div className="searched-user-username">
          <span>{user.displayName}</span>
        </div>
      </div> }
    </div>
  )
}

export default Search;



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
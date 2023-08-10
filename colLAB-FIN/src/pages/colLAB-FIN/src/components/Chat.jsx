import React, { useContext, useState } from 'react'
import addicon from "../images/addicon.png"
import cam from "../images/cam.png"
import more from "../images/more.png"
import Messages from './Messages'
import InputMessages from "./InputMessages"
import { ChatContext } from '../context/ChatContext'
import Posts from '../pages/Posts'
import { ShowBio } from './ShowBio'


const Chat = () => {

  const { data } = useContext(ChatContext);
  const [showPosts, setShowPosts] = useState(false);
  const [showBioPopup, setShowBioPopup] = useState(false);
  const toggleBioPopup = () => {
    setShowBioPopup((prevValue) => !prevValue);
  };

  const closeBioPopup = () => {
    setShowBioPopup(false);
  };

  return (
    <div className='chat'>

      {/* TOP HALF */}
      <div className="chatInfo">
        <div>
          <img className='chat-pfp' src={data.user?.photoURL}></img>
          <span className='chat-name'>{data.user?.displayName}</span>
        </div>

        {data.showInput &&
          <button className='show-bio-btn' onClick={toggleBioPopup}>Open Bio</button>}
      </div>

      {/* BOTTOM HALF */}
      <Messages />
      {data.showInput && <InputMessages />}
      {showPosts && <Posts />}

      {showBioPopup &&
        <div className="bio-popup">
          <ShowBio user={data.user?.uid} />
          <button className="bio-popup-close-btn" onClick={closeBioPopup}>Close</button>
        </div>}
    </div>
  )
}

export default Chat
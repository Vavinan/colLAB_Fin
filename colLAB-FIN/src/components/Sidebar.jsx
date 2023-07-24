import React from 'react'
import Navbar from "./Navbar"
import Search from "./Search"
import Chats from "./Chats"

const Sidebar = () => {
  return (
      <div className="sidebar"> 
         <Navbar/>   {/*CHATS Wording */}
         <Search/>   {/*Search bar for chats*/}
         <Chats/>    {/*CHATS*/}
         
      </div> 
 )
}

export default Sidebar;
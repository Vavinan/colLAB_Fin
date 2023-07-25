import React, { useState , useContext, useEffect} from 'react';
import Sidebar from '../components/Sidebar';
import Chat from '../components/Chat';
import Posts from './Posts';
import CreatePost from './PostPages/CreatePost';
import Bio from './PostPages/Bio';
import Navbar from '../components/Navbar';
import { auth } from '../firebase';
import { AuthContext } from '../context/AuthContext';
import { getUserDataFromFirestore } from '../firebase'; 

export const Home = () => {
  const [showPosts, setShowPosts] = useState(true);
  const [isPostsPage, setIsPostsPage] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [showBio,setShowBio] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const handleShowPosts = () => {
    setShowPosts(!showPosts);
    setIsPostsPage(!isPostsPage);
    setShowCreate(false);
    setShowBio(false);
  };

  const handleCreatePost = () => {
    setSelectedPost(null);
    setShowCreate(!showCreate);
    setShowBio(false);
    //setShowPosts(!showPosts);
   
  };
  const handleShowBio = () => {
    setShowBio(true);
    setShowCreate(false);
    setShowPosts(false);
    setIsPostsPage(false);
  }
  const handlePostSuccess = () => {
    setShowPosts(true);
    setIsPostsPage(true);
    setShowCreate(false);
    setShowBio(false);
    setSelectedPost(null);
  };
  const handleEditPost = (post) => {
    setSelectedPost(post);
    setShowCreate(true);
    setShowBio(false);
    setShowPosts(true);
  };

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        // Handle sign out success
      })
      .catch((error) => {
        // Handle sign out error
        console.log(error);
      });
  };

  const { currentUser } = useContext(AuthContext);
  const [userDisplayName, setUserDisplayName] = useState('');
  useEffect (() => {
    const fetchUserData = async () => {
      if (currentUser && currentUser.uid) {
        const userData = await getUserDataFromFirestore(currentUser.uid);
        if (userData && userData.displayName) {
          setUserDisplayName(userData.displayName);
        }
      }
    };

    fetchUserData();
  }, [currentUser]);





  return (
    <div className="home">
      <div className="top-navigation-bar">
        <div className='left-top-navigation-bar'>
           {/* <img className="collab-logo" src="src/images/ColLAB.png"></img>  */}
           <img className="collab-logo" src="/ColLAB.png"></img>
          <div className='greeting-text'>Hello, {userDisplayName}!</div>      
        </div>
        
        <div className="center-top-navigation-bar">

         <button className= "navigation-bar-button" onClick={handleShowPosts}>
          {isPostsPage ? 'Chats' : 'Home'}
        </button>
  
        {isPostsPage && (
          <button className= "navigation-bar-button" onClick={handleCreatePost}>
            {showCreate ? 'Home' : 'Create Post'}
          </button>
        )}

        {isPostsPage && !showCreate && (
            <button className="navigation-bar-button" onClick={handleShowBio}>
              Profile
            </button>
          )}

        </div>

          <button className='logout-button' onClick={handleSignOut}>Logout</button>
        
      </div>
    
      
      <div className="chatpage-container">
        {!showPosts && !showCreate && !showBio && <Sidebar />}
        {!showPosts && !showCreate && !showBio && <Chat />}
        {showPosts ? (
          showCreate ? (
            <CreatePost onPostSuccess={handlePostSuccess}  selectedPost={selectedPost} />
          ) : (
            <Posts isAuth={true} handleShowPosts={handleShowPosts}  handleEditPost={handleEditPost} />
          )
        ) : null }
        {showBio && <Bio />} {/* Display the Bio page when showBio state is true */}

      </div>
    </div>
  );
  
};

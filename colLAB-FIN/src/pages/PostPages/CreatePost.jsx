import React, { useEffect, useState } from 'react'
import {addDoc,collection, doc, updateDoc} from 'firebase/firestore'
import { auth,db } from '../../firebase'
import { useNavigate } from 'react-router-dom'
import "./postcss.css";
const CreatePost = ( {onPostSuccess,selectedPost}) => {

  const [title,setTitle] = useState("");
  const[postContent,setPostContent]=useState("");
  const[skills,setSkills]=useState("");
  //const[contact,setContact]=useState("");

  const navigate=useNavigate();
   useEffect(()=>{
    if(!auth.currentUser){
     navigate("/login");
    }
    if (selectedPost) {
      setTitle(selectedPost.title);
      setPostContent(selectedPost.postContent);
      setSkills(selectedPost.skills);
    } else{
      setTitle("");
      setPostContent("");
      setSkills("");
    }
   },[selectedPost,navigate]);

  const postsCollectionRef=collection(db,"posts");

  const submitPost=async() => {
    if(title ==='' || postContent ===''){
      alert('Fill up the fields');
    } else{
        try {
          if (selectedPost) {
            // If there is a selectedPost, update the existing post
            const docRef = doc(db, 'posts', selectedPost.id);
            await updateDoc(docRef, {
              title: title,
              postContent: postContent,
              skills: skills,

              //...
            });
          } else {
            // If there is no selectedPost, create a new post
            await addDoc(postsCollectionRef, {
              title: title,
              postContent: postContent,
              skills: skills,
              contact:auth.currentUser.displayName,

              author :{
              name:auth.currentUser.displayName,
              id:auth.currentUser.uid,
             
            } 
              //...
            });
          } 
          
          //navigate("/");
          onPostSuccess();

        } catch(error){
          console.log(error);
        }
    }
  }


  return (
    <div className="createPost-container">
      <div className="postForm">
        <h1 className="createPost-heading"> {selectedPost ? 'Edit the Project Post' : 'Create a Project Post'}</h1>

      <div className="createPost-split-container">
         
         <div className="split-container">   {/* left container */}
            <div  className="mb-3">
            <label htmlFor="title" className="form-label"> Title:</label>
            <input type="text" placeholder='Project Title' value={title} className='form-control' onChange={(e)=>setTitle(e.target.value)} />
            </div>

            <div  className="mb-3">
            <label htmlFor="tags" className="form-label"  >Skills Required:</label>
              <textarea placeholder='Technical Skills needed for your project...' value={skills} className='form-control' onChange={(e)=>setSkills(e.target.value)}></textarea>
              </div>

            
          </div>

          <div className="split-container">   {/* right container */}            
          <div  className="mb-3">
            <label htmlFor="posts" className="form-label"  >Description:</label>
              <textarea rows="8" placeholder='Elaborate on your idea!' value={postContent} className='form-control' onChange={(e)=>setPostContent(e.target.value)}></textarea>
            </div>

              {/*<div className="mb-3">
                <label htmlFor="contact" className="form-label" >Chat User Name:</label>
                <input type="text" placeholder='Contact' className='form-control' onChange={(e)=>setContact(e.target.value)}/>

              </div>   */}         
            
          </div>

      </div>
      <div className='publish-container'>
        <button className="publish-button" onClick={submitPost} >{selectedPost ? 'Update' : 'PUBLISH'}</button> 

      </div>
        
    </div>
        
          
        
  </div>

  )
}

export default CreatePost;
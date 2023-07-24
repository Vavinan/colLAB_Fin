 
 import React, { useState, useEffect } from 'react';
 import { doc, setDoc, getDoc } from 'firebase/firestore';
 import { auth, db } from '../../firebase';
 const Bio = () => {

   const [eduLevel, setEduLevel] = useState(undefined);
   const [courseOfStudy, setCourseOfStudy] = useState(undefined);
   const [skills, setSkills] = useState(undefined);
   const [school, setSchool] = useState(undefined);
   const [email, setEmail] = useState(undefined);
   const [photo, setPhoto] = useState(undefined);
   const [userName, setUserName] = useState(undefined);
   const [name, setName] = useState(undefined);

 
   const id = auth.currentUser.uid;
   useEffect(() => {
     const getBioContent = async () => {
       const docRef = doc(db, 'bio', id); // Replace "bio" with your collection name
       const docSnap = await getDoc(docRef); 
 
       const userRef = doc(db, 'users', id);
       const userSnap = await getDoc(userRef);

       if (docSnap.exists()) {
        setEduLevel(docSnap.data().eduLevel);
        setCourseOfStudy(docSnap.data().courseOfStudy);
        setSkills(docSnap.data().skills);
        setSchool(docSnap.data().school);
      } else {
        setEduLevel(undefined);
        setCourseOfStudy(undefined);
        setSkills(undefined);
        setSchool(undefined);
      }
  
      if (userSnap.exists()) {
        setEmail(userSnap.data().email);
        setPhoto(userSnap.data().photoURL);
        setUserName(userSnap.data().displayName);
        setName(userSnap.data().myname);
      } else {
        setEmail(undefined);
        setUserName(undefined);
        setName(undefined);
        setPhoto(undefined);
      }

     };
 
     getBioContent();
   }, [id]);
 
   const saveBioContent = async () => {
     const docRef = doc(db, 'bio', id); 
     try {
      await setDoc(docRef, { eduLevel, courseOfStudy, skills, school }, { merge: true });
      window.alert('Bio saved successfully!');
    } catch (error) {
      console.error('Error saving bio:', error);
      window.alert('Failed to save bio. Please try again later.');
    }
   };
 
   return (
    <div className='profile-page-container'>
     <div className='profile-container'>
      <img className='profile-pic'
           src={photo}
           alt=''
         />
      <div className='profile-details'>
          <p className='profile-name'>{name}</p>
          <p className='profile-username'>@{userName}</p> 
          <p className='profile-email'>{email}</p>

      </div>
    </div>
    <div className='bio-container'>
      <p className='bio'>Bio:</p>
    <div className='profile-bio-container'>
        <div className='bio-school'>
        
        <div>
        <span className='input-filler'>Education Level:</span>
          <input className='input-school'
              type="text"
              value={eduLevel || ''}
              onChange={(e) => setEduLevel(e.target.value)}
              placeholder="Education Level:"
            /></div>
        
          <div>
          <span className='input-filler'>Course of Study:</span>
            <input className='input-school'
            type="text"
            value={courseOfStudy || ''}
            onChange={(e) => setCourseOfStudy(e.target.value)}
            placeholder="Course of Study:"
          />
          </div>

          <div>
          <span className='input-filler'>School: </span>
            <input className='input-school'
            type="text"
            value={school ||''}
            onChange={(e) => setSchool(e.target.value)}
            placeholder="School:"
          />
          </div>
          </div> 
          

        <textarea className='skills-container'
          value={skills || ''}
          onChange={(e) => setSkills(e.target.value)}
          rows="5"
          cols="30"
          placeholder="Skills:"
        ></textarea>
        
        

    </div>
    <div className='button-div'>
      <button className='save-button' onClick={saveBioContent}>Save</button>
    </div>
    


    </div>
      
           
     </div>
   );
 };
 
 export default Bio;
 
 
 
 
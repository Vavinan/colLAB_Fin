 
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
     const docRef = doc(db, 'bio', id); // Replace "bio" with your collection name
     await setDoc(docRef, { eduLevel, courseOfStudy, skills,school}, { merge: true });
   };
 
   return (
     <div>
     <div>
      <img
           src={photo}
           alt=''
           style={{
             width: '100px',
             height: '100px',
             borderRadius: '50%',
             objectFit: 'cover',
           }}
         />  
           <h6> <strong> User Name: </strong> {userName} </h6> 
           <h6> <strong> Name: </strong> {name} </h6> 
           <h6> <strong> Email: </strong> {email} </h6> <br/>
 
     </div>
       <textarea
         value={eduLevel || ''}
         onChange={(e) => setEduLevel(e.target.value)}
         rows={5}
       ></textarea>
        <input
       type="text"
       value={courseOfStudy || ''}
       onChange={(e) => setCourseOfStudy(e.target.value)}
       placeholder="Course of Study"
     />
     <input
       type="text"
       value={skills || ''}
       onChange={(e) => setSkills(e.target.value)}
       placeholder="Skills"
     />
     <input
       type="text"
       value={school ||''}
       onChange={(e) => setSchool(e.target.value)}
       placeholder="School"
     />
       <button onClick={saveBioContent}>Save</button>
     </div>
   );
 };
 
 export default Bio;
 
 
 
 
 
 
 /*import React, { useState, useEffect } from 'react';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';
const Bio = () => {
  const [eduLevel, seteduLevel] = useState('');
  const [courseOfStudy, setCourseOfStudy] = useState('');
  const [skills, setSkills] = useState('');
  const [school, setSchool] = useState('');

  const id = auth .currentUser.uid;
  useEffect(() => {
    const getBioContent = async () => {
      const docRef = doc(db, 'bio', id); // Replace "bio" with your collection name
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        seteduLevel(docSnap.data().eduLevel);
        setCourseOfStudy(docSnap.data().courseOfStudy);
        setSkills(docSnap.data().skills);
        setSchool(docSnap.data().school);
      } else {
        seteduLevel('');
        setCourseOfStudy('');
        setSkills('');
        setSchool('');
      }
    };

    getBioContent();
  }, [id]);

  const saveBioContent = async () => {
    const docRef = doc(db, 'bio', id); // Replace "bio" with your collection name
    await setDoc(docRef, { eduLevel, courseOfStudy, skills,school}, { merge: true });
  };

  return (

    <div>
        
    </div>

    <div>
      <textarea
        value={eduLevel}
        onChange={(e) => seteduLevel(e.target.value)}
        rows={5}
      ></textarea>
       <input
      type="text"
      value={courseOfStudy}
      onChange={(e) => setCourseOfStudy(e.target.value)}
      placeholder="Course of Study"
    />
    <input
      type="text"
      value={skills}
      onChange={(e) => setSkills(e.target.value)}
      placeholder="Skills"
    />
    <input
      type="text"
      value={school}
      onChange={(e) => setSchool(e.target.value)}
      placeholder="school"
    />
      <button onClick={saveBioContent}>Save</button>
    </div>
  );
};

export default Bio;*/

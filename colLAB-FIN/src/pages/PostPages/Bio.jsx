import React, { useState, useEffect } from 'react';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';
const Bio = () => {
  const [bioContent, setBioContent] = useState('');
  const [courseOfStudy, setCourseOfStudy] = useState('');
  const [skills, setSkills] = useState('');

  const id = auth .currentUser.uid;
  useEffect(() => {
    const getBioContent = async () => {
      const docRef = doc(db, 'bio', id); // Replace "bio" with your collection name
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setBioContent(docSnap.data().content);
        setCourseOfStudy(docSnap.data().courseOfStudy);
        setSkills(docSnap.data().skills);
      } else {
        setBioContent('');
        setCourseOfStudy('');
        setSkills('');
      }
    };

    getBioContent();
  }, [id]);

  const saveBioContent = async () => {
    const docRef = doc(db, 'bio', id); // Replace "bio" with your collection name
    await setDoc(docRef, { content: bioContent, courseOfStudy, skills}, { merge: true });
  };

  return (
    <div>
      <textarea
        value={bioContent}
        onChange={(e) => setBioContent(e.target.value)}
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
      <button onClick={saveBioContent}>Save</button>
    </div>
  );
};

export default Bio;




/*import React, { useState, useEffect } from 'react';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';
const Bio = () => {
  const [bioContent, setBioContent] = useState('');
  const id = auth .currentUser.uid;
  useEffect(() => {
    const getBioContent = async () => {
      const docRef = doc(db, 'bio', id); // Replace "bio" with your collection name
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setBioContent(docSnap.data().content);
      } else {
        setBioContent('');
      }
    };

    getBioContent();
  }, [id]);

  const saveBioContent = async () => {
    const docRef = doc(db, 'bio', id); // Replace "bio" with your collection name
    await setDoc(docRef, { content: bioContent }, { merge: true });
  };

  return (
    <div>
      <textarea
        value={bioContent}
        onChange={(e) => setBioContent(e.target.value)}
        rows={5}
      ></textarea>
      <button onClick={saveBioContent}>Save</button>
    </div>
  );
};

export default Bio; */

import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

export const ShowBio = ({ user }) => {
  const [bio, setBio] = useState('');
  const [courseOfStudy, setCourseOfStudy] = useState('');
  const [skills, setSkills] = useState('');

  useEffect(() => {
    const fetchBio = async () => {
      try {
        const docRef = doc(db, 'bio', user);
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
          const bioData = docSnapshot.data().content;
          const courseOfStudyData = docSnapshot.data().courseOfStudy;
          const skillsData = docSnapshot.data().skills;

          setBio(bioData);
          setCourseOfStudy(courseOfStudyData);
          setSkills(skillsData);

          //console.log(user);

        } else {
          setBio('No bio available');
          setCourseOfStudy('No course details available');
          setSkills('No were skills updated');
        }
      } catch (error) {
        console.error('Error fetching bio:', error);
      }
    };

    fetchBio();
  }, [user]);

  return (
<div>
    <br/>
    <h6><strong>Bio:</strong></h6>
    <div style={{ maxHeight: '200px', overflow: 'auto' }}>{bio}</div> <br/>
    <h6><strong>Course of Study:</strong></h6>
    <div style={{ maxHeight: '100px', overflow: 'auto' }}>{courseOfStudy}</div> <br/>
    <h6><strong>Skills:</strong></h6>
    <div style={{ maxHeight: '100px', overflow: 'auto' }}>{skills}</div>
  </div>
  );

};




/*import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

export const ShowBio = ({ user }) => {
  const [bio, setBio] = useState('');

  useEffect(() => {
    const fetchBio = async () => {
      try {
        const docRef = doc(db, 'bio', user);
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
          const bioData = docSnapshot.data().content;
          setBio(bioData);
          console.log(user);

        } else {
          setBio('No bio available');
        }
      } catch (error) {
        console.error('Error fetching bio:', error);
      }
    };

    fetchBio();
  }, [user]);

  return <div>{bio}</div>;
};
*/
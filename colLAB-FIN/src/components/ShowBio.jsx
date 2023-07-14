import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

export const ShowBio = ({ user }) => {
  const [eduLevel, setEduLevel] = useState('');
  const [courseOfStudy, setCourseOfStudy] = useState('');
  const [skills, setSkills] = useState('');
  const [school, setSchool] = useState('');
  const [email, setEmail] = useState('');
  const [photo, setPhoto] = useState('');
  const [name, setName] = useState('');
  const [userName, setUserName] = useState('');


  useEffect(() => {
    const fetchBio = async () => {
      try {
        const docRef = doc(db, 'bio', user);
        const docSnapshot = await getDoc(docRef);

        const userRef = doc(db, 'users', user);
        const userSnapshot = await getDoc(userRef);

if (docSnapshot.exists()) {
          const eduData = docSnapshot.data().eduLevel;
          const courseOfStudyData = docSnapshot.data().courseOfStudy;
          const skillsData = docSnapshot.data().skills;
          const schoolName = docSnapshot.data().school;


          setEduLevel(eduData);
          setCourseOfStudy(courseOfStudyData);
          setSkills(skillsData);
          setSchool(schoolName);

          //console.log(user);

        } else {
          setEduLevel('No bio available');
          setCourseOfStudy('No course details available');
          setSkills('No were skills updated');
          setSchool("No school name updated")
        }

        if(userSnapshot.exists()){
          const emailId = userSnapshot.data().email;
          const photoURL = userSnapshot.data().photoURL;
          const displayName = userSnapshot.data().displayName;
          const Name = userSnapshot.data().myname;

          setEmail(emailId);
          setPhoto(photoURL);
          setUserName(displayName);
          setName(Name);

        }
      } catch (error) {
        console.error('Error fetching bio:', error);
      }
    };

    fetchBio();
  }, [user]);

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
        />    <h6> <strong> User Name: </strong> {userName} </h6> 
        <h6> <strong> Name: </strong> {name} </h6> 
    <h6> <strong> Email: </strong> {email} </h6> <br/>
    </div>
    <div style={{ maxHeight: '200px', overflow: 'auto' }}>  <h6><strong>Education Level:</strong> {eduLevel} </h6> </div>
    <div style={{ maxHeight: '100px', overflow: 'auto' }}> <h6><strong>Course of Study:</strong> {courseOfStudy} </h6> </div>
    <div style={{ maxHeight: '100px', overflow: 'auto' }}>  <h6><strong>Skills:</strong> {skills} </h6> </div>
    <div style={{ maxHeight: '100px', overflow: 'auto' }}>  <h6><strong>School:</strong> {school} </h6> </div>

  </div>
  );

};





/*import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

export const ShowBio = ({ user }) => {
  const [bio, setBio] = useState('');
  const [courseOfStudy, setCourseOfStudy] = useState('');
  const [skills, setSkills] = useState('');
  const [email, setEmail] = useState('');
  const [photo, setPhoto] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    const fetchBio = async () => {
      try {
        const docRef = doc(db, 'bio', user);
        const docSnapshot = await getDoc(docRef);

        const userRef = doc(db, 'users', user);
        const userSnapshot = await getDoc(userRef);

        if (docSnapshot.exists() && userSnapshot.exists()) {
          const bioData = docSnapshot.data().content;
          const courseOfStudyData = docSnapshot.data().courseOfStudy;
          const skillsData = docSnapshot.data().skills;
          const emailId = userSnapshot.data().email;
          const photoURL = userSnapshot.data().photoURL;
          const displayName = userSnapshot.data().displayName;


          setBio(bioData);
          setCourseOfStudy(courseOfStudyData);
          setSkills(skillsData);
          setEmail(emailId);
          setPhoto(photoURL);
          setName(displayName);

        } else {
          setBio('No Education Level available');
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
        />    <h7> <strong> Name: </strong> {name} </h7> <br/>
    <h7> <strong> Email: </strong> {email} </h7> <br/>
    </div>
    <div style={{ maxHeight: '200px', overflow: 'auto' }}>  <h6><strong>Bio:</strong> {bio} </h6> </div>
    <div style={{ maxHeight: '100px', overflow: 'auto' }}> <h6><strong>Course of Study:</strong> {courseOfStudy} </h6> </div>
    <div style={{ maxHeight: '100px', overflow: 'auto' }}>  <h6><strong>Skills:</strong> {skills} </h6> </div>
  </div>
  );
};
*/

import React, { useState, useEffect } from 'react';
import { doc, setDoc, getDoc, collection, getDocs, updateDoc } from 'firebase/firestore';
import { auth, db, EmailAuthProvider } from '../../firebase';
import { reauthenticateWithCredential, updatePassword, updateEmail } from 'firebase/auth';

const Bio = () => {
  const [eduLevel, setEduLevel] = useState("");
  const [courseOfStudy, setCourseOfStudy] = useState("");
  const [skills, setSkills] = useState("");
  const [school, setSchool] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState("");
  const [userName, setUserName] = useState("");
  const [name, setName] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [editablePassword, setEditablePassword] = useState("");

  const id = auth.currentUser.uid;
  useEffect(() => {
    const getBioContent = async () => {
      const docRef = doc(db, 'bio', id);
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


  const updateEmailInPostsCollection = async (updatedEmail) => {
    try {
      const postsRef = collection(db, 'posts');
      const querySnapshot = await getDocs(postsRef);

      // Fetch all posts by the current user
      const userPosts = [];
      querySnapshot.forEach((doc) => {
        const post = doc.data();
        if (post.author.id === auth.currentUser.uid) {
          userPosts.push({ id: doc.id, data: post });
        }
      });

      // Update email in each post
      for (const post of userPosts) {
        const postRef = doc(db, 'posts', post.id);
        await updateDoc(postRef, { 'author.email': updatedEmail });
      }
    } catch (error) {
      console.error('Error updating email in posts collection:', error);
      throw new Error('Failed to update email in posts collection. Please try again later.');
    }
  };

  const saveEmailAndPassword = async () => {
    const user = auth.currentUser;

    if (!user) {
      console.error('User is not signed in.');
      return;
    }

    const userRef = doc(db, 'users', id);
    try {
      let updatedEmail = newEmail.trim();
      if (!updatedEmail) {
        updatedEmail = email;
        setNewEmail(email);
      }
      await setDoc(userRef, {
        email: updatedEmail,
        displayName: userName,
      }, { merge: true });

      await updateEmailInPostsCollection(updatedEmail);

      if (newEmail && newEmail.trim() !== '') {
        try {
          const emailCredential = EmailAuthProvider.credential(user.email, currentPassword);
          await reauthenticateWithCredential(user, emailCredential);
          await updateEmail(user, newEmail);
        } catch (error) {
          console.error('Error reauthenticating user:', error);
          throw new Error('Failed to reauthenticate user. Please check the password and try again.');
        }
      }

      if (editablePassword && editablePassword.trim() !== '') {
        try {
          const passwordCredential = EmailAuthProvider.credential(user.email, currentPassword);
          await reauthenticateWithCredential(user, passwordCredential);
          await updatePassword(user, editablePassword);
        } catch (error) {
          console.error('Error reauthenticating user:', error);
          throw new Error('Failed to reauthenticate user. Please check the password and try again.');
        }
      }

      window.alert('Email and Password saved successfully!');
      setEmail(newEmail);
    } catch (error) {
      console.error('Error saving email and password:', error);
      window.alert('Failed to save email and password. Please try again later.');
    }
  };

  const saveBioData = async () => {
    const docRef = doc(db, 'bio', id);
    try {
      await setDoc(docRef, { eduLevel, courseOfStudy, skills, school }, { merge: true });
      window.alert('Bio data saved successfully!');
    } catch (error) {
      console.error('Error saving bio data:', error);
      window.alert('Failed to save bio data. Please try again later.');
    }
  };


  return (
    <div className='profile-page-container'>
      <div className='profile-container'>
        <img
          className='profile-pic'
          src={photo}
          alt=''
        />
        <div className='profile-details'>
          <p className='profile-name'>{name}</p>
          <p className='profile-email'>{email}</p>

          <p className='profile-username'>@{userName}</p>

          <div className='editable-box'>
            <p className='editable-text'>*Change Email/Password:</p>
            <input
              className='editable-input-fields'
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter current password"
            />
            <input
              className='editable-input-fields'
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="Enter new email"
            />
            <input
              className='editable-input-fields'
              type="password"
              value={editablePassword}
              onChange={(e) => setEditablePassword(e.target.value)}
              placeholder="Enter new password"
            />

          </div>

        </div>
        <button className='save-password-button' onClick={saveEmailAndPassword}>
          Save Email & Password
        </button>
      </div>
      <div className='bio-container'>
        <p className='bio'>Bio:</p>
        <div className='profile-bio-container'>
          <div className='bio-school'>
            <div>
              <span className='input-filler'>Education Level:</span>
              <input
                className='input-stuff-box'
                type="text"
                value={eduLevel || ''}
                onChange={(e) => setEduLevel(e.target.value)}
                placeholder="Education Level:"
              />
            </div>
            <div>
              <span className='input-filler'>Course of Study:</span>
              <input
                className='input-stuff-box'
                type="text"
                value={courseOfStudy || ''}
                onChange={(e) => setCourseOfStudy(e.target.value)}
                placeholder="Course of Study:"
              />
            </div>
            <div>
              <span className='input-filler'>School: </span>
              <input
                className='input-stuff-box'
                type="text"
                value={school || ''}
                onChange={(e) => setSchool(e.target.value)}
                placeholder="School:"
              />
            </div>
          </div>
          <textarea
            className='skills-container'
            value={skills || ''}
            onChange={(e) => setSkills(e.target.value)}
            rows="5"
            cols="30"
            placeholder="Skills:"
          ></textarea>
        </div>
        <div className='button-div'>

          <button className='save-button' onClick={saveBioData}>
            Save Bio Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default Bio;




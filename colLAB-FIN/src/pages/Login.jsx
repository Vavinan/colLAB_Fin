import React from 'react'
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

export const Login = () => {

  const [err, setErr] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth,email,password);
      navigate("/")
      
    } catch (err) {
      setErr(true);
    }
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithPopup(auth, Google);


      navigate("/");
    } catch (err) {
      setErr(true);
    }

  };

  return (
    <div className='login-container'>
        <div className="login-wrapper">
          <img className="colLAB-logo" src="src/images/ColLAB__1_-removebg-preview.png"></img>
          <span className="login-caption">collaborate today!</span> 
          <span className="login-title">Log In</span>
            <form className="login-form" onSubmit={handleSubmit}>
              <input type="email" placeholder='Email'/>
              <input type="password" placeholder="Password"/>
              <button className='login-button'>Login</button>
              {err && <span className="error-msg">*Something went wrong</span>}

            </form>
            <p>Don't have an account? <Link to="/register"> Register</Link> </p>
        </div>
    </div>
  )
}

import React, { useState } from "react";
import twitterImage from "../../assets/images/twitterLoginImage.PNG";
import { useCreateUserWithEmailAndPassword ,useSignInWithGoogle} from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import GoogleButton from 'react-google-button'
import { Link, useNavigate } from "react-router-dom";
import './Login.css'
import axios from "axios";

function Signup() {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate =useNavigate()

  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);

  if (user || googleUser){ 
    navigate('/')
    console.log(user);
    console.log(googleUser)
  }

  if (error) console.log(error.message);

  if (loading) console.log("Loading......");

  const handleSubmit = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(email, password);

    const user={
      username,
      name,
      email
    }

    axios.post('https://twitter-x-server-kunal.onrender.com/register',user);
    
  }

  const handleGoogleSignIn =()=>{
    signInWithGoogle();

  }
  return (
    <div className="login-container">
      <div className="image-container">
        <img src={twitterImage} className="image" />
      </div>
      <div className="form-container">
        <div className="">
        <h2 className="heading">Happening now</h2>
        <h3 className="heading1">Join Twitter today</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="display-name"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            className="display-name"
            placeholder="Full Name"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            className="email"
            placeholder="Email-address"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="btn-login">
            <button type="submit" className="btn">
              Signup
            </button>
          </div>
        </form>
        </div>
        <hr/>
        <div className="google-button">
            <GoogleButton
            className="g-btn"
            type="light"
            onClick={handleGoogleSignIn}/>
        </div>
       
        <div>
            Already have an account?
            <Link
            to='/login'
            style={{
                textDecoration:'none',
                fontWeight:'600',
                marginLeft:'5px',
                color:'skyBlue'
            }}>
            Login
            </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;

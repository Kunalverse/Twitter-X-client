import React, { useState } from 'react'
import twitterImage from '../../assets/images/twitterLoginImage.PNG'
import {useSignInWithEmailAndPassword,useSignInWithGoogle} from 'react-firebase-hooks/auth'
import auth from '../../firebase.init'
import './Login.css'
import GoogleButton from 'react-google-button'
import { Link, useNavigate } from "react-router-dom";

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate =useNavigate()

    const [
  signInWithEmailAndPassword,
  user,
  loading,
  error,
] = useSignInWithEmailAndPassword(auth);
const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);
const handleGoogleSignIn =()=>{
    signInWithGoogle();

  }
 
    if(user || googleUser){
        navigate('/')
      console.log(user)
      console.log(googleUser)
    }

      if(error)
      console.log(error.message)

      if(loading)
      console.log('Loading......')

    const handleSubmit =(e)=>{
        e.preventDefault();
        console.log(email + ' ' + password)
        signInWithEmailAndPassword(email,password)

    }

  return (
    <div className='login-container'>
        <div className="image-container">
            <img src={twitterImage} className='image' />
        </div>
        <div className="form-container">
            <div className='form-box'>
            <h2 className='heading'>Happening now</h2>
            <h3 className='heading1'>What happening today!</h3>
            <form onSubmit={handleSubmit} >
                <input 
                type="email"
                className='email'
                placeholder='Email-address'
                onChange={e=> setEmail(e.target.value)} />
                <input 
                type="password"
                className='password'
                placeholder='Password'
                onChange={e=> setPassword(e.target.value)} />
                <div className='btn-login'>
                    <button type='submit' className='btn'>Login</button>
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
            Don't have an account?
            <Link
            to='/signup'
            style={{
                textDecoration:'none',
                fontWeight:'600',
                marginLeft:'5px',
                color:'skyBlue'
            }}>
            Signup
            </Link>
        </div>
            </div>

    </div>
  )
}

export default Login
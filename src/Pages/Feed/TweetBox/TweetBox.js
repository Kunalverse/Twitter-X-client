import { Avatar,Button } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import React, { useState } from 'react'
import './TweetBox.css'
import axios from 'axios';
import useLoggedInUser from '../../../hooks/useLoggedInUser';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';

function TweetBox() {
    const [post, setPost] = useState('');
    const [imageURL, setImageURL]=useState('');
    const [isLoading,setIsLoading] =useState(false)
    const [name,setName] = useState();
    const [username,setUsername] = useState();
    const [loggedInUser] = useLoggedInUser()
    const [user] = useAuthState(auth);
    const email = user?.email;

    const userProfilePic = loggedInUser[0]?.profileImage ? loggedInUser[0]?.profileImage: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909__480.png';

    const handleImage =(e) =>{
        setIsLoading(true)
        const image = e.target.files[0];

        const formData =new FormData();
        formData.set('image',image)

        axios.post('https://api.imgbb.com/1/upload?key=4d816fdf8b59b8498798b571112349f7',formData)
        .then(res =>{
            setImageURL(res.data.data.display_url)
            setIsLoading(false);
        })
        .catch((error)=>{
            console.log(error);
            setIsLoading(false);
        })
    }

    const handleTweet =(e)=>{
        e.preventDefault();
        if(user.providerData[0].providerId === 'password'){
            fetch(`https://twitter-x-server-kunal.onrender.com/loggedInUser?email=${email}`)
            .then(res=> res.json())
            .then(data =>{
                setName(data[0]?.name)
                setUsername(data[0]?.username)
            })
        }
        else{
            setName(user?.displayName)
            setUsername(email?.split('@')[0])
        }
        

       if(name)
       { const userPost={
            profileImage : userProfilePic,
            post:post,
            photo:imageURL,
            name:name,
            username:username,
            email:email
        }
        
        setPost('');
        setImageURL('');

        fetch('https://twitter-x-server-kunal.onrender.com/post',{
            method: "POST",
            headers:{
                'content-type': 'application/json'
            },
            body:JSON.stringify(userPost)
        })
        .then(res => res.body)
        .then(data =>{
            console.log(data);
        })}
    }
  return (
    <div className='tweetBox'>
        <form onSubmit={handleTweet}>
            <div className="tweetBox__input">
                <Avatar src={userProfilePic}/>
                <input 
                type="text"
                placeholder="What's happening?"
                onChange={(e)=> setPost(e.target.value)}
                value={post}
                required
                 />
            </div>
            <div className="imageIcon_tweetButton">
                <label htmlFor="image" className="imageIcon">
                    {isLoading ? <p>Uploading Image</p> : <p>{imageURL ? 'image uploaded' : <AddPhotoAlternateIcon/>}</p>}
                </label>
                <input 
                type="file"
                 id='image'
                  className="imageInput"
                  onChange={handleImage}
                 />
                <Button className="tweetBox__tweetButton" type="submit">Tweet</Button>
            </div>
        </form>
    </div>
  )
}

export default TweetBox
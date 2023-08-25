import React, {useState,useEffect}from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import useLoggedInUser from '../../../hooks/useLoggedInUser'
import CenterFocusWeakIcon from '@mui/icons-material/CenterFocusWeak';
import { useNavigate } from 'react-router-dom';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import AddLinkIcon from '@mui/icons-material/AddLink';
import LockResetIcon from '@mui/icons-material/LockReset';
import Post from "../../Feed/Post/Post"
import EditProfile from '../EditProfile/EditProfile'
import './MainPage.css'
import axios from 'axios'

function MainPage({user}) {
    const navigate = useNavigate();
    const [posts,setPosts] = useState([]);
    const [loggedInUser] = useLoggedInUser();
    const [isLoading,setIsLoading] =useState(false)
    const [imageURL, setImageURL]=useState('');

    useEffect(()=>{
      fetch(`https://twitter-x-server-kunal.onrender.com/userPost?email=${user?.email}`)
      .then(res => res.json())
      .then(data =>{
        setPosts(data)
      })
    },[posts])

    const username = user?.email?.split('@')[0];

    const handleUpdateCoverImage =(e)=>{
        setIsLoading(true)
        const image = e.target.files[0];

        const formData =new FormData();
        formData.set('image',image)

        axios.post('https://api.imgbb.com/1/upload?key=4d816fdf8b59b8498798b571112349f7',formData)
        .then(res =>{
            const url = res.data.data.display_url;
            const userCoverImage ={
                email : user?.email,
                coverImage : url
            }
            setIsLoading(false);
            if(url){
                axios.patch(`https://twitter-x-server-kunal.onrender.com/userUpdates/${user?.email}`,userCoverImage)
            }
        })

    }
    const handleUpdateProfileImage =(e)=>{
        setIsLoading(true)
        const image = e.target.files[0];

        const formData =new FormData();
        formData.set('image',image)

        axios.post('https://api.imgbb.com/1/upload?key=4d816fdf8b59b8498798b571112349f7',formData)
        .then(res =>{
            const url = res.data.data.display_url;
            const userProfileImage ={
                email : user?.email,
                profileImage : url
            }
            setIsLoading(false);
            if(url){
                axios.patch(`https://twitter-x-server-kunal.onrender.com/userUpdates/${user?.email}`,userProfileImage)
            }
        })

    }
  return (
    <div>
        <ArrowBackIcon className="arrow-icon" onClick={()=>navigate('/')}/>
        <h4 className='heading-4'>
            @{username}
        </h4>
        <div className="mainProfile">
            <div className="profile-bio">
                {
                    <div>
                        <div className="coverImageContainer">
                            <img src={loggedInUser[0]?.coverImage ? loggedInUser[0]?.coverImage : 'https://cdn4.iconfinder.com/data/icons/photos-images-solid-style/24/camera-512.png'} alt="" className='coverImage' />
                            <div className="hoverCoverImage">
                                <div className="imageIcon_tweetButton">
                                    <label htmlFor="image" className='imageIcon'>
                                        {
                                            isLoading ?
                                            <LockResetIcon className="photoIcon photoIconDisabled"/> 
                                            :
                                            <CenterFocusWeakIcon className="photoIcon"/>
                                        }
                                    </label>
                                    <input type="file" id="image" className='imageInput' onChange={handleUpdateCoverImage} />
                                </div>
                            </div>
                        </div>
                        <div className="avatar-image">
                            <div className="avatarContainer">
                            <img src={loggedInUser[0]?.profileImage ? loggedInUser[0]?.profileImage : 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909__480.png'} alt="" className='avatar' />
                            
                            <div className="hoverAvatarImage">
                                <div className="imageIcon_tweetButton">
                                <label htmlFor="profileImage" className='imageIcon'>
                                        {
                                            isLoading ?
                                            <LockResetIcon className="photoIcon photoIconDisabled"/> 
                                            :
                                            <CenterFocusWeakIcon className="photoIcon"/>
                                        }
                                    </label>
                                    <input type="file" id="profileImage" className='imageInput' onChange={handleUpdateProfileImage} />
                                </div>
                            </div>
                            </div>
                            <div className="userInfo">
                                <div>
                                    <h3 className="heading-3">
                                        {loggedInUser[0]?.name ? loggedInUser[0]?.name : user && user?.displayName }
                                    </h3>
                                    <p className='usernameSection'>@{username}</p>
                                </div>
                                <EditProfile user={user} loggedInUser={loggedInUser}/>
                                </div>    
                                <div className="infoContainer">
                                {loggedInUser[0]?.bio ? loggedInUser[0]?.bio : '' }
                                <div className="locationAndLink">
                                    {loggedInUser[0]?.location ?<p className='subInfo'><MyLocationIcon/>{ loggedInUser[0]?.location}</p> : '' }
                                    {loggedInUser[0]?.website ?<p className='subInfo Link'><AddLinkIcon/>{ loggedInUser[0]?.website}</p> : '' }
                                </div>
                                </div>
                                <h4 className="tweetsText">Tweets</h4>
                                <hr/>
                            </div>    
                            {
                                posts.map(p => <Post key={p._id} p={p}/>)
                            }
                        
                    </div>
                }
            </div>
        </div>
    </div>
  )
}

export default MainPage
import React, {useState} from 'react'
import './Sidebar.css'
import CustomLink from './CustomLink'
import twitterImage from '../../assets/images/twitterLoginImage.PNG'
import SidebarOptions from './SidebarOptions'
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DoneIcon from '@mui/icons-material/Done';
// import ListItemIcon from '@mui/icons-material/ListItemIcon';
import { Button,Avatar, IconButton, Menu, MenuItem, ListItemIcon, Divider } from '@mui/material';
import useLoggedInUser from '../../hooks/useLoggedInUser'

function Sidebar({ handleLogout, user }) {
      const[anchorEl,setAnchorEl] =useState(null);
      const openMenu = Boolean(anchorEl)
      const [loggedInUser] = useLoggedInUser();
      const userProfilePic = loggedInUser[0]?.profileImage ? loggedInUser[0]?.profileImage: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909__480.png';

      const handleClick = e =>{
        setAnchorEl(e.currentTarget);
      }

      const handleClose =() =>{
        setAnchorEl(null);
      }

      const result = user[0]?.email?.split('@')[0];
      // console.log(loggedInUser[0]?.name)
  return (
    
        <div className='sidebar'>
            <img src={twitterImage} className='sidebar_twitterIcon' alt="Twitter"/>
            <CustomLink to='/home/feed'>
            <SidebarOptions active Icon={HomeIcon} text={'Home'}/>
            </CustomLink>
            <CustomLink to='/home/explore'>
            <SidebarOptions active Icon={SearchIcon} text={'Explore'}/>
            </CustomLink>
            <CustomLink to='/home/notifications'>
            <SidebarOptions active Icon={NotificationsIcon} text={'Notifications'}/>
            </CustomLink>
            <CustomLink to='/home/messages'>
            <SidebarOptions active Icon={MailOutlineIcon} text={'Messages'}/>
            </CustomLink>
            <CustomLink to='/home/bookmarks'>
            <SidebarOptions active Icon={BookmarkBorderIcon} text={'Bookmark'}/>
            </CustomLink>
            <CustomLink to='/home/lists'>
            <SidebarOptions active Icon={ListAltIcon} text={'Lists'}/>
            </CustomLink>
            <CustomLink to='/home/profile'>
            <SidebarOptions active Icon={PersonOutlineIcon} text={'Profile'}/>
            </CustomLink>
            <CustomLink to='/home/more'>
            <SidebarOptions active Icon={MoreHorizIcon} text={'More'}/>
            </CustomLink>

            <Button variant='outlined' className='sidebar_tweet'>
            Tweet
            </Button>

            <div className="Profile_info">
              <Avatar src={userProfilePic}/>
              <div className="user_info">
                <h4>{
                  loggedInUser[0]?.name ? loggedInUser[0]?.name : user && user?.displayName
                  }</h4>
                <h5>@{result}</h5>
              </div>
              <IconButton 
              size='small' 
              sx={{ml:2}}
              aria-controls={openMenu ? 'basic menu' : undefined}
              aria-haspopup='true'
              aria-expanded={openMenu ? 'true' : undefined}
              onClick={handleClick}
              >
                <MoreHorizIcon/>
              </IconButton>
              <Menu id='basic-menu' anchorEl={anchorEl} open={openMenu} onClick={handleClose} onClose={handleClick}>
               <MenuItem className="Profile_info1">
               <Avatar src={userProfilePic}/> 
              <div className="user_info subUser_info">
                <div>
                <h4>{
                  loggedInUser[0]?.name ? loggedInUser[0]?.name : user && user?.displayName
                  }</h4>
                <h5>@{result}</h5>
                </div>
                <ListItemIcon className='done_icon'><DoneIcon/></ListItemIcon>
              </div>
            

               </MenuItem>
               <Divider/>
               <MenuItem onClick={handleClose}>Add an existing Account</MenuItem>
               <MenuItem onClick={handleLogout}>Logout @{result}</MenuItem>
              </Menu>

           
            </div>
        </div>
    
  )
}

export default Sidebar
import React from 'react'
import {TwitterTimelineEmbed, TwitterTweetEmbed} from 'react-twitter-embed'
import SearchIcon from '@mui/icons-material/Search';
import './Widgets.css'

function Widgets() {
  return (
    <div className="widgets">
      <div className="widgets_input">
        <SearchIcon className="widgets_searchIcon"/>
        <input type="text" placeholder='Search Twitter' />
      </div>
      <div className="wigets_wedgetContainer">
        <h2>What's happening</h2>
      </div>
      <TwitterTweetEmbed
        tweetId={'1557187138352861186'}
      />
      <TwitterTimelineEmbed
      sourceType="profile"
      screenName='elonmusk'
      options={{height:400}}
      />
    </div>
  )
}

export default Widgets
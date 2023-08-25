import React from 'react'
import twitterImage from '../assets/images/twitterLoginImage.PNG'

function PageLoading() {
  return (
    <div style={{display:'flex',minHeight:'100vh',justifyContent:'center',alignItems:'center'}}>
        <img src={twitterImage} width={100}/>
    </div>
  )
}

export default PageLoading
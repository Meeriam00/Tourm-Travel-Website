import React from 'react'
import '../../components/Preloader/Preloader.scss'
import { dotPulse } from 'ldrs'

const Preloader = () => {
    dotPulse.register()
    
  return (
    <div className="preloader-container">
      <l-dot-pulse
        size="80"
        speed="1.3" 
        color="#1a86a1" 
        className="preloader-animation" 
      ></l-dot-pulse>
    </div>
  )
}

export default Preloader

import React from 'react'
import './maintain.scss'
import MaintainPicture from '../../../src/assets/image/Maintain.png'
const Maintain = () => {
  return (
    <div className="maintain-wrapper">
      <div className="bg-fade-layer1"></div>
      <div className="bg-fade-layer2"></div>
      <div className="bg-fade-layer3"></div>
      <div className="bg-head"></div>
      <div className="maintain-tab">
        <img alt="#" src={MaintainPicture}></img>
        <span>SERVER IS IN MAINTENANCE</span>
      </div>
    </div>
  )
}
export default Maintain

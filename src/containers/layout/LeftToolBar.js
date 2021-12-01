import React from 'react'
import './lefttool.scss'
import {
  faTwitter,
  faYoutube,
  faMedium,
  faTelegram,
  faDiscord,
} from '@fortawesome/free-brands-svg-icons'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const LeftToolBar = (props) => {
  return (
    <div className="contact-us-wrapper">
      <div className="nav-contact-network">
        <div className="icons-fa-bg">
          <Link
            to={{
              pathname: 'https://twitter.com/KabyArena',
            }}
            target="_blank"
            className="contact-icon-link"
          >
            <div className="icon-area">
              <FontAwesomeIcon icon={faTwitter} className="contact-icon" />
            </div>
          </Link>
        </div>
        <div className="icons-fa-bg">
          <Link
            to={{
              pathname: 'https://www.youtube.com/channel/UCa3Hb97pWO25UUL1UvVo-sA',
            }}
            target="_blank"
            className="contact-icon-link"
          >
            <div className="icon-area">
              <FontAwesomeIcon icon={faYoutube} className=" contact-icon" />
            </div>
          </Link>
        </div>
        <div className="icons-fa-bg">
          <Link
            to={{
              pathname: 'https://medium.com/@kabyarena',
            }}
            target="_blank"
            className="contact-icon-link"
          >
            <div className="icon-area">
              <FontAwesomeIcon icon={faMedium} className=" contact-icon ml-0" />
            </div>
          </Link>
        </div>
        <div className="icons-fa-bg">
          <Link
            to={{
              pathname: 'https://t.me/KabyArena',
            }}
            target="_blank"
            className="contact-icon-link"
          >
            <div className="icon-area">
              <FontAwesomeIcon icon={faTelegram} className=" contact-icon ml-0" />
            </div>
          </Link>
        </div>
        <div className="icons-fa-bg">
          <Link
            to={{
              pathname: 'https://discord.com/invite/Rc9aWrPJGY',
            }}
            target="_blank"
            className="contact-icon-link"
          >
            <div className="icon-area">
              <FontAwesomeIcon icon={faDiscord} className=" contact-icon ml-0" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default LeftToolBar

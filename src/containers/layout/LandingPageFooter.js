import React from 'react'
import './new_footer.scss'
import logo from 'images/logo.png'
import ggPlay from 'images/image 8.png'
import appStore from 'images/image 9.png'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTwitter,
  faYoutube,
  faMedium,
  faTelegram,
  faDiscord,
} from '@fortawesome/free-brands-svg-icons'
import bird from 'images/new_birdSub.png'
import { ReactComponent as UnderlineIcon } from 'images/yellowUdl.svg'

const Footer = (props) => {
  return (
    <div className="footer">
      <div className="subscribe">
        <div className="subscribe-bg">
          <div className="container">
            <div className="head">
              <h2 className="title">SUBSCRIBE</h2>
              <div className="underline">
                <UnderlineIcon />
              </div>
            </div>
            <div className="tele">
              <div className="tele-content">
                <a
                  href="https://t.me/KabyArena_ann"
                  target="_blank"
                  className="tele-link"
                  rel="noreferrer"
                >
                  <div className="tele-button-area">
                    <FontAwesomeIcon icon={faTelegram} className="tele-icon" />
                    <p>Join us on Telegram</p>
                  </div>
                </a>
              </div>
            </div>
            <div className="sub-bird">
              <img src={bird} alt="bird-attack" className="bird" />
            </div>
          </div>
        </div>
      </div>
      <div className="bottom">
        <div className="left">
          <img src={logo} alt="logo" className="logo" />
          <div className="cpn-social-new">
            <div className="icon-bg-new">
              <Link
                to={{
                  pathname: 'https://twitter.com/KabyArena',
                }}
                target="_blank"
                className="social-icon-link"
              >
                <div className="icon-area-new">
                  <FontAwesomeIcon icon={faTwitter} className="social-icon-items-footer" />
                </div>
              </Link>
            </div>
            <div className="icon-bg-new">
              <Link
                to={{
                  pathname: 'https://www.youtube.com/channel/UCa3Hb97pWO25UUL1UvVo-sA',
                }}
                target="_blank"
                className="social-icon-link"
              >
                <div className="icon-area-new">
                  <FontAwesomeIcon icon={faYoutube} className="social-icon-items-footer youtube" />
                </div>
              </Link>
            </div>
            <div className="icon-bg-new">
              <Link
                to={{
                  pathname: 'https://medium.com/@kabyarena',
                }}
                target="_blank"
                className="social-icon-link"
              >
                <div className="icon-area-new">
                  <FontAwesomeIcon icon={faMedium} className="social-icon-items-footer medium" />
                </div>
              </Link>
            </div>
            <div className="icon-bg-new">
              <Link
                to={{
                  pathname: 'https://t.me/KabyArena',
                }}
                target="_blank"
                className="social-icon-link"
              >
                <div className="icon-area-new">
                  <FontAwesomeIcon icon={faTelegram} className="social-icon-items-footer" />
                </div>
              </Link>
            </div>
            <div className="icon-bg-new">
              <Link
                to={{
                  pathname: 'https://discord.com/invite/Rc9aWrPJGY',
                }}
                target="_blank"
                className="social-icon-link"
              >
                <div className="icon-area-new">
                  <FontAwesomeIcon icon={faDiscord} className="social-icon-items-footer discord" />
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className="right">
          <div className="right-social">
            <img src={ggPlay} alt="logo" className="logo" />
            <img src={appStore} alt="logo" className="logo" />
          </div>

          <div className="cpr">Copyright © 2021, Kaby Arena. All Rights Reserved.</div>
        </div>
      </div>
    </div>
  )
}

export default Footer

import React from 'react'
import './Footer.scss'
import twitter from 'images/contactus/twitter.png'
import telegram from 'images/contactus/telegram.png'
import medium from 'images/contactus/medium.png'
import KabyLogo from 'assets/css/Kaby-Logo.png'
import { useLocation } from 'react-router'
import { RoutePrePlay } from 'constant/routerType'

const Footer = (props) => {
  const { pathname } = useLocation()
  const summonTime = !!RoutePrePlay.find((x) => pathname.includes(x))
  //console.log(summonTime);
  return (
    <div //className="market-page-footer"
      className={!summonTime ? 'market-page-footer' : 'market-page-footer-summon'}
    >
      {!summonTime && (
        <div className="market-page-footer-left">
          <a href="/">
            <img alt="kaby" src={KabyLogo}></img>
          </a>
        </div>
      )}
      <div className="market-page-footer-center">
        <a href="https://twitter.com/KabyArena" target="_blank" rel="noreferrer">
          <img width="44" height="44" src={twitter} alt="twitter" />
        </a>

        <a href="https://t.me/KabyArena" target="_blank" rel="noreferrer">
          <img width="44" height="44" src={telegram} alt="telegram" />
        </a>
        <a href="https://medium.com/@kabyarena" target="_blank" rel="noreferrer">
          <img width="44" height="44" src={medium} alt="medium" />
        </a>
      </div>
      {!summonTime && (
        <div className="copyright-text">
          <p>Copyright © 2021, Kaby Arena. All Rights Reserved.</p>
        </div>
      )}
    </div>
  )
}

export default Footer

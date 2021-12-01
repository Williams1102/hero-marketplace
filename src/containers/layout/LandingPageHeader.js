import React, { useEffect, useState } from 'react'
import { Nav, Navbar, Row, Col, Button, Modal } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { HOME_PATH, TOKENICON_PATH, MARKET_PATH, GAME_PATH, ROADMAP_PATH } from 'configs/route_path'
import logo from './logo.png'
import playButton from 'images/playButton.svg'
import './menuheader.scss'
import Aos from 'aos'
import 'aos/dist/aos.css'

const Header = ({ location }) => {
  const [toggleMenu, setToggleMenu] = useState(true)
  const [embed, setEmbed] = useState(false)
  const [redNote, setRedNote] = useState(false)
  const handleCloseModal = () => {
    setEmbed(false)
  }
  const handleNav = () => {
    setToggleMenu(!toggleMenu)
  }

  const closeNoti = () => {
    setRedNote(false)
  }

  Aos.init()
  useEffect(() => {
    setRedNote(location?.pathname === '/')
  }, [location])

  return (
    <div className="header">
      <div className="menu-area fade-in-down">
        <Navbar className="menu-header">
          <div className={redNote ? 'notification' : 'notification-off'}>
            <div>
              Official <span className="kb-noti">KABY</span> contract address:
            </div>
            <div>
              <div>
                Polygon:
                <a
                  href="https://polygonscan.com/token/0x5198E7cC1640049dE37D1Bd10b03Fa5A3AFDA120"
                  target="_blank"
                  rel="noreferrer"
                  className="official-address"
                >
                  0x5198E7cC1640049dE37D1Bd10b03Fa5A3AFDA120
                </a>
              </div>
              <div>
                BSC:
                <a
                  href="https://bscscan.com/token/0x02a40c048ee2607b5f5606e445cfc3633fb20b58"
                  target="_blank"
                  rel="noreferrer"
                  className="official-address"
                >
                  0x02a40c048ee2607b5f5606e445cfc3633fb20b58
                </a>
              </div>
            </div>
            <span className="icon-hide" onClick={closeNoti}>
              <svg width="24px" height="24px" fill="#FFF" className="hide-icon">
                <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"></path>{' '}
              </svg>
            </span>
          </div>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className={toggleMenu ? 'nav-mobile' : ''}>
            <div className="nav-bg">
              <Nav className="navbar-header">
                <Row>
                  <Col lg={5} className="section1-menu">
                    <NavLink exact className="link1" to={HOME_PATH} activeClassName="active-link">
                      HOME
                    </NavLink>
                    <NavLink exact className="link1" to={GAME_PATH} activeClassName="active-link">
                      GAMEPLAY
                    </NavLink>
                    <NavLink
                      exact
                      className="link1"
                      to={TOKENICON_PATH}
                      activeClassName="active-link"
                    >
                      TOKENS
                    </NavLink>
                  </Col>
                  <Col lg={2} className="section2-menu">
                    <img src={logo} className="logo-img" alt="logo" />
                  </Col>
                  <Col lg={5} className="section3-menu">
                    <NavLink
                      exact
                      className="link3"
                      to={ROADMAP_PATH}
                      activeClassName="active-link"
                    >
                      ROADMAP
                    </NavLink>
                    {/* <NavLink className="link3" to={SUMON_PATH} activeClassName="active-link" exact>
                      SUMMON
                    </NavLink> */}
                    <NavLink
                      exact
                      className="link3 whitepp"
                      activeClassName="active-link"
                      target="_blank"
                      to={{
                        pathname: 'https://docs.kabyarena.com/whitepaper/',
                      }}
                    >
                      WHITE PAPER
                    </NavLink>
                  </Col>
                </Row>
              </Nav>
            </div>
          </Navbar.Collapse>
        </Navbar>
        <Modal centered show={embed} onHide={handleCloseModal} className="vid">
          {/* <Modal.Header closeButton></Modal.Header> */}
          <Modal.Body className="vid-body">
            <div className="vidtrailer-area">
              <iframe
                src="https://www.youtube.com/embed/Hh5jmxnSf3Y"
                height="500"
                width="900"
                title="Iframe Example"
                className="vidtrailer-area-vid"
              />
            </div>
          </Modal.Body>
        </Modal>
        <div className={redNote ? 'mobile-nav-on' : 'mobile-nav-off'}>
          <div className={toggleMenu ? 'show' : 'hide'}>
            <Button className="toggle-btn" onClick={handleNav}>
              <span className="bar-top"></span>
              <span className="bar-mid"></span>
              <span className="bar-bot"></span>
            </Button>
          </div>
        </div>

        {/* <div className={toggleMenu ? "hide" : "show"}>
          <Button className="toggle-btn" onClick={handleNavClose}>
            <span className="bar-top"></span>
            <span className="bar-mid"></span>
            <span className="bar-bot"></span>
          </Button>
        </div> */}
      </div>
      <div className={toggleMenu ? 'noti-on' : 'noti-off'}>
        <div className={redNote ? 'area-pB-noti' : 'area-pB'}>
          <Link to={MARKET_PATH}>
            <Button className="pB">
              <img src={playButton} className="icon-pB" alt="playicon" />
              <div className="text-pB">App</div>
            </Button>
          </Link>
        </div>
      </div>

      <div className="bground-theme">
        <div className="nk-banner">
          <div className="banner banner-fs banner-single tc-light"></div>
        </div>
        <div className="bground-image" data-overlay="theme" data-opacity="35"></div>
      </div>
    </div>
  )
}

export default Header

import React from 'react'
import './home.scss'
import { Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ggPlay from 'images/image 8.png'
import appStore from 'images/image 9.png'
import { ReactComponent as UnderlineIcon } from 'images/yellowUdl.svg'
import Golem from 'images/golem-dark.gif'
import phoneScreen from 'images/new_Rectangle 9.png'
import overlayPhone from 'images/new_Rectangle 18.png'
import celebrate from 'images/new_Rectangle 10.png'
import years from 'images/new_Group 9.svg'
import games from 'images/new_Group 171.svg'
import players from 'images/new_Group 172.svg'
import frontGP from 'images/new_feature01 1.png'
import backGP from 'images/new_Rectangle 16.png'
import ftp from 'images/new_ftp.svg'
import pte from 'images/new_pte.svg'
import cw from 'images/new_cw.svg'
import afr from 'images/new_afr.svg'
import kbToken from 'images/new_kabytoken.png'
import { ReactComponent as Checked } from 'images/new_checked.svg'
import dragon from 'images/unicorn-fire.gif'
import phoenixAttack from 'images/eagle-water.gif'
import { ReactComponent as ChartUp } from 'images/new_Group 10.svg'
import { ReactComponent as ChartBuy } from 'images/new_Group 11.svg'
import { ReactComponent as ChartBrain } from 'images/new_Group 12.svg'
import { images_team } from './NewHomeImage'
import { photos } from './NewHomeImage'
import { photos2 } from './NewHomeImage'
import ice from 'images/icetea_lab.png'
import dao from 'images/new_dao.png'
import Aos from 'aos'
import 'aos/dist/aos.css'

const Home = () => {
  const token_script = [
    'Exchange for gold for in-game upgrades.',
    'Speed up time-gated content.',
    'Mint NFT from in-game heroes/items.',
    'Buy / rent NFT assets.',
    'Open loot-boxes.',
    'Wage on PvP battles.',
  ]
  Aos.init()
  return (
    <div className="newhome-page">
      <div className="container slogan">
        <Row>
          <Col lg={8}>
            <div className="title-home" data-aos="fade-down">
              <div className="slo1">
                <h2>
                  <span>
                    <span className="free-to-play">FREE TO PLAY</span>
                    <br className="br1" />
                    <span className="and">AND</span>
                  </span>
                  <br className="br2" />
                  <span>PLAY</span>
                  <span className="earn"> TO EARN</span>
                </h2>
              </div>
              <div>
                <p>First game to involve crypto market fluctuations into gameplay.</p>
              </div>
              <div className="linkArea">
                <img src={ggPlay} alt="ggPlay" className="img-title" />
                <img src={appStore} alt="appStore" className="img-title" />
              </div>
            </div>
          </Col>
          <Col lg={4} className="forFun"></Col>
        </Row>
      </div>
      <div className="content-homepage">
        <div className="wik-bg">
          <div className="wik-area">
            <div className="wik">
              <h2 className="title">WHAT IS KABY?</h2>
              <div className="underline">
                <UnderlineIcon />
              </div>
              <div
                className="wik-content container"
                data-aos="fade-down"
                data-aos-easing="linear"
                data-aos-duration="800"
              >
                <Row className="">
                  <Col
                    lg={7}
                    className="left"
                    data-aos="fade-left"
                    data-aos-easing="linear"
                    data-aos-duration="800"
                  >
                    <img src={phoneScreen} className="screen" alt="phone" />
                    <img src={overlayPhone} className="screen-overlay" alt="phoneoverlay" />
                    <img src={Golem} className="golem" alt="golem" />

                    <img src={celebrate} className="celebrate" alt="celebrate" />
                  </Col>
                  <Col
                    lg={4}
                    className="right"
                    data-aos="fade-right"
                    data-aos-easing="linear"
                    data-aos-duration="800"
                  >
                    <div className="year">
                      <img src={years} alt="icon" />
                      <p className="text">
                        Kaby is developed by a successful gaming studio established{' '}
                        <span>since 2014.</span>
                      </p>
                    </div>
                    <div className="year">
                      <img src={games} alt="icon" />
                      <p className="text">
                        Our game studio has deployed 8 revenue-generating games.
                      </p>
                    </div>
                    <div className="year">
                      <img src={players} alt="icon" />
                      <p className="text">
                        Kaby is joining an existing game roster that already has 1M+ monthly active
                        players.
                      </p>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </div>
        <div className="gameplay container">
          <Row>
            <Col lg={6} className="leftgp">
              <div>
                <h2 className="title">GAMEPLAY</h2>
                <div className="underline">
                  <UnderlineIcon />
                </div>
                <div className="description">
                  Kaby Arena is a tactical multiplayer role playing game which combines{' '}
                  <span>Free-to-Play</span>and
                  <span>Play-to-Earn</span> to provide an open economy for every player.
                </div>
                <div
                  className="gp-pics"
                  data-aos="fade-up"
                  data-aos-easing="linear"
                  data-aos-duration="800"
                >
                  <img src={backGP} className="gpBack" alt="backgp" />
                  <img src={frontGP} className="gpFront" alt="frontgp" />
                </div>
              </div>
            </Col>
            <Col
              lg={4}
              className="rightgp"
              data-aos="fade-right"
              data-aos-easing="linear"
              data-aos-duration="800"
            >
              <div className="right-title">
                <img src={ftp} className="iconGP" alt="icon" />
                <h2>Free to play</h2>
              </div>
              <div className="section-des">
                Players start with basic non-NFT heroes. By playing, they can collect materials,
                armors and loot-boxes. Free heroes & armors can be minted into NFT using Kaby Token.
              </div>
              <div className="right-title">
                <img src={pte} className="iconGP" alt="icon" />
                <h2>Play-to-earn</h2>
              </div>
              <div className="section-des">
                Gaming is not only for fun, it can earn you money: Play-to-earn with dynamic farming
                system and active market, every heroes/items can be minted into NFT.
              </div>
              <div className="right-title">
                <img src={cw} className="iconGP" alt="icon" />
                <h2>Crypto War</h2>
              </div>
              <div className="section-des">
                Gameplay involves the crypto market - predict the market fluctuations correctly to
                earn in-game advantages.
              </div>
              <div className="right-title">
                <img src={afr} className="iconGP" alt="icon" />
                <h2>Assets for rent</h2>
              </div>
              <div className="section-des">
                Solve blockchain & NFT games problem: enable users to put their assets for rent with
                high credibility.
              </div>
              <Link target="_blank" to="/gameplay">
                <Button className="read-btn">Read More</Button>
              </Link>
            </Col>
          </Row>
        </div>
        <div
          className="kb-token container"
          data-aos="fade-up"
          data-aos-easing="linear"
          data-aos-duration="1000"
        >
          <Row>
            <Col lg={4} className="kb-token-left">
              <div className="kb-token-left-area">
                <h2 className="title">KABY TOKEN</h2>
                <div className="underline">
                  <UnderlineIcon />
                </div>
                <div className="slogan-kb">
                  The universal currency <span>is Kaby Token.</span>
                </div>
                <div className="description">
                  {token_script.map((content, index) => (
                    <div key={`token-${index}`} className="description-content">
                      <Checked className="check-icon" />
                      {content}
                    </div>
                  ))}
                </div>
                <Link target="_blank" to="/token">
                  <Button className="read-btn">Read More</Button>
                </Link>
              </div>
            </Col>
            <Col lg={7} className="kb-token-right">
              <img src={kbToken} alt="kabytoken" className="kb-token-img" />
            </Col>
          </Row>
        </div>
        <div className="crypto-war">
          <div className="cw-content container">
            <h2 className="title">Crypto War</h2>
            <h2 className="title">Wise trader legendary player</h2>
            <div className="underline">
              <UnderlineIcon />
            </div>
            <div className="cw-content-des">
              Increase players’ engagement with the cryptocurrency market with Crypto war mechanics
              - you start playing a game for fun, in the end,{' '}
              <span>you become a crypto market guru!.</span>
            </div>
            <img src={dragon} alt="yellowwolf" className="wolf" />
            <img src={phoenixAttack} alt="phoenix" className="phoenix" />
            <div
              className="cw-content-chart"
              data-aos="fade-up"
              data-aos-easing="linear"
              data-aos-duration="800"
            >
              <div className="chart-bg">
                <Row>
                  <Col lg={4} className="p-0 chart-one">
                    <ChartUp className="icon-chart" />
                    <div className="chart-desc">
                      A leverage for F2P player to accelerate faster in game.
                    </div>
                  </Col>
                  <Col lg={4} className="p-0 chart-one">
                    <ChartBuy className="icon-chart second" />
                    <div className="chart-desc">
                      Reward players for engagement with the cryptocurrency market.
                    </div>
                  </Col>
                  <Col lg={4} className="p-0">
                    <ChartBrain className="icon-chart third" />
                    <div className="chart-desc">
                      Educate & raising awareness for players unfamiliar with cryptocurrency.
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </div>
        <div className="team">
          <h2 className="title">Team</h2>
          <div className="underline">
            <UnderlineIcon />
          </div>
          <div className="team-photo">
            <Row
              className="team-row"
              data-aos="fade-down"
              data-aos-easing="linear"
              data-aos-duration="1300"
            >
              <Col className="team-row1" lg={6}>
                {photos.map((item, i) => (
                  <div key={`photo-${i}`} className="team-row-div">
                    <div>
                      <img src={item.photo} alt="team1" className="team-row-div-photo" />
                    </div>
                    <div className="team-row-div-namebg">
                      <div className="team-row-div-name">{item.name}</div>
                    </div>
                    <div className="team-row-div-pos">{item.pos}</div>
                    <div className="team-row-div-more">{item.more}</div>
                  </div>
                ))}
              </Col>
              <Col className="team-row2" lg={6}>
                {photos2.map((item, i) => (
                  <div key={`p-${i}`} className="team-row-div">
                    <div>
                      <img src={item.photo} alt="team2" className="team-row-div-photo" />
                    </div>
                    <div className="team-row-div-namebg">
                      <div className="team-row-div-name">{item.name}</div>
                    </div>
                    <div className="team-row-div-pos">{item.pos}</div>
                    <div className="team-row-div-more">{item.more}</div>
                  </div>
                ))}
              </Col>
            </Row>
          </div>
          <div
            className="backed-by container"
            data-aos="fade-up"
            data-aos-easing="linear"
            data-aos-duration="1300"
          >
            <div className="head-section">
              <h2 className="title-bb">BACKED BY</h2>
              <div className="underline-bb">
                <UnderlineIcon />
              </div>
            </div>
            <div className="team-orgs">
              <div className="orgs-bg">
                {images_team.map((item, i) => (
                  <div key={`im-${i}`}>
                    <img src={item.src} alt="orgs" className="orgs" />
                  </div>
                ))}
              </div>
              <div className="orgs-bg">
                <div>
                  <img src={ice} alt="orgs" className="ice" />
                </div>
                <div>
                  <img src={dao} alt="orgs" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home

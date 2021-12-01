import React from 'react'
import './newroadmap.scss'
import './roadmap.scss'
import Top from 'images/roadmap/top_chart_RM.png'
import lv1 from 'images/roadmap/chart_lv1.png'
import lv2 from 'images/roadmap/chart_lv2.png'
import lv3 from 'images/roadmap/chart_lv3.png'
import lv4 from 'images/roadmap/chart_lv4.png'
import lv5 from 'images/roadmap/chart_lv5.png'
import lv6 from 'images/roadmap/chart_lv6.png'
import lvlast from 'images/roadmap/chart_lvlast.png'
import coinleft from 'images/roadmap/coin_bgleft.png'
import coinright from 'images/roadmap/coin_bgright.png'
import blurL from 'images/roadmap/blur_left.png'
import blurR from 'images/roadmap/blur_right.png'
import { Row, Col } from 'react-bootstrap'
import Aos from 'aos'
import 'aos/dist/aos.css'

const RoadMap = () => {
  Aos.init()
  return (
    <div className="roadmap-page">
      <div className="cpn-head">
        <h2
          className="cpn-head-title"
          data-aos="fade-down"
          data-aos-easing="linear"
          data-aos-duration="800"
        >
          <span>PRODUCT</span> ROADMAP
        </h2>
      </div>
      <div className="nk-pages">
        <div className="roadmap-headerbg"></div>
        <div className="roadmap">
          <div className="coinleft">
            <img src={coinleft} className="coinL" alt="coinL" />
            <img src={blurL} className="blurL" alt="blurL" />
          </div>
          <div className="coinright">
            <img src={coinright} className="coinR" alt="coinR" />
            <img src={blurR} className="blurR" alt="blurR" />
          </div>
          <div className="container">
            <div className="top">
              <img src={Top} alt="top-chart" className="top-chart" />
            </div>
            <div className="chart">
              <div className="chart-year">2021</div>
              <div className="chart-content">
                <div className="chart-content-lv1">
                  <div className="chart-content-lv1-left">
                    <div className="date">JULY, 2021</div>
                    <div className="des">Concept development</div>
                  </div>
                  <img src={lv1} alt="lv1" className="lv1" />
                  <div className="chart-content-lv1-right">
                    <div className="date">AUGUST, 2021</div>
                    <div className="des">Public Token Sale</div>
                  </div>
                </div>
                <div className="chart-content-lv2">
                  <div className="chart-content-lv2-left">Game & Smart contract development</div>
                  <img src={lv2} alt="lv2" className="lv2" />
                  <div className="chart-content-lv2-right">
                    <div>Kaby tokens public sale</div>
                    <div>NFT heroes sale</div>
                  </div>
                </div>
                <div className="chart-content-lv3">
                  <div className="chart-content-lv3-left">
                    <div className="date">SEPTEMBER, 2021</div>
                    <div className="des">Launch Marketplace</div>
                  </div>
                  <img src={lv3} alt="lv3" className="lv3" />
                  <div className="chart-content-lv3-right">OCTOBER, 2021</div>
                </div>
                <div className="chart-content-lv4">
                  <div className="chart-content-lv4-left">
                    Kaby tokens staking program: Staking program enable for buyers of the tokens
                    Marketplace: The marketplace open for the player to trade their NFTs
                  </div>
                  <img src={lv4} alt="lv4" className="lv4" />
                  <div className="chart-content-lv4-right">
                    <div className="des">Launch of MVP game</div>
                    <div className="more">
                      Launch of MVP on iOS and Android
                      <div>
                        NFTs owners can preview their purchase Other players can play a demo match
                      </div>
                    </div>
                  </div>
                </div>
                <div className="chart-content-lv5">
                  <div className="chart-content-lv5-left">NOVEMBER, 2021</div>
                  <img src={lv5} alt="lv5" className="lv5" />
                  <div className="chart-content-lv5-right">DECEMBER, 2021</div>
                </div>
                <div className="chart-content-lv6">
                  <div className="chart-content-lv6-left">
                    <div className="des">PvE game mode & Heroes fusion</div>
                    <div className="more">
                      Players can start trading their treasure chests and in-game resources on the
                      marketplace
                      <div>NFT minting is enabled</div>
                    </div>
                  </div>
                  <img src={lv6} alt="lv6" className="lv6" />
                  <div className="chart-content-lv6-right">
                    <div className="des">PvP game mode & Dev workshop</div>
                    <div className="more">Rank system & Match-marking algorithm go online.</div>
                    <div className="more">
                      PvP waging is enabled <br /> Workshop to receive feedback from the community
                    </div>
                  </div>
                </div>
                <div className="chart-content-lvlast">
                  <img src={lvlast} alt="lvlast" className="lvlast" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="section-roadmap">
        <div className="container">
          <div className="section-roadmap-bg"></div>
          <div className="section-roadmap-block">
            <Row className="roadmap-area">
              <Col lg={10}>
                <div className="roadmap-wrap mb-0">
                  <div className="roadmap-line"></div>
                  {/* <div className="roadmap">
                    <div className="roadmap-year">2021</div>
                  </div> */}
                  <div className="roadmap roadmap-right">
                    <div className="roadmap-step">
                      <div className="roadmap-head">
                        <span className="roadmap-time">July, 2021</span>
                        <span className="roadmap-title">Concept development</span>
                      </div>
                      <p>Game &amp; Smart contract development .</p>
                    </div>
                  </div>
                  <div className="roadmap roadmap-left">
                    <div className="roadmap-left-step">
                      <div className="roadmap-left-head">
                        <span className="roadmap-left-time">August, 2021</span>
                        <span className="roadmap-left-title">Public Token Sale</span>
                      </div>
                      <ul className="list list-dot roadmap-step-list">
                        <li>Kaby tokens public sale</li>
                        <li>NFT heroes sale</li>
                      </ul>
                    </div>
                  </div>
                  <div className="roadmap roadmap-right">
                    <div className="roadmap-step">
                      <div className="roadmap-head-none">
                        <span className="roadmap-time">September, 2021</span>
                        <span className="roadmap-title">Launch Marketplace</span>
                      </div>
                      <ul className="list list-dot roadmap-step-list">
                        <li>
                          Kaby tokens staking program: Staking program enable for buyers of the
                          tokens
                        </li>
                        <li>
                          Marketplace: The marketplace open for the player to trade their NFTs
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="roadmap roadmap-left">
                    <div className="roadmap-left-step">
                      <div className="roadmap-left-head">
                        <span className="roadmap-time">October, 2021</span>
                        <span className="roadmap-title">Launch of MVP game</span>
                      </div>
                      <ul className="list list-dot roadmap-step-list">
                        <li>Launch of MVP on iOS and Android</li>
                        <li>NFTs owners can preview their purchase</li>
                        <li>Other players can play a demo match</li>
                      </ul>
                    </div>
                  </div>
                  <div className="roadmap roadmap-right">
                    <div className="roadmap-step">
                      <div className="roadmap-head-none">
                        <span className="roadmap-time">November, 2021</span>
                        <span className="roadmap-title">PvE game mode &amp; Heroes fusion</span>
                      </div>
                      <ul className="list list-dot roadmap-step-list">
                        <li>
                          Players can start trading their treasure chests and in-game resources on
                          the marketplace
                        </li>
                        <li>NFT minting is enabled</li>
                      </ul>
                    </div>
                  </div>
                  <div className="roadmap roadmap-left">
                    <div className="roadmap-left-step">
                      <div className="roadmap-left-head">
                        <span className="roadmap-time">December, 2021</span>
                        <span className="roadmap-title">PvP game mode &amp; Dev workshop</span>
                      </div>
                      <ul className="list list-dot roadmap-step-list">
                        <li>Rank system &amp; Match-marking algorithm go online.</li>
                        <li>PvP waging is enabled</li>
                        <li>Workshop to receive feedback from the community</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RoadMap

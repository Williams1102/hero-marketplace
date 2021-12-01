import React, { useRef } from 'react'
import kbFeature from 'images/kb-feature.png'
import { Row, Col, Button } from 'react-bootstrap'
import OwlCarousel from 'react-owl-carousel'
import kbbattlep2 from 'images/kb-battle-p-2.png'
import KabyArenaBattle from 'images/kaby-arena-battle.png'
import CheckCircleGreen from 'images/check-circle-green.png'
import cardfire from 'images/fire-card.png'
import cardlight from 'images/light-card.png'
import cardwater from 'images/water-card.png'
import cardwind from 'images/wind-card.png'
import carddark from 'images/darkness-card.png'
import PlayToFree from 'images/play-to-earn.png'
import AssetsForRent from 'images/assets-for-rent.png'
import CryptoWar from 'images/crypto-war.png'
import FreeToPay from 'images/free-to-pay.png'
import './gameplay.scss'

const Home = (props) => {
  const carouselRef = useRef(null)
  const CARD = [
    cardfire,
    cardlight,
    cardwater,
    cardwind,
    cardfire,
    cardlight,
    cardwater,
    cardwind,
    carddark,
  ]

  return (
    <div className="gameplay-page">
      <div className="cpn-head">
        <h2 className="cpn-head-title">
          <span> Kaby </span> GAMEPLAY
        </h2>
      </div>

      <div className="nk-pages">
        <section className="section gameplay-bg bg-theme" id="gameplay">
          <div className="content container">
            <div className="nk-block nk-block-features-s2">
              <Row className="what-is-kaby">
                <Col lg={6} className="col-content">
                  <div
                    className="features-list mr-4 mgb-m30 animated feature-gameplay"
                    data-animate="fadeInUp"
                    data-delay="0.5"
                  >
                    <div className="feature feature-s2">
                      <div className="feature-icon">
                        <i>
                          <img src={FreeToPay} alt="play to free" />
                        </i>
                      </div>
                      <div className="feature-text">
                        <h5 className="title title-sm">Free to play</h5>
                        <p>
                          Players start with basic non-NFT heroes. By playing, they can collect
                          materials, armors and loot-boxes.
                        </p>
                        <p>Free heroes & armors can be minted into NFT using Kaby Token.</p>
                      </div>
                    </div>
                    <div className="feature feature-s2">
                      <div className="feature-icon ">
                        <i>
                          <img src={PlayToFree} alt="play to free" />
                        </i>
                      </div>
                      <div className="feature-text">
                        <h5 className="title title-sm">Play-to-earn</h5>
                        <p>
                          Gaming is not only for fun, it can earn you money: Play-to-earn with
                          dynamic farming system and active market, every heroes/items can be minted
                          into NFT.
                        </p>
                      </div>
                    </div>
                    <div className="feature feature-s2">
                      <div className="feature-icon ">
                        <i>
                          <img src={CryptoWar} alt="play to free" />
                        </i>
                      </div>
                      <div className="feature-text">
                        <h5 className="title title-sm">Crypto war</h5>
                        <p>
                          Gameplay involves the crypto market - predict the market fluctuations
                          correctly to earn in-game advantages.
                        </p>
                      </div>
                    </div>
                    <div className="feature feature-s2">
                      <div className="feature-icon ">
                        <i>
                          <img src={AssetsForRent} alt="play to free" />
                        </i>
                      </div>
                      <div className="feature-text">
                        <h5 className="title title-sm">Assets for rent</h5>
                        <p>
                          Solve blockchain & NFT games problem: enable users to put their assets for
                          rent with high credibility.
                        </p>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col lg={6}>
                  <div>
                    <div className="box-pad gfx-pic gameplay-begin section-head ">
                      <h2 className="fam-font title title-s2">GAMEPLAY</h2>
                      <div>
                        <p>
                          <strong>Kaby Arena</strong> is a tactical multiplayer role playing game
                          which combines Free-to-Play and Play-to-Earn to provide an open economy
                          for every player.
                        </p>
                        <p>
                          Collect, evolve, and trade unique NFT heroes to build the best adventure
                          team. Rise through the ranks to claim tournament rewards!
                        </p>
                      </div>
                    </div>
                    <div className="gfx py-4 mx-auto mx-lg-0">
                      <img className="gfx-pic" src={kbFeature} alt="gfx" loading="lazy" />
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </section>
        <section className="section bg-white">
          <div className="ui-mask-right-s8 ui-mask-s8"></div>
          <div className="container animated" data-animate="fadeInUp" data-delay="0.3">
            {/* <!-- Block @s --> */}
            <div className="nk-block">
              <div className="row align-items-center justify-content-between">
                <div className="col-lg-6">
                  <div className="nk-block-text animated" data-animate="fadeInUp" data-delay="0.5">
                    <div className="kaby-battle section-head text-center">
                      <h2 className="fam-font title title-s2">Kaby Battle Arena</h2>
                    </div>
                    <p>
                      Players can build an unlimited heroes and equipments and then take them to
                      battle in PvP, PvE matches.
                    </p>
                    <ul className="list list-check-pvp list-check-dot list-check-s2 pdb-r">
                      <li>
                        <i>
                          <img src={CheckCircleGreen} alt="check green" />
                        </i>
                        Each hero has 4 basic stats: HP, attack, defense, support.
                      </li>
                      <li>
                        <i>
                          <img src={CheckCircleGreen} alt="check green" />
                        </i>
                        5 types of hero: wind, fire, water, darkness, light
                      </li>
                      <li>
                        <i>
                          <img src={CheckCircleGreen} alt="check green" />
                        </i>
                        4 skills per hero
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-6 ">
                  <div className="nk-block-img pr-lg-4">
                    <img src={KabyArenaBattle} alt="app" loading="lazy" className="card-feature2" />
                  </div>
                </div>
              </div>
            </div>
            <div className="phone-battle nk-block">
              <div className="row align-items-center justify-content-between">
                <div className="col-lg-7 ">
                  <div className="nk-block-img pl-lg-4">
                    <img src={kbbattlep2} alt="app" loading="lazy" className="kb-battle-img" />
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="nk-block-text animated" data-animate="fadeInUp" data-delay="0.5">
                    <p>
                      In PvP mode, players can win Kaby Token by waging against other players or by
                      winning tournaments.
                    </p>
                    <ul className="list list-check-pvp list-check-dot list-check-s2 pdb-r">
                      <li>
                        <i>
                          <img src={CheckCircleGreen} alt="check green" />
                        </i>
                        PvE: campaign mode
                      </li>
                      <li>
                        <i>
                          <img src={CheckCircleGreen} alt="check green" />
                        </i>
                        PvP Arena
                      </li>
                      <li>
                        <i>
                          <img src={CheckCircleGreen} alt="check green" />
                        </i>
                        Tournaments
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- // --> */}
        <section className="section bg-theme list-hero-bg" id="hero-list">
          <div className="top70 ui-mask-left ui-mask-s11"></div>
          <div className="kaby-elements-area section-head text-center">
            <h2 className="fam-font list-hero-title title title-s2">Kaby Heroes</h2>
          </div>
          {/* <!-- Block @s --> */}
          <div className="nk-block">
            <div className="row">
              <OwlCarousel
                ref={carouselRef}
                className="owl-theme"
                center
                responsive={{
                  0: {
                    items: 1,
                  },
                  600: {
                    items: 3,
                  },
                  1000: {
                    items: 5,
                  },
                }}
                loop
                rewind
                dots={false}
              >
                {CARD.map((o, i) => (
                  <div key={`carousel-list-item${i}`} className="row align-items-center">
                    <Button
                      type="button"
                      onClick={() => {
                        carouselRef.current.prev(500)
                      }}
                      variant="outline-light"
                      className=" arrow-btn"
                    >
                      <i className="fas fa-angle-left"></i>
                    </Button>
                    <div className="item">
                      <div className="doc">
                        <div className="doc-photo doc-shape doc-shape-a">
                          <img src={o} alt="" loading="lazy" className="card-elements" />
                        </div>
                      </div>
                    </div>
                    <Button
                      onClick={() => {
                        carouselRef.current.next(500)
                      }}
                      type="button"
                      variant="outline-light"
                      className=" arrow-btn"
                    >
                      <i className="fas fa-angle-right"></i>
                    </Button>
                  </div>
                ))}
              </OwlCarousel>
              <div className="mobile d-flex justify-content-center align-items-center">
                <Button
                  type="button"
                  onClick={() => {
                    carouselRef.current.prev(500)
                  }}
                  variant="outline-light"
                  className=" arrow-btn"
                >
                  <i className="fas fa-angle-left"></i>
                </Button>

                <Button
                  onClick={() => {
                    carouselRef.current.next(500)
                  }}
                  type="button"
                  variant="outline-light"
                  className=" arrow-btn"
                >
                  <i className="fas fa-angle-right"></i>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="section trailer-dark-bg">
          <div className="container">
            {/* <div className="clip-area section-head text-center">
              <h2 className="fam-font list-hero-title title title-s2">Trailer</h2>
            </div> */}
            <div className="nk-block-video nk-responsive-video embed-responsive embed-responsive-16by9 round">
              <iframe
                title="video gameplay"
                className="embed-responsive-item"
                src="https://www.youtube.com/embed/Hh5jmxnSf3Y"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              ></iframe>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Home

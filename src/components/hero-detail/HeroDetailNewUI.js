import React, { useEffect, useState } from 'react'
import Moment from 'react-moment'
import './herodetailnew.scss'
import Attack from 'assets/image/attack-item.png'
import Defense from 'assets/image/defense-item.png'
import Support from 'assets/image/speed-item.png'
import HP from 'assets/image/HP-item.png'
import Water from 'assets/image/water-icon.png'
import Fire from 'assets/image/fire-icon.png'
import Dark from 'assets/image/dark-icon.png'
import FireBG from 'images/herodetail/fire_tiny.png'
import WindBG from 'images/herodetail/wind_tiny.png'
import WaterBG from 'images/herodetail/water_tiny.png'
import DarkBG from 'images/herodetail/dark_tiny.png'
import LightBG from 'images/herodetail/light_tiny.png'
import Light from 'assets/image/light-icon.png'
import Wind from 'assets/image/wind-icon.png'
import HeartIcon from 'assets/css/heart-icon.png'
import AttackIcon from 'assets/css/attack-icon.png'
import ShieldIcon from 'assets/css/shield-icon.png'
import WingIcon from 'assets/css/wing-icon.png'
import BigStarIcon from 'images/herodetail/herodetail-star.png'
import GenesisDetailBG from 'images/herodetail/tiny_new_bg_genesis.png'
import ExodusDetailBG from 'images/herodetail/bg_exodus_tiny.png'
import * as marketActions from 'actions/market'
import { useDispatch } from 'react-redux'
import { useWeb3React } from '@web3-react/core'
import {
  checkPriceOfHeroOnSales,
  checkPriceOffer,
  cancelOfferedHero,
  removeHeroInListOnSale,
  takeChooseOfferedHero,
} from 'services/heroes'
import * as heroBlockchain from 'services/contracts/hero'
import { Button, Spinner } from 'react-bootstrap'
import { useHistory } from 'react-router'
import transferIcon from 'images/herodetail/th_transfericon.svg'
import listIcon from 'images/herodetail/th_listicon.svg'
import delistIcon from 'images/herodetail/th_delisticon.svg'
import mintIcon from 'images/herodetail/th_mintedicon.svg'
import saleIcon from 'images/herodetail/th_saleicon.svg'
import TableScrollbar from 'react-table-scrollbar'
import TableScrollbar1 from 'react-table-scrollbar'
import ConfirmBuyPopup from 'components/Popup/ConfirmBuyHero'
import { TRANSACTION } from 'constant/transactions'
import ListHeroPopup from 'components/Popup/ListHeroPopup'
import OfferHeroPopup from 'components/Popup/OffferPopup'
import backIcon from 'images/herodetail/backIcon.svg'
import star from 'images/herodetail/starHD.svg'
import ConnectedPopup from 'components/Popup/ConnectedPopup'
import { toast } from 'react-toastify'
import { NOTIFY } from 'constant'
import { cancelOldOffer, getHerosWithOldOffers } from 'services/contracts/hero'
import GiftPopup from 'components/Popup/GiftHeroPopup'
import UpgradeStarPopup from 'components/Popup/UpgradeStar'
const HeroDetail = (props) => {
  const [listOffer, setListOffer] = useState([])
  const [transfers, setTransfers] = useState([])
  const [skillSelect, setSkillSelect] = useState(0)
  const [rowNum, setRowNum] = useState(0)
  const [rowNumOffer, setRowNumOffer] = useState(0)
  const [loading, setLoading] = useState(null)
  const icons = {
    transfer: transferIcon,
    delist: delistIcon,
    list: listIcon,
    minted: mintIcon,
    bought: saleIcon,
  }

  const transaction_table = (
    <table>
      <thead>
        <tr>
          <th className="th1">Event</th>
          <th>Price</th>
          <th>From</th>
          <th>To</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
        {transfers.map((item, index) => (
          <tr key={`fake-${index}`}>
            <td className="td1">
              <img
                src={icons[item.event.toLowerCase()] || icons.bought}
                alt="icon"
                className="icon"
              />
              <div>{item.event}</div>
            </td>
            <td> {item.price}</td>
            <td>{`${item.from.substring(0, 4)}...${item.from.substring(item.from.length - 4)}`}</td>
            <td>{`${item.to.substring(0, 4)}...${item.to.substring(item.to.length - 4)}`}</td>
            {/* //<td>{new Date(item.timestamp).toLocaleString()}</td> */}
            <td>
              <Moment fromNow>{new Date(item.timestamp).toString()}</Moment>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )

  const background = {
    Fire: FireBG,
    Wind: WindBG,
    Light: LightBG,
    Dark: DarkBG,
    Water: WaterBG,
  }
  const type = {
    Attack: Attack,
    Defense: Defense,
    Support: Support,
    Hp: HP,
  }
  const element = {
    Fire: Fire,
    Wind: Wind,
    Light: Light,
    Dark: Dark,
    Water: Water,
  }
  const [heroDetail, setHeroDetail] = useState({
    name: '',
    image: '',
    owner: '',
    attributes: [],
  })
  const [heroDetailObj, setHeroDetailObj] = useState({
    id: '',
    Attack: '',
    Defense: '',
    Speed: '',
    Hp: '',
    Element: '',
    Type: '',
    Star: '',
  })
  const { chainId, account } = useWeb3React()
  const [heroSkill, setHeroSkill] = useState(null)
  const [price, setPrice] = useState(null)
  const [popup, setPopup] = useState(null)
  const [isOffered, setOffered] = useState(false)
  const dispatch1 = useDispatch()
  const history = useHistory()
  const [heroPrice, setHeroPrice] = useState(false)
  const [approvedForAll, setApprovedForAll] = useState(false)
  const [upStar, setUpStar] = useState(null)
  const [noData, setNoData] = useState(false)

  const offer_table = (
    <table>
      <thead>
        <tr>
          <th>From</th>
          <th>Price</th>
          <th>Time</th>
          {account === heroDetail.owner && <th>Take Offer</th>}
        </tr>
      </thead>
      <tbody className="ya">
        {listOffer.map((item, index) => (
          <tr className="tb-row" key={`offer-a-${index}`}>
            <td className="">
              {`${item.buyer.substring(0, 8)}...${item.buyer.substring(item.buyer.length - 4)}`}
            </td>
            <td>{item.price}</td>
            <td>
              {/* <td>{new Date(item.timestamp).toLocaleString()}</td> */}
              <Moment fromNow>{new Date(item.timestamp).toString()}</Moment>
            </td>
            {account === heroDetail.owner && (
              <td>
                {approvedForAll && (
                  <Button
                    onClick={() => {
                      if (!loading) return takeMyOffer(item.buyer, item.price)
                    }}
                    className="p-2 offer-btn take m-2"
                  >
                    {loading === TRANSACTION.TAKE + item.buyer ? (
                      <>
                        {' '}
                        <Spinner
                          as="div"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                          className="spinner-loading"
                        />
                        PENDING...
                      </>
                    ) : (
                      <span>Accept</span>
                    )}
                  </Button>
                )}
                {!approvedForAll && (
                  <Button
                    onClick={() => {
                      if (!loading) return approveForMarketplace()
                    }}
                    className="p-2 offer-btn take m-2"
                  >
                    {loading === TRANSACTION.TAKE ? (
                      <>
                        {' '}
                        <Spinner
                          as="div"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                          className="spinner-loading"
                        />
                        PENDING...
                      </>
                    ) : (
                      <span>Approve For Market</span>
                    )}
                  </Button>
                )}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  )

  const removeHeroOnSale = async () => {
    setLoading(TRANSACTION.DELIST)
    const removeHero = await removeHeroInListOnSale(props.id)
    setLoading(null)
    if (removeHero.success) {
      toast.success(NOTIFY.SUCCESS.DELIST)
      setPrice(0)
    } else {
      toast.error(NOTIFY.ERROR.default)
    }
  }

  const cancelMyOffer = async () => {
    setLoading(TRANSACTION.CANCEL_OFFER)
    const cancelOffer = await cancelOfferedHero(props.id)
    setLoading(null)

    if (cancelOffer.success) {
      setOffered(false)
      toast.success(NOTIFY.SUCCESS.CANCEL_OFFER)
    } else {
      toast.error(NOTIFY.ERROR.default)
    }
  }

  const [refresh, setRefresh] = useState(false)
  const [gens, setGens] = useState(0)

  const approveForMarketplace = async () => {
    setLoading(TRANSACTION.TAKE)
    const approveForMarket = await heroBlockchain.marketApproveForAll()
    setLoading(null)
    if (approveForMarket.success) setApprovedForAll(!!approveForMarket.data)
  }

  const takeMyOffer = async (buyer, price) => {
    setLoading(TRANSACTION.TAKE + buyer)
    const take = await takeChooseOfferedHero(props.id, buyer, price)
    setLoading(null)
    if (take.success) {
      setOffered(true)
      setRefresh(!refresh)
      return toast.success(NOTIFY.SUCCESS.TAKE_OFFER)
    } else return toast.error(NOTIFY.ERROR.default)
  }

  const showOffPopup = () => {
    setPopup(null)
    setRefresh(!refresh)
  }

  const handleSkillChange = (event) => {
    setSkillSelect(event.target.getAttribute('a-key'))
  }
  useEffect(() => {
    const fetchHeroDetail = () =>
      dispatch1(
        marketActions.fetchHeroDetail({
          id: props.id,
          networkId: props.networkId,
        })
      )
    const checkOffer = async () => {
      const isOffer = await checkPriceOffer(props.id, account)
      setOffered(!!Number(isOffer) || false)

      const approveForMarket = await heroBlockchain.checkIsMarketApprovedForAll()

      if (approveForMarket.success) setApprovedForAll(!!approveForMarket.data)
    }

    const fetchHeroOfferList = () =>
      dispatch1(
        marketActions.fetchHeroOfferList({
          id: props.id,
          networkId: props.networkId,
          pageSize: 20,
          pageNumber: 1,
        })
      )
    const fetchHeroTransferList = () =>
      dispatch1(
        marketActions.fetchHeroTransferList({
          id: props.id,
          networkId: props.networkId,
          pageSize: 20,
          pageNumber: 1,
        })
      )

    const getPriceHeroOnSales = async () => {
      const priceOnSale = await checkPriceOfHeroOnSales(props.id)

      setPrice(Number(priceOnSale) || 0)
    }

    const fetchDataHeroDetail = async () => {
      const offerData = await fetchHeroOfferList()
      if (offerData?.status === 'success') setListOffer(offerData.data?.data)
      if (offerData.data?.data.length <= 5) {
        setRowNumOffer(offerData.data?.data.length)
      } else {
        setRowNumOffer(5)
      }

      const listTransfer = await fetchHeroTransferList()
      if (listTransfer?.status === 'success') setTransfers(listTransfer.data?.data)
      if (listTransfer.data?.data.length <= 5) {
        setRowNum(listTransfer.data?.data.length)
      } else {
        setRowNum(5)
      }
      const result = await fetchHeroDetail()
      if (result && result.status === 'success') {
        let tmp = result.data.attributes
        setGens(tmp[tmp.length - 1].value)
        let heroDetailObj = {}
        for (let index = 0; index < tmp.length; index++) {
          heroDetailObj = {
            ...heroDetailObj,
            [tmp[index].trait_type]: tmp[index].value,
          }
        }
        setHeroDetailObj(heroDetailObj)
        setHeroDetail(result.data)
        setHeroSkill(result.data.attributes.filter((o) => o.trait_type.includes('kill')))
        setHeroPrice(result.data.price)
      } else {
        console.log('failed to fetch hero data')
        setNoData(true)
      }
    }
    fetchDataHeroDetail()

    if (!account || !chainId) return

    checkOffer()
    getPriceHeroOnSales()
  }, [chainId, account, refresh, props, dispatch1])

  //Old hero contract
  const [oldOffer, setOldOffer] = useState(false)

  const handleStarUpgrade = () => {
    heroDetailObj.Star = Number(heroDetailObj.Star) + 1
    heroDetailObj.Level = 1
    setHeroDetailObj({ ...heroDetailObj })
  }

  const checkUpgradeStar = () => {
    if (heroDetailObj.Level < heroDetailObj.Star) {
      toast.warning('Max hero’s level first')
    } else {
      setUpStar(props.id)
    }
  }

  const cancelMyOldOffer = async () => {
    setLoading(TRANSACTION.CANCEL_OFFER)
    const cancelOffer = await cancelOldOffer(props.id)
    setLoading(null)
    if (cancelOffer.success) {
      setOldOffer(false)
      toast.success(NOTIFY.SUCCESS.CANCEL_OFFER)
    } else {
      toast.error(NOTIFY.ERROR.default)
    }
  }

  useEffect(() => {
    if (!account) return
    const checkOldOffer = async () => {
      const isOffer = await getHerosWithOldOffers(props.id, account)
      if (isOffer.success) setOldOffer(!!Number(isOffer.data) || false)
    }
    checkOldOffer()
  }, [account, props.id, oldOffer])

  return (
    <>
      {account && upStar !== null && (
        <UpgradeStarPopup
          showModal={upStar !== null}
          handleCloseModal={() => {
            setUpStar(null)
          }}
          heroStar={heroDetailObj.Star}
          heroId={props.id}
          handleStarUpgrade={handleStarUpgrade}
        />
      )}
      {account ? (
        <>
          <ConfirmBuyPopup
            showModal={popup === TRANSACTION.BUY}
            handleCloseModal={showOffPopup}
            heroId={props.id}
            sellerPrice={price}
            refresh={() => setRefresh(!refresh)}
          />
          <GiftPopup
            showModal={popup === TRANSACTION.GIFT}
            handleCloseModal={() => {
              showOffPopup()
            }}
            heroId={props.id}
          />
          <ListHeroPopup
            showModal={popup === TRANSACTION.LIST}
            handleCloseModal={() => {
              showOffPopup()
            }}
            heroId={props.id}
            listed={setPrice}
          />
          <OfferHeroPopup
            showModal={popup === TRANSACTION.OFFER}
            handleCloseModal={() => {
              showOffPopup()
            }}
            heroId={props.id}
            offered={() => setOffered(true)}
          />
        </>
      ) : (
        <>
          <ConnectedPopup
            isFromHeroDetail={true}
            showModalWallet={!!popup}
            handleCloseModalWallet={showOffPopup}
          />
        </>
      )}
      <div className="head-bg"></div>
      <div className="head-bg-layer"></div>
      <div className="hero-detail-bg"></div>
      <div className="hero-detail-bg-rock"></div>
      <div className="hero-detail-container">
        <div className="hero-detail-info-container">
          <div className="hero-detail-info-left">
            <div className="hero-detail-pic-skills">
              <Button onClick={history.goBack} className="hero-detail-button-back">
                <img src={backIcon} alt="back" />
                <span className="btn-back">BACK</span>
              </Button>
              <div className="hero-detail-hero-name">
                <div className="hero-detail-hero-image-container">
                  {heroDetailObj.gens >= 0 ? (
                    <img
                      alt="kaby"
                      // className="hero-detail-hero-background"
                      style={{ position: 'unset' }}
                      src={
                        heroDetailObj.gens === 0
                          ? background[heroDetailObj.Element]
                          : heroDetailObj.gens === 1
                          ? GenesisDetailBG
                          : heroDetailObj.gens === 2
                          ? ExodusDetailBG
                          : null
                      }
                    ></img>
                  ) : null}

                  {heroDetail.image && <img alt="kaby" src={heroDetail.image}></img>}
                </div>
                <div className="hero-detail-hero-skills">
                  {heroSkill &&
                    heroSkill.map((skill, index) => (
                      <div className="hero-skill-bg" key={`hero-skill ${index}`}>
                        <div className="hero-skill">
                          <button a-key={index} onClick={handleSkillChange}></button>
                          <img
                            className="hero-skill-image"
                            alt="kaby"
                            src={skill.value.image}
                          ></img>
                        </div>
                      </div>
                    ))}
                </div>
                {heroSkill ? (
                  <div className="skill-des">
                    <div className="hero-skill-title">
                      {heroSkill && heroSkill[skillSelect]?.value?.name}
                    </div>
                    <div className="hero-skill-description">
                      {heroSkill && heroSkill[skillSelect]?.value?.description}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
            {!noData && (
              <div className="hero-detail-stat">
                <div>
                  <h2 className="hero-name">{heroDetail.name}</h2>
                  {gens !== -1 && (
                    <div className="hero-detail-number">
                      <span>#{heroDetailObj.id}</span>
                    </div>
                  )}
                </div>

                <div className="price">
                  {heroDetail.price >= 0 ? (
                    <span className="buyprice">{heroPrice} KABY</span>
                  ) : null}
                </div>
                {heroDetailObj.Element && (
                  <div className="ele-type-bg">
                    <div className="ele-type">
                      <div className="ele">
                        <div className="ele-type-title">Element</div>
                        <div className="content">
                          <img
                            style={{ width: '54px' }}
                            alt="kaby"
                            src={element[heroDetailObj.Element]}
                          ></img>

                          <span>{heroDetailObj.Element}</span>
                        </div>
                      </div>
                      <div className="type">
                        <div className="ele-type-title">Type</div>
                        <div className="content">
                          <img
                            style={{ width: '54px' }}
                            alt="kaby"
                            src={type[heroDetailObj.Type]}
                          ></img>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="hero-detail-info">
                  <div className="info-field">
                    <span className="info-field-title">Star</span>
                    <div className="info-field-content">
                      <span>
                        {[...Array(heroDetailObj.Star)].map((elementInArray, index) => (
                          <img key={`star-${index}`} src={star} alt="starlevel" />
                        ))}
                      </span>
                    </div>
                  </div>
                  <div className="info-field">
                    <span className="info-field-title">Level</span>
                    <div className="info-field-content">
                      <span>{heroDetailObj.Level}</span>
                    </div>
                  </div>
                </div>
                <div className="hero-detail-stats-info">
                  <div className="stats-info-field">
                    <span className="info-field-title">HP</span>
                    <div className="info-field-content">
                      <img alt="kaby" src={HeartIcon} className="content-icon"></img>
                      <span>{heroDetailObj.Hp || 0}</span>
                    </div>
                  </div>
                  <div className="stats-info-field">
                    <span className="info-field-title">Attack</span>
                    <div className="info-field-content">
                      <img alt="kaby" src={AttackIcon} className="content-icon"></img>
                      <span> {heroDetailObj.Attack || 0}</span>
                    </div>
                  </div>
                  <div className="stats-info-field">
                    <span className="info-field-title">Defense</span>
                    <div className="info-field-content">
                      <img alt="kaby" src={ShieldIcon} className="content-icon"></img>
                      <span>{heroDetailObj.Defense || 0}</span>
                    </div>
                  </div>
                  <div className="stats-info-field last">
                    <span className="info-field-title">Speed</span>
                    <div className="info-field-content">
                      <img alt="kaby" src={WingIcon} className="content-icon"></img>
                      <span>{heroDetailObj.Speed || 0}</span>
                    </div>
                  </div>
                </div>
                <div className="owner-btn d-flex">
                  {account !== heroDetail.owner ? (
                    (!!account && !price) || (!account && !heroPrice) ? null : (
                      <button
                        className="action-btn"
                        onClick={() => {
                          setPopup(TRANSACTION.BUY)
                        }}
                      >
                        BUY
                      </button>
                    )
                  ) : approvedForAll ? (
                    <>
                      {price === 0 ? (
                        <button
                          className="action-btn list-actual"
                          onClick={() => setPopup(TRANSACTION.LIST)}
                        >
                          LIST
                        </button>
                      ) : (
                        <>
                          <button
                            className="action-btn list"
                            onClick={!loading ? removeHeroOnSale : null}
                          >
                            {loading === TRANSACTION.DELIST ? (
                              <>
                                {' '}
                                <Spinner
                                  as="div"
                                  animation="border"
                                  size="sm"
                                  role="status"
                                  aria-hidden="true"
                                  variant="light"
                                  className="spinner-loading"
                                />
                                PENDING...
                              </>
                            ) : (
                              <span>DELIST</span>
                            )}
                          </button>
                        </>
                      )}
                    </>
                  ) : (
                    <Button
                      onClick={() => {
                        if (!loading) return approveForMarketplace()
                      }}
                      className="p-2 offer-btn approve-market list"
                    >
                      {loading === TRANSACTION.TAKE ? (
                        <>
                          {' '}
                          <Spinner
                            as="div"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                            className="spinner-loading"
                          />
                          PENDING...
                        </>
                      ) : (
                        <span>Approve For Market</span>
                      )}
                    </Button>
                  )}
                  {account === heroDetail.owner && (
                    <button
                      className="action-btn gift"
                      onClick={() => {
                        return !loading ? setPopup(TRANSACTION.GIFT) : null
                      }}
                    >
                      {loading === TRANSACTION.GIFT ? (
                        <div className="">
                          {' '}
                          <Spinner
                            as="div"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                            variant="light"
                            className="spinner-loading"
                          />
                          PENDING...
                        </div>
                      ) : (
                        <span>GIFT</span>
                      )}
                    </button>
                  )}
                  {account === heroDetail.owner && (
                    <button className="action-btn upgradestar" onClick={() => checkUpgradeStar()}>
                      <span>UPGRADE STAR</span>
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
          {!noData && (
            <div className="hero-detail-info-right">
              <span className="font-face-ac text-right">OWNER</span>
              <div className="montserrat-font-span over-flow-eclipsis ownertext text-right">
                {`${heroDetail.owner.substring(0, 8)}...${heroDetail.owner.substring(
                  heroDetail.owner.length - 4
                )}`}
              </div>
              <span className="font-face-ac text-right">GEM</span>
              <div className="gem-container">
                <div style={{ backgroundImage: `url(${BigStarIcon})` }} className="gem-image">
                  {heroDetailObj.Element && (
                    <img alt="element" src={element[heroDetailObj.Element]}></img>
                  )}
                  {/* <img alt="type" src={exDark}></img> */}
                </div>
              </div>
            </div>
          )}
        </div>
        {!noData && (
          <div>
            <div className="title-table">OFFER HISTORY</div>
            <div>
              <TableScrollbar1
                rows={account === heroDetail.owner ? rowNumOffer * 1.5 : rowNumOffer}
                className="table-scroll-offer"
              >
                {offer_table}
              </TableScrollbar1>
            </div>
          </div>
        )}

        {!noData && oldOffer && (
          <Button onClick={!loading ? cancelMyOldOffer : null} className="offer-btn cancel">
            {loading === TRANSACTION.CANCEL_OFFER ? (
              <>
                {' '}
                <Spinner
                  as="div"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  variant="danger"
                  className="spinner-loading"
                />
                CANCELING...
              </>
            ) : (
              <span>CANCEL OFFER</span>
            )}
          </Button>
        )}

        {!noData && !oldOffer && account !== heroDetail.owner && (
          <>
            <Button
              onClick={() => {
                setPopup(TRANSACTION.OFFER)
              }}
              className="offer-btn"
            >
              <span>MAKE OFFER</span>
            </Button>
          </>
        )}
        {!noData && isOffered && (
          <Button onClick={!loading ? cancelMyOffer : null} className="offer-btn cancel">
            {loading === TRANSACTION.CANCEL_OFFER ? (
              <>
                {' '}
                <Spinner
                  as="div"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  variant="danger"
                  className="spinner-loading"
                />
                CANCELING...
              </>
            ) : (
              <span>CANCEL OFFER</span>
            )}
          </Button>
        )}
        {!noData && (
          <div>
            <div className="title-table">TRANSACTION HISTORY</div>
            <TableScrollbar rows={rowNum} className="table-scroll">
              {transaction_table}
            </TableScrollbar>
          </div>
        )}
      </div>
    </>
  )
}
export default HeroDetail

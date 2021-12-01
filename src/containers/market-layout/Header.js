import React, { useEffect, useLayoutEffect, useState } from 'react'
import './Header.scss'
import KabyLogo from 'assets/css/Kaby-Logo.png'
import { useHistory, Link, NavLink } from 'react-router-dom'
import { useWeb3React } from '@web3-react/core'
import ConnectedPopup from 'components/Popup/ConnectedPopup'
import { getInfoWallet } from 'services/contracts/wallet'
import KabyCoinIcon from 'assets/image/kaby-coin.png'
// import OffChainCoinIcon from "assets/image/offchain-coin.png";
import KGTcoin from 'assets/image/KGTcoin.png'
import KGToffchaincoin from 'assets/image/KGToffchaincoin.png'
import { Button, Dropdown } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { checkSupportedNetwork } from 'constant/contract'
import { useEagerConnect, useInactiveListener } from 'utilities/hooks'
import { setWallet, walletSupported } from 'constant/connector'
import * as routePath from '../../configs/route_path'
import { toast } from 'react-toastify'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { setCurrentUser } from 'redux/user/user.actions'
import { useDispatch, useSelector } from 'react-redux'
import accountOffchainAPI from 'actions/accounts'
import { selectCurrentUser } from 'redux/user/user.selectors'
import ReactTooltip from 'react-tooltip'
import { signLoginMessage } from 'services/contracts/accounts'

const Header = (props) => {
  const history = useHistory()
  const [mobileDropDownMarket, setMobileDropDownMarket] = useState(false)
  const [mobileDropDownWallet, setMobileDropDownWallet] = useState(false)
  const [param, setParam] = useState('hero')
  const [paramWallet, setParamWallet] = useState('hero')
  const [balance, setBalance] = useState(0)
  const [kabyGameTokenBalance, setKabyGameTokenBalance] = useState(0)
  const [connected, setConnected] = useState(false)
  // const emitterRef = useRef([]);
  const handleOpen = () => {
    setConnected(true)
  }
  const { account, chainId, error, connector, deactivate } = useWeb3React()
  const [isHover, setIsHover] = useState(false)
  const [isHoverWallet, setIsHoverWallet] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const handleResize = () => {
    if (window.innerWidth < 700) setIsMobile(true)
    else setIsMobile(false)
  }
  const dispatch = useDispatch()
  const user = useSelector(selectCurrentUser)
  useEffect(() => {
    props.setIsModalOpen(connected)
  }, [connected, props])
  useEffect(() => {
    // Function effect
    const getInfo = async () => {
      let user
      try {
        user = await accountOffchainAPI
          .createOffChainAccount(
            {},
            {
              accountOnChain: account,
            }
          )
          .catch((error) => {
            return error
          })
        if (user.status === 'error') {
          const sign = await signLoginMessage()
          if (sign.error) {
            toast.error('No sign')
            return
          }
          const headers = {
            sign: sign.data?.signature,
            message: sign.data?.message,
          }
          user = await accountOffchainAPI.createOffChainAccount(headers, {
            accountOnChain: account,
          })
        }
        // dispatch(setCurrentUser(user.data))
        // localStorage.setItem('token', user.data.jwt)
      } catch (e) {
        console.log(e)
      }
    }

    // effect content
    if (!account) {
      dispatch(setCurrentUser(null))
      return
    }
    getInfo()
    // eslint-disable-next-line
  }, [account])

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const [activatingConnector, setActivatingConnector] = useState()

  useLayoutEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined)
    }
  }, [activatingConnector, connector])

  const triedEager = useEagerConnect()

  useInactiveListener(!triedEager || !!activatingConnector)
  const [showMobileMenu, setMobileMenu] = useState(false)

  const handleClose = () => {
    setConnected(false)
    setMobileMenu(false)
  }

  useEffect(() => {
    if (!account || !chainId || !connector) {
      dispatch(setCurrentUser(null))
      setBalance(0)
      setKabyGameTokenBalance(0)
      return
    }
    const isWalletConnected = connector instanceof WalletConnectConnector

    setWallet(isWalletConnected ? walletSupported.walletconnect : walletSupported.metamask)
    if (chainId) {
      const isSupported = checkSupportedNetwork(chainId)

      if (!isSupported) {
        toast.info("Network isn't supported!")
        return deactivate()
      }
      const handleBalanceWallet = async (acc) => {
        const { getTokenBalance } = await getInfoWallet()
        const { kabyBalance } = await getTokenBalance(acc)
        setBalance(Number(kabyBalance) || 0)
      }
      handleBalanceWallet(account)
      // listenChangebalance(account);
    }
    const disconnected = async () => {
      return connector.close()
    }
    if (error && isWalletConnected) {
      disconnected()
      handleClose()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId, connector, account, error, deactivate])

  useEffect(() => {
    if (!user) {
      return
    }
    const handleKabyGameBalanceWallet = async (acc) => {
      const { getKabyGameTokenBalance } = await getInfoWallet()
      const { kabyGameTokenBalance } = await getKabyGameTokenBalance(acc).catch((error) => {})
      setKabyGameTokenBalance(kabyGameTokenBalance || 0)
    }
    handleKabyGameBalanceWallet(user.address)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, chainId])

  return (
    <>
      {connected && (
        <ConnectedPopup showModalWallet={connected} handleCloseModalWallet={handleClose} />
      )}
      {!isMobile && (
        <div className="font-face-ac top-header bg-transparent">
          <div className="market-page-header ">
            {/* <div onClick={() => history.push("/")} className="market-page-header-logo">
              <img alt="kaby" src={KabyLogo}></img>
            </div> */}
            <div className="market-page-header-menu">
              <div
                className="market-page-header-menu-text-item"
                onMouseEnter={() => {
                  setIsHover(true)
                }}
                onMouseLeave={() => {
                  setIsHover(false)
                }}
              >
                <NavLink
                  onClick={() => {
                    setIsHover(false)
                  }}
                  // to={`${routePath.MARKET_PATH}`}
                  to={`${routePath.MARKET_PATH}?param=${param}`}
                  activeClassName="header-active"
                  // className="market-page-header-menu-text"
                  exact
                >
                  MARKETPLACE
                </NavLink>
                {/* <span>HEROES</span>
                <span>ITEMS</span> */}
                <div
                  onMouseEnter={() => {
                    setIsHover(true)
                  }}
                  // onMouseLeave={() => {
                  //   setIsHover(false);
                  // }}
                  className="market-page-header-menu-text-item-children"
                >
                  {isHover && (
                    <div className="market-page-header-menu-text-item-children-background"></div>
                  )}
                  {isHover && (
                    <NavLink
                      onClick={() => {
                        setIsHover(false)
                        setParam('hero')
                      }}
                      to={`${routePath.MARKET_PATH}?param=hero`}
                      // activeClassName="header-active"
                      id="hover-item"
                      // className="market-page-header-menu-text"
                      exact
                    >
                      HEROES
                    </NavLink>
                  )}
                  {isHover && (
                    <NavLink
                      onClick={() => {
                        setIsHover(false)
                        setParam('item')
                      }}
                      to={`${routePath.MARKET_PATH}?param=item`}
                      // to={routePath.MAINTAIN}
                      // activeClassName="header-active"
                      // className="market-page-header-menu-text"
                      exact
                    >
                      ITEMS
                    </NavLink>
                  )}
                </div>
              </div>
              {/* 
              <NavLink
                to={routePath.STAKE_PATH}
                activeClassName="header-active"
                className="market-page-header-menu-text"
                exact
              >
                STAKE
              </NavLink> */}
              {/* <NavLink
                to={routePath.SUMON_PATH}
                activeClassName="header-active"
                className="market-page-header-menu-text"
                exact
              >
                SUMMON
              </NavLink> */}
              {account && (
                <>
                  <div
                    className="market-page-header-menu-text-item"
                    onMouseEnter={() => {
                      setIsHoverWallet(true)
                    }}
                    onMouseLeave={() => {
                      setIsHoverWallet(false)
                    }}
                  >
                    <NavLink
                      onClick={() => {
                        setIsHoverWallet(false)
                      }}
                      to={`${routePath.WALLET_PATH}?param=${paramWallet}`}
                      // to={`${routePath.WALLET_PATH}`}
                      activeClassName="header-active"
                      // className="market-page-header-menu-text"
                      exact
                    >
                      WALLET
                    </NavLink>
                    {/* <span>HEROES</span>
                <span>ITEMS</span> */}
                    <div
                      // style={{ left: "-20px" }}
                      onMouseEnter={() => {
                        setIsHoverWallet(true)
                      }}
                      // onMouseLeave={() => {
                      //   setIsHoverWallet(false);
                      // }}
                      className="market-page-header-menu-text-item-children"
                    >
                      {isHoverWallet && (
                        <div className="market-page-header-menu-text-item-children-background"></div>
                      )}
                      {isHoverWallet && (
                        <NavLink
                          onClick={() => {
                            setIsHoverWallet(false)
                            setParamWallet('hero')
                          }}
                          to={`${routePath.WALLET_PATH}?param=hero`}
                          // activeClassName="header-active"
                          id="hover-item"
                          // className="market-page-header-menu-text"
                          exact
                        >
                          HEROES
                        </NavLink>
                      )}
                      {isHoverWallet && (
                        <NavLink
                          onClick={() => {
                            setIsHoverWallet(false)
                            setParamWallet('item')
                          }}
                          to={`${routePath.WALLET_PATH}?param=item`}
                          // to={routePath.MAINTAIN}
                          // activeClassName="header-active"
                          // className="market-page-header-menu-text"
                          exact
                        >
                          ITEMS
                        </NavLink>
                      )}
                    </div>
                  </div>
                  <></>
                </>
              )}
              {/* <NavLink
                to={routePath.TRAINING}
                activeClassName="header-active"
                className="market-page-header-menu-text"
                exact
              >
                TRAINING
              </NavLink>
              <a
                href="https://tokensfarm.com/kaby/lp/1"
                target="_blank"
                rel="noreferrer"
                className="market-page-header-menu-text"
              >
                LP FARM
              </a>
              <a
                href=" https://play.kabyarena.com/"
                target="_blank"
                rel="noreferrer"
                className="market-page-header-menu-text"
              >
                PLAY
              </a> */}
            </div>
            <div className="market-page-header-info ">
              <div className="market-page-header-info-content ">
                <span data-tip data-for="KGT-ingame">
                  {Math.round(Number(user?.amount || 0) * 10000) / 10000}{' '}
                </span>
                <img data-tip data-for="KGT-ingame" alt="#" src={KGToffchaincoin}></img>
                <ReactTooltip
                  className="tooltip"
                  currentitem="true"
                  id="KGT-ingame"
                  place="top"
                  effect="solid"
                >
                  KGT in game
                </ReactTooltip>
              </div>
            </div>
            <div className="market-page-header-info ">
              <div className="market-page-header-info-content ">
                <span data-tip data-for="KGT-inwallet">
                  {Math.round(Number(kabyGameTokenBalance || 0) * 10000) / 10000}{' '}
                </span>
                <img data-tip data-for="KGT-inwallet" alt="#" src={KGTcoin}></img>
                <ReactTooltip className="tooltip" id="KGT-inwallet" place="top" effect="solid">
                  KGT in wallet
                </ReactTooltip>
              </div>
            </div>
            <div className="market-page-header-info ">
              <div className="market-page-header-info-content mr-1">
                <span data-tip data-for="KGT-KABY">
                  {Math.round(balance * 10000) / 10000}{' '}
                </span>
                <img data-tip data-for="KGT-KABY" alt="#" src={KabyCoinIcon}></img>
                <ReactTooltip className="tooltip" id="KGT-KABY" place="top" effect="solid">
                  KABY in wallet
                </ReactTooltip>
              </div>
              {account ? (
                <>
                  <Dropdown>
                    <Dropdown.Toggle
                      style={{
                        width: 'auto',
                        minWidth: '10rem',
                        marginRight: '0px',
                      }}
                      split={false}
                      className="market-page-header-info-text-connect border-0 p-1 "
                      id="dropdown-basic"
                    >
                      {`${account.substring(0, 6)}...${account.substring(account.length - 4)}`}
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="market-page-header-info-text-connect border-0  link mt-1 ">
                      {/* <Dropdown.Item style={{ borderBottom: '1px solid white' }}>
                        <NavLink to={routePath.ACCOUNT} exact>
                          Account
                        </NavLink>
                      </Dropdown.Item> */}
                      <Dropdown.Item>
                        <div
                          onClick={() => {
                            if (connector instanceof WalletConnectConnector) connector.close()
                            localStorage.removeItem('token')
                            dispatch(setCurrentUser(null))
                            return deactivate()
                          }}
                        >
                          DISCONNECT
                        </div>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </>
              ) : (
                <div
                  onClick={() => {
                    handleOpen()
                    // console.log("is connect", connected);
                  }}
                  className="market-page-header-info-text-connect"
                >
                  CONNECT
                </div>
              )}
              {/* {account && (
                <div
                  onClick={() => {
                    if (connector instanceof WalletConnectConnector)
                      connector.close();
                    return deactivate();
                  }}
                  className="disconnect-walletconnect"
                >
                  DISCONNECT
                </div>
              )} */}
            </div>
          </div>
        </div>
      )}
      {isMobile && (
        <div className="mobile">
          <div className="menu-btn">
            <Button onClick={() => setMobileMenu(true)}>
              <FontAwesomeIcon icon={faBars} />
            </Button>
            <div className="info-container-header">
              <div className="wallet">
                <div className=" wrap balance">
                  <span data-tip data-for="KGT-ingame">
                    {Math.floor(Number(user?.amount || 0))}{' '}
                  </span>
                  <ReactTooltip
                    className="tooltip"
                    currentitem="true"
                    id="KGT-ingame"
                    place="top"
                    effect="solid"
                  >
                    KGT in game
                  </ReactTooltip>
                  <img alt="#" src={KGToffchaincoin}></img>
                </div>
                <div className=" wrap balance">
                  <span data-tip data-for="KGT-wallet">
                    {Math.floor(Number(kabyGameTokenBalance || 0))}{' '}
                  </span>
                  <ReactTooltip
                    className="tooltip"
                    currentitem="true"
                    id="KGT-wallet"
                    place="top"
                    effect="solid"
                  >
                    KGT in wallet
                  </ReactTooltip>
                  <img alt="#" src={KGTcoin}></img>
                </div>
                <div className=" wrap balance">
                  <span data-tip data-for="KGT-KABY">
                    {Math.floor(balance)}{' '}
                  </span>
                  <ReactTooltip
                    className="tooltip"
                    currentitem="true"
                    id="KGT-KABY"
                    place="top"
                    effect="solid"
                  >
                    KABY in game
                  </ReactTooltip>
                  <img alt="#" src={KabyCoinIcon}></img>
                </div>
              </div>
              {account ? (
                <>
                  <div className="wrap account">
                    {`${account.substring(0, 2)}...${account.substring(account.length - 4)}`}
                  </div>
                </>
              ) : (
                <div
                  onClick={() => {
                    handleOpen()
                    // console.log("is connect", connected);
                  }}
                  className="wrap account"
                >
                  CONNECT
                </div>
              )}
            </div>
          </div>

          {showMobileMenu && (
            <div className="nav">
              <div className="menu">
                <div onClick={() => history.push('/')} className="menu-logo">
                  <img alt="kaby" src={KabyLogo}></img>
                </div>

                <div className="d-flex flex-column align-items-center">
                  <div
                    onClick={() => {
                      setMobileDropDownMarket((prev) => !prev)
                    }}
                    to={`${routePath.MARKET_PATH}?param=${param}`}
                    // to={`${routePath.MARKET_PATH}`}
                    className="link p-2"
                  >
                    MARKETPlACE
                    <svg
                      width="9"
                      height="6"
                      viewBox="0 0 9 6"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M4.83341 5.5L9.00008 0.5H0.666748L4.83341 5.5Z" fill="white" />
                    </svg>
                  </div>
                  {mobileDropDownMarket && (
                    <Link
                      onClick={() => {
                        setMobileMenu(false)
                        setMobileDropDownMarket(false)
                        setParam('hero')
                      }}
                      to={`${routePath.MARKET_PATH}?param=hero`}
                      className="link p-2"
                    >
                      HERO
                    </Link>
                  )}
                  {mobileDropDownMarket && (
                    <Link
                      onClick={() => {
                        setMobileMenu(false)
                        setMobileDropDownMarket(false)
                        setParam('item')
                      }}
                      to={`${routePath.MARKET_PATH}?param=item`}
                      className="link p-2"
                    >
                      ITEM
                    </Link>
                  )}
                  <Link
                    onClick={() => {
                      setMobileMenu(false)
                    }}
                    to={routePath.STAKE_PATH}
                    className="link p-2"
                  >
                    STAKE
                  </Link>

                  {account && (
                    <>
                      {/* 
                      
                      <Link
                        onClick={() => {
                          setMobileMenu(false);
                        }}
                        to={routePath.WALLET_PATH}
                        className="link p-2"
                      >
                        WALLET
                      </Link>
                      <Button
                        style={{ width: "auto", minWidth: "unset" }}
                        split={false}
                        className="bg-transparent border-0 link p-0"
                        id="dropdown-basic"
                      >
                        Account
                      </Button>
                      <ListGroup>
                        <ListGroup.Item disabled>
                          Cras justo odio
                        </ListGroup.Item>
                        <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                        <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                        <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                      </ListGroup> */}
                      <>
                        {' '}
                        <div
                          onClick={() => {
                            setMobileDropDownWallet((prev) => !prev)
                          }}
                          to={routePath.WALLET_PATH}
                          className="link p-2"
                        >
                          WALLET
                          <svg
                            width="9"
                            height="6"
                            viewBox="0 0 9 6"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M4.83341 5.5L9.00008 0.5H0.666748L4.83341 5.5Z" fill="white" />
                          </svg>
                        </div>
                        {mobileDropDownWallet && (
                          <Link
                            onClick={() => {
                              setMobileMenu(false)
                              setMobileDropDownWallet(false)
                              setParamWallet('hero')
                            }}
                            to={`${routePath.WALLET_PATH}?param=hero`}
                            className="link p-2"
                          >
                            HERO
                          </Link>
                        )}
                        {mobileDropDownWallet && (
                          <Link
                            onClick={() => {
                              setMobileMenu(false)
                              setMobileDropDownWallet(false)
                              setParamWallet('item')
                            }}
                            to={`${routePath.WALLET_PATH}?param=item`}
                            className="link p-2"
                          >
                            ITEM
                          </Link>
                        )}
                        <NavLink
                          onClick={() => {
                            setMobileMenu(false)
                          }}
                          to={routePath.ACCOUNT}
                          activeClassName="header-active"
                          className="link"
                          exact
                        >
                          Account
                        </NavLink>
                      </>
                    </>
                  )}
                  {/* <Link
                    to={routePath.TRAINING}
                    onClick={() => {
                      setMobileMenu(false)
                    }}
                    className="link p-2"
                  >
                    TRAINING
                  </Link>
                  <a
                    href="https://tokensfarm.com/kaby/lp/1"
                    target="_blank"
                    rel="noreferrer"
                    className="link p-2"
                  >
                    LP FARM
                  </a>
                  <a
                    href="https://play.kabyarena.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="link p-2"
                  >
                    PLAY
                  </a> */}
                </div>
                {account && (
                  <div
                    onClick={() => {
                      if (connector instanceof WalletConnectConnector) return connector.close()
                      return deactivate()
                    }}
                    className="disconnect-walletconnect"
                  >
                    DISCONNECT
                  </div>
                )}
              </div>
              <div className="backdrop" onClick={() => setMobileMenu(false)}></div>
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default Header

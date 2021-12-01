import React, { useEffect, useState } from 'react'
import BackGround2 from '../../assets/image/background-43.jpg'
import './SummonStake.scss'
import * as heroService from 'services/heroes'
import { useWeb3React } from '@web3-react/core'
import SummonStakePopup from 'components/Popup/BuyStakingPopup'
import { toast } from 'react-toastify'
import { formatNumber, NOTIFY } from 'constant'
import { Button, Spinner, Row, Container, Col } from 'react-bootstrap'
import ClaimHeroPopup from 'components/Popup/ClaimHeroPopup'
import { TRANSACTION } from 'constant/transactions'
import coinLogo from 'images/stake-new/coin_logo.png'
import kgtLogo from 'images/stake-new/KGTcoin.png'
import selectBadge from 'images/stake-new/select-badge.png'
import { ReactComponent as Line } from 'images/item-detail/line.svg'
import embedTR from 'images/stake-new/embed-topright.png'
import StakeKabyEarnPopup from 'components/Popup/StakeKabyEarnPopup'
import { getBasicInfo, getPairInfo, getPoolInfo, FARM_TYPE } from 'services/contracts/farm'
import Web3 from 'web3'
import binanceLogo from 'images/stake-new/logoBinance.png'
import { getPricePairToken } from 'services/contracts/dex'

const SummonStakePage = (props) => {
  const { chainId, account, connector } = useWeb3React()

  const [showPopup, setShowPopup] = useState(null)
  const [reload, setReload] = useState(false)
  const [totalLock, setTotalLock] = useState(0)
  const [loadingMessage, setLoadingMessage] = useState(NOTIFY.LOGIN)
  const [loadingPoolKABY, setLoadingPoolKABY] = useState(true)
  const [loadingPoolKGT, setLoadingPoolKGT] = useState(true)

  const [basicInfoKGT, setBasicInfoKGT] = useState({})
  const [basicInfoKABY, setBasicInfoKABY] = useState({})
  const [poolInfoPopup, setPoolInfoPopup] = useState(null)
  const [poolsKGT, setPoolsKGT] = useState([])
  const [poolsKABY, setPoolsKABY] = useState([])
  const [rewardKGT, setRewardKGT] = useState({ token: '', price: 0 })
  const [rewardKABY, setRewardKABY] = useState({ token: '', price: 0 })

  const handleShowSummonPopup = () => {
    if (loadingMessage) return toast.warning(loadingMessage)
    setShowPopup(TRANSACTION.STAKE)
  }

  const handleShowClaimPopup = () => {
    if (loadingMessage) return toast.warning(loadingMessage)
    setShowPopup(TRANSACTION.CLAIM)
  }

  const handleShowKabyEarnPopup = (poolInfo) => {
    if (loadingMessage) return toast.warning(loadingMessage)
    setPoolInfoPopup(poolInfo)
    setShowPopup(TRANSACTION.KABYSTAKE)
  }

  const handleResize = () => {}

  useEffect(() => {
    setShowPopup(null)
  }, [chainId, account])

  useEffect(() => {
    if (chainId) {
      setLoadingPoolKGT(true)
      getBasicInfo(FARM_TYPE.KGT)
        .then((result) => {
          if (result.success) {
            setBasicInfoKGT(result.data)
          } else {
            setBasicInfoKGT({})
            toast.error(result.data)
          }
        })
        .catch((error) => {
          setLoadingPoolKGT(false)
        })
      setLoadingPoolKABY(true)
      getBasicInfo(FARM_TYPE.KABY)
        .then((result) => {
          if (result.success) {
            setBasicInfoKABY(result.data)
          } else {
            setBasicInfoKABY({})
            toast.error(result.data)
          }
        })
        .catch((error) => {
          setLoadingPoolKABY(false)
        })
    }
  }, [chainId])

  useEffect(() => {
    if (!basicInfoKGT) {
      setLoadingPoolKGT(false)
      setPoolsKGT([])
      return
    }
    if (basicInfoKGT.poolLength) {
      setLoadingPoolKGT(true)
      Promise.all([getRewardInfo(basicInfoKGT), getAllPool(FARM_TYPE.KGT, basicInfoKGT)])
        .then(([rewardInfo, pools]) => {
          setRewardKGT(rewardInfo)
          setPoolsKGT(pools)
        })
        .finally(() => {
          setLoadingPoolKGT(false)
        })
    } else {
      setLoadingPoolKGT(false)
    }
  }, [basicInfoKGT, account])

  useEffect(() => {
    if (!basicInfoKABY) {
      setLoadingPoolKABY(false)
      setPoolsKABY([])
      return
    }
    if (basicInfoKABY.poolLength) {
      setLoadingPoolKABY(true)
      Promise.all([getRewardInfo(basicInfoKABY), getAllPool(FARM_TYPE.KABY, basicInfoKABY)])
        .then(([rewardInfo, pools]) => {
          setRewardKABY(rewardInfo)
          setPoolsKABY(pools)
        })
        .finally(() => {
          setLoadingPoolKABY(false)
        })
    } else {
      setLoadingPoolKABY(false)
    }
  }, [basicInfoKABY, account])

  useEffect(() => {
    const checkSummonStaking = async () => {
      if (!chainId) return

      const total = await heroService.getTotalLockValueStakingSummonHero()

      if (total.success) {
        setTotalLock(total.data)
      }
    }
    if (!account) return setLoadingMessage(NOTIFY.WARNING.LOGIN)
    checkSummonStaking()
    setLoadingMessage(null)
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [chainId, account, connector])

  const updatePoolInfo = (newPoolInfo) => {
    const { type } = newPoolInfo
    const pools = type === FARM_TYPE.KGT ? poolsKGT : poolsKABY
    const setPools = type === FARM_TYPE.KGT ? setPoolsKGT : setPoolsKABY
    pools[newPoolInfo.index] = newPoolInfo
    setPools([...pools])
  }

  const poolName = (poolInfo) => {
    let name = ''
    let type = ''
    if (poolInfo?.pair?.token0 && poolInfo?.pair?.token1) {
      name = `${poolInfo?.pair?.token0?.symbol}-${poolInfo?.pair?.token1?.symbol}`
      type = 'LP'
    } else {
      name = poolInfo?.pair?.symbol
    }
    return {
      name,
      type,
    }
  }

  const getAllPool = async (type, basicInfo) => {
    let promises = []
    for (let i = 0; i < basicInfo.poolLength; i++) {
      promises.push(
        getPoolInfo(i, type).then((result) => {
          if (result.success) {
            return { ...result.data, type }
          } else {
            return null
          }
        })
      )
    }
    const pools = (await Promise.all(promises)).filter((pool) => pool !== null)

    promises = []
    for (let i = 0; i < pools.length; i++) {
      promises.push(
        getPairInfo(pools[i]?.lpToken, type).then((result) => {
          if (result.success) {
            return result.data
          } else {
            return null
          }
        })
      )
    }
    const pairs = await Promise.all(promises)
    pools.forEach((poolInfo, index) => {
      poolInfo.pair = pairs[index]
    })
    console.log(pools)
    return pools
  }

  const getRewardInfo = async (basicInfo) => {
    const { rewardToken } = basicInfo
    const price = await getPricePairToken({ address: rewardToken })
    return {
      price,
      token: rewardToken,
    }
  }

  const poolRewardPerBlock = (poolInfo) => {
    const { type } = poolInfo
    const basicInfo = type === FARM_TYPE.KGT ? basicInfoKGT : basicInfoKABY
    const { rewardPerBlock, totalAllocPoint } = basicInfo
    const { allocPoint } = poolInfo
    const value = rewardPerBlock * (allocPoint / totalAllocPoint) || 0
    return Web3.utils.fromWei(value.toString())
  }

  const poolSupply = (poolInfo) => {
    const { supply, pair } = poolInfo
    return supply / 10 ** pair?.decimals || 0
  }

  const TVL = (poolInfo) => {
    return (poolSupply(poolInfo) * poolInfo?.pair?.price)
      .toFixed(2)
      .replace(/./g, function (c, i, a) {
        return i > 0 && c !== '.' && (a.length - i) % 3 === 0 ? ',' + c : c
      })
  }

  const APR = (poolInfo) => {
    const { type } = poolInfo
    const reward = type === FARM_TYPE.KGT ? rewardKGT : rewardKABY
    const blockPerYear = 10518975
    const tvl = poolSupply(poolInfo) * poolInfo?.pair?.price
    if (tvl === 0) {
      return 0
    }
    const { price } = reward
    const rewardValuePerYear = blockPerYear * Number(poolRewardPerBlock(poolInfo)) * price
    return ((rewardValuePerYear / tvl) * 100).toFixed(2)
  }

  const getLogoCoin = (symbol) => {
    switch (symbol) {
      case 'KABY':
        return coinLogo
      case 'KGT':
        return kgtLogo
      case 'BUSD':
        return binanceLogo
      default:
        return coinLogo
    }
  }

  const pairLogo = (pair) => {
    if (!pair) {
      return
    }
    const { token0, token1, symbol } = pair
    if (token0 && token1) {
      const logo0 = getLogoCoin(token0.symbol)
      const logo1 = getLogoCoin(token1.symbol)
      return (
        <div className="d-flex">
          <img src={logo0} alt="coin" className="coin-top" />
          <img src={logo1} alt="binance" className="coin-top binance" />
        </div>
      )
    } else {
      const logo = getLogoCoin(symbol)
      return (
        <div className="d-flex">
          <img src={logo} alt="coin" className="coin-top" />
        </div>
      )
    }
  }

  const renderPool = (poolInfo, index) => {
    const { name, type } = poolName(poolInfo)
    const bottom = index <= 1 ? '' : 'bottom'
    return (
      <>
        <Col className={`market-page-mid ${bottom}`} key={`${poolInfo.index}_${poolInfo.type}`}>
          <div className="market-page-mid-top">
            {pairLogo(poolInfo?.pair)}

            <div className="title-text">{name}</div>
            <div className="text">
              Stake {name} {type} to earn {poolInfo.type === FARM_TYPE.KABY ? 'KABY' : 'KGT'}
            </div>
          </div>
          <div className="market-page-mid-bottom">
            <div className="market-page-mid-badge">
              <Button
                onClick={() => handleShowKabyEarnPopup(poolInfo)}
                className="bg-transparent border-0 select"
              >
                <img src={selectBadge} alt="select" className="selectBadge" />
              </Button>
            </div>
            <Line className="underline" />
            <div className="info">
              <div>TVL:</div>
              <div>{TVL(poolInfo)} USD</div>
            </div>
            <div className="info mt-0">
              <div>Rewards:</div>
              <div>
                {poolRewardPerBlock(poolInfo)} {poolInfo.type}/block
              </div>
            </div>
            <div className="info mt-0">
              <div>APR:</div>
              <div>{APR(poolInfo)}%</div>
            </div>
          </div>
        </Col>
        {(index + 2) % 3 === 0 && <div class="w-100"></div>}
      </>
    )
  }

  return (
    <>
      <SummonStakePopup
        showModal={showPopup === TRANSACTION.STAKE}
        handleCloseModal={() => {
          setShowPopup(null)
          setReload(!reload)
        }}
      />
      <ClaimHeroPopup
        showModal={showPopup === TRANSACTION.CLAIM}
        handleCloseModal={() => {
          setShowPopup(null)
          setReload(!reload)
        }}
      />
      <StakeKabyEarnPopup
        showModal={showPopup === TRANSACTION.KABYSTAKE}
        handleCloseModal={() => {
          setShowPopup(null)
          setReload(!reload)
          setPoolInfoPopup(null)
        }}
        poolInfo={poolInfoPopup}
        updatePoolInfo={updatePoolInfo}
      />
      <div style={{ backgroundImage: `url(${BackGround2})` }} className="market-page d-block">
        <h2 className="title-stake">STAKE TO EARN</h2>
        <Container>
          <div className="market-page-container justify-content-center w-100">
            <Row>
              <Col className="market-page-left">
                <img src={embedTR} alt="red-embed" className="embed" />
                <div className="market-page-left-top">
                  <img src={coinLogo} alt="coin" className="coin-top" />
                  <div className="title-text">GENESIS</div>
                  <div className="text">Stake to buy genesis heroes</div>
                </div>
                <div className="market-page-left-bottom">
                  <div className="market-page-left-badge">
                    <Button
                      onClick={handleShowSummonPopup}
                      className="bg-transparent border-0 stake-summon-hero top"
                      id="stake-summon-hero-000"
                    >
                      <img src={selectBadge} alt="Stake Summon Hero" className="select" />
                    </Button>

                    <Button
                      onClick={handleShowClaimPopup}
                      className="bg-transparent border-0 stake-summon-hero bottom"
                    >
                      <div className="w-100 claimhero">CLAIM HERO</div>
                    </Button>
                  </div>
                  <Line className="underline" />
                  <div className="info">
                    <div>TVL:</div>
                    <div>{formatNumber(totalLock || 0)} KABY</div>
                  </div>
                </div>
              </Col>
              {(poolsKGT.length > 0 || poolsKABY.length > 0) &&
                poolsKGT.concat(poolsKABY).map((poolInfo, index) => {
                  return renderPool(poolInfo, index)
                })}
              {(loadingPoolKGT || loadingPoolKABY) && (
                <Col className="market-page-loading">
                  <>
                    <Button disabled>
                      {' '}
                      <Spinner
                        as="div"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        className="spinner-loading"
                      />
                      {' Loading...'}
                    </Button>
                  </>
                </Col>
              )}
              <div class="w-100"></div>
            </Row>
          </div>
        </Container>
      </div>
    </>
  )
}

export default SummonStakePage

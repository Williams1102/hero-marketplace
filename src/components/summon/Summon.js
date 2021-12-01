import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import newBG from 'images/summon/redNew_tiny.png'
import SumonBadge from 'images/summon/summon_badge.png'
import blueLight from 'images/summon/blueLight_tiny.png'
import './summon.scss'
import { useWeb3React } from '@web3-react/core'
import * as summonActions from 'actions/summon'
import { toast } from 'react-toastify'
import SummonPopup from 'components/Popup/SummonPopup'
import { networkIdAPI } from 'constant/contract'
import { NOTIFY } from 'constant'
import bullet from 'images/summon/bullet.png'
import moment from 'moment'
import Countdown from 'react-countdown'

const Summon = (props) => {
  const { chainId, account } = useWeb3React()
  const [showSummon, setShowSummon] = useState(false)
  // const [priceInnit, setPriceInnit] = useState(null);
  // const [kabyAddress, setKabyAddress] = useState("");
  const [summonPercent, setSummonPercent] = useState(0)
  const [heroCount, setHeroCount] = useState({})
  const [loadingMessage, setLoadingMessage] = useState(NOTIFY.WARNING.LOGIN)

  const startDate = '2021-10-02 12:00:00'
  const endDate = '2021-10-03 12:00:00'

  const dispatch = useDispatch()
  const handleShowSummonPopup = () => {
    if (loadingMessage) return toast.warning(loadingMessage)
    setShowSummon(true)
  }

  const utcTime = moment().utc().format('MM/DD/YYYY HH:mm:ss')
  const now = moment().format('MM/DD/YYYY HH:mm:ss')
  const hourDiff = moment(utcTime).diff(now, 'hours')

  useEffect(() => {
    const fetchSummonData = async () => {
      const networkId = networkIdAPI[chainId]
      const count = await dispatch(
        summonActions.fetchHeroCountSummon({
          networkId,
        })
      )

      if (count?.status === 'success') {
        setHeroCount(count.data)
        const percent =
          (Math.round((count.data.numOfNft / count.data.totalNFT) * 1000000) || 0) / 10000
        setSummonPercent(percent)
      }
    }
    if (!account) return setLoadingMessage(NOTIFY.WARNING.LOGIN)

    fetchSummonData()
    return setLoadingMessage(null)
  }, [dispatch, chainId, account])

  return (
    <div>
      <SummonPopup
        showModal={showSummon}
        handleCloseModal={() => {
          setShowSummon(false)
        }}
        current={heroCount?.numOfNft}
        limit={heroCount?.totalNFT}
        end={endDate}
        start={startDate}
        hourDiff={hourDiff}
      />
      <div style={{ backgroundImage: `url(${newBG})` }} className="summon-page">
        <div className="summon-page-right">
          <div
            //style={{ backgroundImage: `url(${WalletBackGround})` }}
            className="summon-page-right-background"
          >
            <img src={blueLight} alt="wallet-bg" className="summon-bg-right" />
          </div>
        </div>
        <div className="summon-page-left">
          <div
            onClick={
              // heroCount?.totalNFT > heroCount?.numOfNft
              //   ? handleShowSummonPopup
              //   : () => {}
              handleShowSummonPopup
            }
            style={{ backgroundImage: `url(${SumonBadge})` }}
            className="summon-page-left-badge"
          >
            {/* <span className="font-face-ac">SUMMON HERO</span> */}
          </div>
          {moment(startDate) > moment().add(hourDiff, 'hours') && (
            <div className="summon-page-left-time">
              <div className="summon-page-left-time-label">Starts in</div>
              <div className="summon-page-left-time-value">
                <Countdown date={moment(startDate).add(0 - hourDiff, 'hours')} daysInHours />
              </div>
            </div>
          )}
          {/* {durationStart !== 0 && (
            <div className="summon-page-left-time">
              <span className="text">Starts in</span>
              <Countdown date={Date.now() + durationStartsec} />
            </div>
          )} */}
          (
          <div className="summon-page-left-time">
            {moment(startDate) < moment().add(hourDiff, 'hours') &&
              ((moment(endDate) > moment().add(hourDiff, 'hours') &&
                heroCount.numOfNft &&
                heroCount.numOfNft >= heroCount.totalNFT) ||
              moment(endDate) < moment().add(hourDiff, 'hours') ? (
                <span className="text">All heroes were sold out</span>
              ) : (
                <>
                  <div className="summon-page-left-time-label">Ends in</div>
                  <div className="summon-page-left-time-value">
                    <Countdown date={moment(endDate).add(0 - hourDiff, 'hours')} daysInHours />
                  </div>
                </>
              ))}
          </div>
          {/* <div className="summon-page-left-exodus">EXODUS</div> */}
          <div className="summon-page-left-info">
            <div className="summon-page-left-info-text">
              <div className="summon-page-left-info-text-content">
                <div className="font-face-ac">
                  {heroCount?.numOfNft || 0} / {heroCount?.totalNFT || 0} SUMMONED
                </div>
              </div>
            </div>
            <div className="summon-page-left-info-progressbar">
              <div
                className="summon-page-left-info-progressbar-sumon"
                style={{
                  '--percent': `${summonPercent || 0}%`,
                }}
              >
                <div className="bullet">
                  <img src={bullet} alt="bullet" />
                  <div className="text">
                    <div className="summon-percent">{summonPercent}%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Summon

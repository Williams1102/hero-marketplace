import { useWeb3React } from '@web3-react/core'
import HeroCard from '../common/hero-card/HeroCard'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Modal, Spinner } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import * as marketActions from 'actions/market'
import * as stakingPool from 'services/contracts/blockchain'
//import * as heroPool from "services/contracts/hero";
import { getInfoWallet } from 'services/contracts/wallet'
import './popup.scss'
import Foundation from 'assets/image/Foundation.png'
import Water from 'assets/image/water-icon.png'
import Fire from 'assets/image/fire-icon.png'
import Dark from 'assets/image/dark-icon.png'
import Light from 'assets/image/light-icon.png'
import Wind from 'assets/image/wind-icon.png'
import { toast } from 'react-toastify'
import { TRANSACTION } from 'constant/transactions'
import { NOTIFY } from 'constant'
import ModalContext from 'containers/layout/NewAppLayout'
const StakePopup = ({ showModal, handleCloseModal, handleOpenModal, hero }) => {
  const ctx = useContext(ModalContext)
  const { account, chainId } = useWeb3React()
  const [reload, setReload] = useState(false)
  const refInputAmountUnstake = useRef(null)
  const refInputAmountStake = useRef(null)
  const [transaction, setTransaction] = useState(null)
  const [balanceKaby, setBalanceKaby] = useState(0)
  //const [heroStar, setHeroStar] = useState(1);
  const [stakings, setStakings] = useState({ allowance: 0 })

  const elementImage = {
    Fire: Fire,
    Wind: Wind,
    Light: Light,
    Dark: Dark,
    Water: Water,
  }

  const stakeToEarnExp = async () => {
    setTransaction(TRANSACTION.STAKE)
    try {
      const tx = await stakingPool.stakeForUpgradeLevel(hero?.id, refInputAmountStake.current.value)

      if (tx) {
        setReload(!reload)
        toast.success(NOTIFY.SUCCESS.default)
      }
    } catch (e) {
      toast.error(NOTIFY.ERROR.default)
    }
    setTransaction(null)
  }
  const claimToUpLvl = async () => {
    setTransaction(TRANSACTION.CLAIM)
    try {
      const tx = await stakingPool.claim(hero?.id)

      if (tx) {
        setReload(!reload)
        toast.success(NOTIFY.SUCCESS.default)
      }
    } catch (e) {
      toast.error(NOTIFY.ERROR.default)
    }
    setTransaction(null)
  }

  const unstakeToReward = async () => {
    setTransaction(TRANSACTION.UNSTAKE)
    try {
      const tx = await stakingPool.unstake(hero?.id, refInputAmountUnstake.current.value)

      if (tx) {
        setReload(!reload)
        toast.success(NOTIFY.SUCCESS.default)
      }
    } catch (e) {
      toast.error(NOTIFY.ERROR.default)
    }
    setTransaction(null)
  }

  const approve = async () => {
    setTransaction(TRANSACTION.APPROVE)
    try {
      const tx = await stakingPool.approveStakingPool()
      const preStakings = { ...stakings, allowance: 999999 }
      if (tx) setStakings({ ...preStakings })
    } catch (e) {}
    setTransaction(null)
  }
  const dispatch = useDispatch()

  useEffect(() => {
    console.log(showModal)
    console.log('usse efffect da chay')
    ctx.setIsModalOpen(showModal)
  }, [showModal])
  useEffect(() => {
    if (!account) return
    const getBalance = async () => {
      const { getTokenBalance } = await getInfoWallet()
      const balance = await getTokenBalance(account)
      if (balance.kabyBalance) return setBalanceKaby(balance.kabyBalance)
    }

    getBalance()

    const getHeroStakingsData = async () => {
      try {
        const fetchHeroTrainingExp = (lv) =>
          dispatch(marketActions.fetchHeroTrainingExp({ level: lv }))

        const allow = await stakingPool.getAllowanceStakingPool()
        setStakings({
          allowance: allow,
        })

        //const starHero = await heroPool.getStarInfo(hero?.id);

        //if (starHero.star) setHeroStar(Number(starHero.star));

        const stakingData = await stakingPool.getHeroStakings(hero?.id)

        const reqExp = await fetchHeroTrainingExp(stakingData?.currentLevel || 1)

        if (allow && stakingData)
          setStakings({
            ...stakingData,
            allowance: allow,
            requiredExp: reqExp.exp,
          })
      } catch (e) {
        console.log(e)
      }
    }
    getHeroStakingsData()
  }, [account, chainId, hero?.id, reload, dispatch])
  return (
    <>
      <Modal
        centered
        show={showModal}
        onHide={handleCloseModal}
        className="modal-chose-wallet training-popup"
      >
        (
        <div>
          <div>
            <div
              onClick={(e) => {
                e.stopPropagation()
              }}
              className="training-popup-board"
            >
              <svg
                onClick={() => {
                  handleCloseModal()
                }}
                className="cancel-button-training-popup"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 11.3337L6 15.3337L4.66667 14.0003L8.66667 10.0003L4.66667 6.00033L6 4.66699L10 8.66699L14 4.66699L15.3333 6.00033L11.3333 10.0003L15.3333 14.0003L14 15.3337L10 11.3337Z"
                  fill="white"
                />
              </svg>
              <div className="training-popup-board-left">
                <img className="training-popup-left-image" alt="#" src={Foundation}></img>
                <img
                  alt="#"
                  src={elementImage[hero?.element]}
                  className="popup-training-element-image"
                ></img>

                <div className="training-popup-board-left-hero-card">
                  {hero && (
                    <HeroCard
                      training={() => {}}
                      stake_amount={hero?.stake_amount}
                      star={hero?.star}
                      gens={hero?.gens}
                      heroId={hero?.id}
                      type={hero?.type}
                      price={hero?.price}
                      element={hero?.element}
                      name={hero?.name}
                      image={hero?.image}
                      skills={hero?.skills}
                    />
                  )}
                </div>
              </div>
              <div className="training-popup-board-right">
                {/* <div
                  onClick={() => {
                    if (stakings.currentLevel / 10 === heroStar) {
                      handleOpenModal();
                    } else toast.warning("Max hero’s level first");
                  }}
                  className="training-popup-board-right-up"
                >
                  UPGRADE STAR
                </div> */}
                <div className="training-popup-board-right-down">
                  <div className="training-popup-board-right-down-content">
                    <div className="training-popup-board-right-down-content-header">STAKE</div>
                    <div className="training-popup-board-right-down-content-body">
                      <span className="training-popup-board-right-down-content-body-text">
                        Kaby Amount
                      </span>
                      <div className="training-popup-board-right-down-content-body-input">
                        <input
                          ref={refInputAmountStake}
                          defaultValue={0}
                          min={1}
                          onChange={() => {
                            refInputAmountStake.current.value =
                              Number(refInputAmountStake.current.value) || 0
                            if (Number(refInputAmountStake.current.value) > Number(balanceKaby))
                              refInputAmountStake.current.value =
                                Math.floor(Number(balanceKaby) * 100) / 100
                          }}
                          onKeyPress={(event) => {
                            if (!/[0-9]/.test(event.key)) {
                              event.preventDefault()
                            }
                          }}
                          type="number"
                        ></input>
                        <div
                          onClick={() => {
                            refInputAmountStake.current.value =
                              Math.floor(Number(balanceKaby) * 100) / 100
                          }}
                          className="training-popup-board-right-down-content-body-input-button"
                        >
                          MAX
                        </div>
                      </div>
                      <span className="training-popup-board-right-down-content-body-text-input">
                        Balance: {balanceKaby?.toFixed(2) || 0} KABY
                      </span>
                      <span className="training-popup-board-right-down-content-body-text">
                        This campaign has ended
                      </span>
                    </div>
                    <div
                      onClick={() => {
                        if (transaction) return
                        if (stakings.allowance > 0) stakeToEarnExp()
                        else approve()
                      }}
                      className="training-popup-board-right-down-content-footer"
                    >
                      {stakings.allowance > 0 ? (
                        transaction === TRANSACTION.STAKE ? (
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
                            Staking
                          </>
                        ) : (
                          <span>Stake</span>
                        )
                      ) : transaction === TRANSACTION.APPROVE ? (
                        <>
                          <Spinner
                            as="div"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                            className="spinner-loading"
                          />{' '}
                          APPROVING
                        </>
                      ) : (
                        <span>APPROVE</span>
                      )}
                    </div>
                  </div>
                  <svg
                    width="7"
                    height="319"
                    viewBox="0 0 7 319"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      opacity="0.2"
                      d="M4.00922 318.887L6.88674 315.991L3.99078 313.113L1.11326 316.009L4.00922 318.887ZM2.99078 0.113253L0.113263 3.00921L3.00922 5.88672L5.88674 2.99076L2.99078 0.113253ZM4.5 315.998L3.5 2.99839L2.5 3.00158L3.5 316.002L4.5 315.998Z"
                      fill="white"
                    />
                  </svg>

                  <div className="training-popup-board-right-down-content">
                    <div className="training-popup-board-right-down-content-header">UNSTAKE</div>
                    <div className="training-popup-board-right-down-content-body">
                      <span className="training-popup-board-right-down-content-body-text">
                        Kaby Amount
                      </span>
                      <div className="training-popup-board-right-down-content-body-input">
                        <input
                          ref={refInputAmountUnstake}
                          defaultValue={0}
                          min={1}
                          onChange={() => {
                            refInputAmountUnstake.current.value =
                              Number(refInputAmountUnstake.current.value) || 0
                            if (
                              Number(refInputAmountUnstake.current.value) > Number(stakings.staked)
                            )
                              refInputAmountUnstake.current.value =
                                Math.floor(Number(stakings.staked) * 100) / 100
                          }}
                          onKeyPress={(event) => {
                            if (!/[0-9]/.test(event.key)) {
                              event.preventDefault()
                            }
                          }}
                          type="number"
                        ></input>
                        <div
                          onClick={() => {
                            refInputAmountUnstake.current.value =
                              Math.floor(Number(stakings.staked) * 100) / 100
                          }}
                          className="training-popup-board-right-down-content-body-input-button"
                        >
                          MAX
                        </div>
                      </div>
                      <span className="training-popup-board-right-down-content-body-text-input">
                        Balance: {stakings.staked?.toFixed(2) || 0} KABY
                      </span>
                      <span className="training-popup-board-right-down-content-body-text">
                        Available to withdraw
                      </span>
                    </div>
                    <div
                      onClick={() => {
                        if (!transaction && stakings.allowance > 0) return unstakeToReward()
                      }}
                      className="training-popup-board-right-down-content-footer"
                    >
                      {transaction === TRANSACTION.UNSTAKE ? (
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
                          unStaking
                        </>
                      ) : (
                        <span>unStake</span>
                      )}
                    </div>
                  </div>
                  <svg
                    width="7"
                    height="319"
                    viewBox="0 0 7 319"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      opacity="0.2"
                      d="M4.00922 318.887L6.88674 315.991L3.99078 313.113L1.11326 316.009L4.00922 318.887ZM2.99078 0.113253L0.113263 3.00921L3.00922 5.88672L5.88674 2.99076L2.99078 0.113253ZM4.5 315.998L3.5 2.99839L2.5 3.00158L3.5 316.002L4.5 315.998Z"
                      fill="white"
                    />
                  </svg>

                  <div className="training-popup-board-right-down-content">
                    <div className="training-popup-board-right-down-content-header">REWARD</div>
                    <div className="training-popup-board-right-down-content-body">
                      <span className="training-popup-board-right-down-content-body-text">
                        Level:&#160;
                        <strong>{stakings.currentLevel || 1}</strong>
                      </span>
                      <span className="training-popup-board-right-down-content-body-text">
                        Next Level:&#160;
                        <strong>
                          {stakings.currentExp?.toFixed(0) || 0}/{stakings.requiredExp || 0} EXP
                        </strong>
                      </span>
                      <span className="training-popup-board-right-down-content-body-text">
                        EXP Reward:&#160;
                        <strong>{stakings.reward?.expEarned?.toFixed(0) || 0}</strong>
                      </span>
                      <span className="training-popup-board-right-down-content-body-text">
                        KABY Reward:&#160;
                        <strong>{stakings.reward?.tokenEarned?.toFixed(2) || 0}</strong>
                      </span>
                    </div>
                    <div
                      onClick={() => {
                        if (!transaction && stakings.allowance > 0) return claimToUpLvl()
                      }}
                      className="training-popup-board-right-down-content-footer"
                    >
                      {transaction === TRANSACTION.CLAIM ? (
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
                          claiming
                        </>
                      ) : (
                        <span>claim</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        )
      </Modal>
    </>
  )
}

export default StakePopup

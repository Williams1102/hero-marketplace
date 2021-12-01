import React, { useEffect, useRef, useState, useContext } from 'react'
import { Modal } from 'react-bootstrap'
import './popup.scss'
import { toast } from 'react-toastify'
import { NOTIFY } from 'constant'
import {
  getUserInfo,
  deposit,
  getPendingReward,
  withdraw,
  claimRewards,
  approveFarm,
  getLockInfo,
  unlock,
  balanceOf,
} from 'services/contracts/farm'
import Web3 from 'web3'
import { BigNumber } from '@ethersproject/bignumber'
import ModalContext from 'containers/layout/NewAppLayout'
const StakeKabyEarnPopup = ({ showModal, handleCloseModal, poolInfo, updatePoolInfo }) => {
  //const [reload, setReload] = useState(false);
  const refInputUnstake = useRef({ value: null, bnValue: null })
  const refInputStake = useRef({ value: null, bnValue: null })
  const [userInfo, setUserInfo] = useState({})
  const [token, setToken] = useState({})
  const [reward, setReward] = useState('0')
  const [unlocks, setUnLocks] = useState({
    indexs: [],
    available: 0,
    locked: 0,
  })
  const ctx = useContext(ModalContext)
  useEffect(() => {
    ctx.setIsModalOpen(showModal)
  }, [showModal])
  useEffect(() => {
    if (!poolInfo) {
      return
    }
    const { lpToken, pair, index, type } = poolInfo
    if (lpToken) {
      balanceOf(lpToken).then((balance) => {
        const token = pair
        token.balance = balance
        setToken(pair || {})
      })
      getPendingReward(index, type).then((result) => {
        if (result.success) {
          setReward(result.data.value)
        } else {
          toast.error(NOTIFY.ERROR.default)
        }
      })
    }
    getUserInfo(index, type).then((result) => {
      if (result.success) {
        setUserInfo(result.data)
      } else {
        toast.error(NOTIFY.ERROR.default)
      }
    })
    getLockInfo(type).then((result) => {
      if (result.success) {
        const locks = result.data
        const indexs = []
        let available = BigNumber.from('0x0')
        let locked = BigNumber.from('0x0')
        locks?.tokens?.forEach((token, index) => {
          if (token === lpToken) {
            const amount = BigNumber.from(locks?.amounts[index])
            if (Number(locks?.unlockableAts[index]) <= Date.now() / 1000) {
              available = available.add(amount)
              indexs.push(index)
            } else {
              locked = locked.add(amount)
            }
          }
        })
        setUnLocks({ indexs: indexs.reverse(), available, locked })
      } else {
        toast.error(NOTIFY.ERROR.default)
      }
    })
  }, [poolInfo])

  const tokenBalance = () => {
    return (token.balance / 10 ** token.decimals).toFixed(2) || 0
  }

  const stakedAmount = () => {
    return (userInfo.staked / 10 ** token.decimals).toFixed(2) || 0
  }

  const stakeReward = () => {
    return Number(Web3.utils.fromWei(reward.toString())).toFixed(2) || 0
  }

  const withdrawAvailable = () => {
    return (unlocks.available / 10 ** token.decimals).toFixed(2)
  }

  const lockedAmount = () => {
    return (unlocks.locked / 10 ** token.decimals).toFixed(2)
  }

  const claimReward = async () => {
    const result = await claimRewards(poolInfo.index, poolInfo.type)
    if (result.success) {
      token.balance = await balanceOf(token.address)
      setToken({ ...token })
      setReward(BigNumber.from('0x0'))
      toast.success(NOTIFY.SUCCESS.CLAIM_REWARD)
    } else {
      toast.error(NOTIFY.ERROR.default)
    }
  }

  const stake = async () => {
    const value = refInputStake.current.bnValue
    if (!value || Number(value) === 0) {
      return
    }
    if (value.gt(token.balance)) {
      return
    }
    const result = await deposit(poolInfo.index, value, poolInfo.type)
    if (result.success) {
      token.balance = token.balance.sub(value)
      userInfo.staked = userInfo.staked.add(value)
      setUserInfo({ ...userInfo })
      setToken({ ...token })
      const newPool = { ...poolInfo }
      newPool.pair = token
      newPool.supply = newPool.supply.add(value)
      updatePoolInfo(newPool)
      toast.success(NOTIFY.SUCCESS.STAKE)
    } else {
      toast.error(NOTIFY.ERROR.default)
    }
  }

  const unstake = async () => {
    const value = refInputUnstake.current.bnValue
    if (!value || Number(value) === 0) {
      return
    }
    if (value.gt(userInfo.staked)) {
      return
    }
    const result = await withdraw(poolInfo.index, value, poolInfo.type)
    if (result.success) {
      userInfo.staked = userInfo.staked.sub(value)
      setToken({ ...token })
      setUserInfo({ ...userInfo })
      const newPool = { ...poolInfo }
      newPool.pair = token
      newPool.supply = newPool.supply.sub(value)
      updatePoolInfo(newPool)
      const locked = unlocks.locked.add(value)
      setUnLocks({ ...unlocks, locked })
      toast.success(NOTIFY.SUCCESS.UNSTAKE)
    } else {
      toast.error(NOTIFY.ERROR.default)
    }
  }

  const approve = async () => {
    const result = await approveFarm(poolInfo.lpToken, poolInfo.type)
    if (result.success) {
      const newPool = { ...poolInfo }
      newPool.pair = {
        ...poolInfo.pair,
        allowance: BigNumber.from(
          '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
        ),
      }
      updatePoolInfo(newPool)
      setToken(newPool.pair)
      toast.success(NOTIFY.SUCCESS.APPROVED)
    } else {
      toast.error(NOTIFY.ERROR.default)
    }
  }

  const checkApprove = () => {
    return token.allowance < 100000 * 1e18
  }

  const unlockToken = async () => {
    if (unlocks.indexs.length === 0) {
      return
    }
    const result = await unlock(unlocks.indexs, poolInfo.type)
    if (result.success) {
      const balance = await balanceOf(poolInfo.lpToken)
      token.balance = balance
      setToken({ ...token })
      setUnLocks({
        indexs: [],
        available: 0,
        locked: unlocks.locked,
      })
      toast.success(NOTIFY.SUCCESS.WITHDRAW)
    } else {
      toast.error(NOTIFY.ERROR.default)
    }
  }

  const poolName = () => {
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

  const changeInputAmountUnstake = (amount, value) => {
    if (value) {
      refInputUnstake.current.value = (value / 10 ** token.decimals).toFixed(2) || 0
      refInputUnstake.current.bnValue = value
    } else {
      refInputUnstake.current.value = Number(amount) || 0
      refInputUnstake.current.bnValue = BigNumber.from(
        `0x${(refInputUnstake.current.value * 10 ** token.decimals).toString(16)}`
      )
    }
    if (refInputUnstake.current.bnValue.gt(userInfo.staked)) {
      refInputUnstake.current.bnValue = userInfo.staked
      refInputUnstake.current.value = (userInfo.staked / 10 ** token.decimals).toFixed(2) || 0
    }
  }

  const changeInputAmountStake = (amount, value) => {
    if (value) {
      refInputStake.current.value = (value / 10 ** token.decimals).toFixed(2) || 0
      refInputStake.current.bnValue = value
    } else {
      refInputStake.current.value = Number(amount) || 0
      refInputStake.current.bnValue = BigNumber.from(
        `0x${(refInputStake.current.value * 10 ** token.decimals).toString(16)}`
      )
    }
    if (refInputStake.current.bnValue.gt(token.balance)) {
      refInputStake.current.bnValue = token.balance
      refInputStake.current.value = (token.balance / 10 ** token.decimals).toFixed(2) || 0
    }
  }

  const claimable = () => {
    if (!poolInfo) {
      return false
    }
    if (poolInfo.claimRewardTime > Date.now() / 1000) {
      return false
    }
    if (Number(reward) === 0) {
      return false
    }
    return true
  }

  return (
    <>
      <Modal
        centered
        show={showModal}
        onHide={handleCloseModal}
        className="modal-chose-wallet kabyearn-popup"
      >
        <div>
          <div>
            <div
              onClick={(e) => {
                e.stopPropagation()
              }}
              className="kabyearn-popup-board"
            >
              <svg
                onClick={() => {
                  handleCloseModal()
                }}
                className="cancel-button-kabyearn-popup"
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
              <div className="kabyearn-popup-board-right">
                <div className="kabyearn-popup-board-right-down">
                  <div className="kabyearn-popup-board-right-down-content">
                    <div className="kabyearn-popup-board-right-down-content-header">STAKE</div>
                    <div className="kabyearn-popup-board-right-down-content-body">
                      <span className="kabyearn-popup-board-right-down-content-body-text">
                        {poolName().name} Amount
                      </span>
                      <div className="kabyearn-popup-board-right-down-content-body-input">
                        <input
                          ref={refInputStake}
                          defaultValue={0}
                          min={1}
                          onChange={() => {
                            changeInputAmountStake(refInputStake.current.value, null)
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
                            changeInputAmountStake(null, token.balance)
                          }}
                          className="kabyearn-popup-board-right-down-content-body-input-button"
                        >
                          MAX
                        </div>
                      </div>
                      <span className="kabyearn-popup-board-right-down-content-body-text-input">
                        Balance: {tokenBalance() || 0} {poolName().name}
                      </span>
                      <span className="kabyearn-popup-board-right-down-content-body-text align-normal">
                        <a
                          href="https://pancakeswap.finance/add/0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56/0x02A40C048eE2607B5f5606e445CFc3633Fb20b58"
                          target="_blank"
                          rel="noreferrer"
                        >
                          Add Liquidity to get Kaby-BUSD LP tokens
                        </a>{' '}
                        <br></br>
                        <a
                          href="https://pancakeswap.finance/info/pair/0xe2dfcfa3bc1b26a42107154208233dfb5dcfe61e"
                          target="_blank"
                          rel="noreferrer"
                        >
                          Pool Info on PancakeSwap
                        </a>{' '}
                        {poolInfo?.type}
                      </span>
                    </div>
                    <div
                      className={
                        'kabyearn-popup-board-right-down-content-footer' +
                        (Number(token.balance) === 0 ? ' disable' : '')
                      }
                      onClick={() => {
                        checkApprove() ? approve() : stake()
                      }}
                    >
                      {checkApprove() ? 'Approve' : 'Stake'}
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

                  <div className="kabyearn-popup-board-right-down-content">
                    <div className="kabyearn-popup-board-right-down-content-header">UNSTAKE</div>
                    <div className="kabyearn-popup-board-right-down-content-body">
                      <span className="kabyearn-popup-board-right-down-content-body-text">
                        {poolName().name} Amount
                      </span>
                      <div className="kabyearn-popup-board-right-down-content-body-input">
                        <input
                          ref={refInputUnstake}
                          defaultValue={0}
                          min={1}
                          onChange={() => {
                            changeInputAmountUnstake(refInputUnstake.current.value, null)
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
                            changeInputAmountUnstake(null, userInfo.staked)
                          }}
                          className="kabyearn-popup-board-right-down-content-body-input-button"
                        >
                          MAX
                        </div>
                      </div>
                      <span className="kabyearn-popup-board-right-down-content-body-text-input">
                        Staked: {stakedAmount() || 0} {poolName().name}
                      </span>
                      <span className="kabyearn-popup-board-right-down-content-body-text align-normal">
                        Your staked token will be locked for 24 hours after unstaking.
                      </span>
                    </div>
                    <div
                      className={
                        'kabyearn-popup-board-right-down-content-footer' +
                        (Number(userInfo.staked) === 0 ? ' disable' : '')
                      }
                      onClick={() => {
                        unstake()
                      }}
                    >
                      unStake
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

                  <div className="kabyearn-popup-board-right-down-content">
                    <div className="kabyearn-popup-board-right-down-content-header">REWARD</div>
                    <div className="kabyearn-popup-board-right-down-content-body justify-content-start mt-1">
                      <span className="kabyearn-popup-board-right-down-content-body-text">
                        Rewards:&#160;
                        <strong>
                          {stakeReward()} {poolInfo?.type} KGT
                        </strong>
                      </span>
                      <div
                        className={
                          'kabyearn-popup-board-right-down-content-footer claimbutton' +
                          (!claimable() ? ' disable' : '')
                        }
                        onClick={() => {
                          claimReward()
                        }}
                      >
                        <span>Claim</span>
                      </div>
                      <span className="kabyearn-popup-board-right-down-content-body-text align-normal d-block mt-5">
                        <div>
                          Available to withdraw:&#160;
                          <strong>
                            {withdrawAvailable()} {poolName().name}
                          </strong>
                        </div>
                        <div>
                          Locked:&#160;
                          <strong>
                            {lockedAmount()} {poolName().name}
                          </strong>
                        </div>
                      </span>
                    </div>
                    <div
                      className={
                        'kabyearn-popup-board-right-down-content-footer' +
                        (unlocks.indexs.length === 0 ? ' disable' : '')
                      }
                      onClick={() => {
                        unlockToken()
                      }}
                    >
                      <span>Withdraw</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default StakeKabyEarnPopup

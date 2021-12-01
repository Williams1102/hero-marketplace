import { useWeb3React } from '@web3-react/core'
import React, { useEffect, useRef, useState, useContext } from 'react'
import { Modal } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import * as marketActions from 'actions/market'
import './popup.scss'
import Foundation from 'assets/image/Foundation.png'
import { toast } from 'react-toastify'
import { TRANSACTION } from 'constant/transactions'
import { NOTIFY } from 'constant'
import ModalContext from 'containers/layout/NewAppLayout'
const StakeKabyBUSDPopup = ({ showModal, handleCloseModal }) => {
  const { account } = useWeb3React()
  //const [reload, setReload] = useState(false);
  const refInputAmountUnstake = useRef(null)
  const refInputAmountStake = useRef(null)
  const [transaction, setTransaction] = useState(null)
  const [balanceKaby, setBalanceKaby] = useState(0)
  const [stakings, setStakings] = useState({ allowance: 0 })
  const ctx = useContext(ModalContext)
  useEffect(() => {
    ctx.setIsModalOpen(showModal)
  }, [showModal])
  useEffect(() => {}, [account])
  return (
    <>
      <Modal
        centered
        show={showModal}
        onHide={handleCloseModal}
        className="modal-chose-wallet kabybusd-popup"
      >
        <div>
          <div>
            <div
              onClick={(e) => {
                e.stopPropagation()
              }}
              className="kabybusd-popup-board"
            >
              <svg
                onClick={() => {
                  handleCloseModal()
                }}
                className="cancel-button-kabybusd-popup"
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
              <div className="kabybusd-popup-board-right">
                <div className="kabybusd-popup-board-right-down">
                  <div className="kabybusd-popup-board-right-down-content">
                    <div className="kabybusd-popup-board-right-down-content-header">STAKE</div>
                    <div className="kabybusd-popup-board-right-down-content-body">
                      <span className="kabybusd-popup-board-right-down-content-body-text">
                        Kaby Amount
                      </span>
                      <div className="kabybusd-popup-board-right-down-content-body-input">
                        <input
                          ref={refInputAmountStake}
                          defaultValue={0}
                          min={1}
                          onChange={() => {
                            refInputAmountStake.current.value =
                              Number(refInputAmountStake.current.value) || 0
                            // if (
                            //   Number(refInputAmountStake.current.value) >
                            //   Number(balanceKaby)
                            // )
                            //   refInputAmountStake.current.value =
                            //     Math.floor(Number(balanceKaby) * 100) / 100;
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
                          className="kabybusd-popup-board-right-down-content-body-input-button"
                        >
                          MAX
                        </div>
                      </div>
                      <span className="kabybusd-popup-board-right-down-content-body-text-input">
                        Balance: {balanceKaby?.toFixed(4) || 0} KABY
                      </span>
                      <span className="kabybusd-popup-board-right-down-content-body-text align-normal">
                        Stake to earn KABY.
                      </span>
                    </div>
                    <div
                      className="kabybusd-popup-board-right-down-content-footer"
                      onClick={() => {
                        console.log('stake')
                      }}
                    >
                      Stake
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

                  <div className="kabybusd-popup-board-right-down-content">
                    <div className="kabybusd-popup-board-right-down-content-header">UNSTAKE</div>
                    <div className="kabybusd-popup-board-right-down-content-body">
                      <span className="kabybusd-popup-board-right-down-content-body-text">
                        Kaby Amount
                      </span>
                      <div className="kabybusd-popup-board-right-down-content-body-input">
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
                          className="kabybusd-popup-board-right-down-content-body-input-button"
                        >
                          MAX
                        </div>
                      </div>
                      <span className="kabybusd-popup-board-right-down-content-body-text-input">
                        Staked: {stakings.staked?.toFixed(2) || 0} KABY
                      </span>
                      <span className="kabybusd-popup-board-right-down-content-body-text align-normal">
                        Your staked token will be locked for 24 hours after unstaking.
                      </span>
                    </div>
                    <div
                      className="kabybusd-popup-board-right-down-content-footer"
                      onClick={() => {
                        console.log('unstake')
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

                  <div className="kabybusd-popup-board-right-down-content">
                    <div className="kabybusd-popup-board-right-down-content-header">REWARD</div>
                    <div className="kabybusd-popup-board-right-down-content-body">
                      <span className="kabyearn-popup-board-right-down-content-body-text">
                        <div>
                          Rewards:&#160;
                          <strong>2000 KGT</strong>
                        </div>
                      </span>
                      <span className="kabyearn-popup-board-right-down-content-body-text align-normal">
                        <div>
                          Available to withdraw:&#160;
                          <strong>200 KABY</strong>
                        </div>
                      </span>
                    </div>
                    <div
                      className="kabybusd-popup-board-right-down-content-footer"
                      onClick={() => {
                        console.log('claim')
                      }}
                    >
                      <span>claim</span>
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

export default StakeKabyBUSDPopup

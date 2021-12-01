import { useWeb3React } from '@web3-react/core'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Modal, Form, Button, Row, Col } from 'react-bootstrap'
import InputGroupWithExtras from 'react-bootstrap/esm/InputGroup'
import {
  getBalanceStakedSummon,
  getRewardStakingSummonHero,
  //stakingSummonHero,
  unstakingSummonHero,
  checkSummonStakingToken,
  //approveSummonStakingToken,
} from 'services/heroes'
import { getInfoWallet } from 'services/contracts/wallet'
import { toast } from 'react-toastify'

import './popup.scss'
import { NOTIFY } from 'constant'
import ModalContext from 'containers/layout/NewAppLayout'
//import { UnlockDay } from "constant";

const SummonStakePopup = ({ showModal, handleCloseModal }) => {
  const ctx = useContext(ModalContext)

  const { account, chainId } = useWeb3React()
  const [kabyBalance, setKabyBalance] = useState(0)
  const [stakedAmount, setStakedAmount] = useState(0)
  const [reward, setReward] = useState(0)
  const refInputAmountStake = useRef(null)
  const [kabyToken, setKabyToken] = useState(null)
  const [loadingMessage, setLoadingMessage] = useState(null)

  // const staking = async () => {
  //   if (loadingMessage) return toast.warning(loadingMessage);

  //   const value = refInputAmountStake.current.value;

  //   const response = await stakingSummonHero(value);

  //   setLoadingMessage(null);

  //   if (response.success) {
  //     toast.success("Staking Transaction is successful!");
  //     setStakedAmount(stakedAmount + value);
  //     setKabyBalance(kabyBalance - value);
  //     handleCloseModal();
  //   } else {
  //     toast.error("Error!");
  //   }
  // };
  // const approving = async () => {
  //   if (loadingMessage) return toast.warning(loadingMessage);
  //   setLoadingMessage(NOTIFY.WARNING.APPROVING);
  //   const response = await approveSummonStakingToken(kabyToken.address);
  //   setLoadingMessage(null);
  //   if (response.success) {
  //     toast.success(NOTIFY.SUCCESS.APPROVED);
  //     setKabyToken({
  //       address: kabyToken.address,
  //       allowance: Number.MAX_SAFE_INTEGER,
  //     });
  //   } else {
  //     toast.error("Error");
  //   }
  // };

  const unstaking = async () => {
    if (loadingMessage) return toast.warning(loadingMessage)

    const response = await unstakingSummonHero()
    if (response.success) {
      toast.success('Unstaking successful!')
      setStakedAmount(0)
      setKabyBalance(kabyBalance + stakedAmount)
      handleCloseModal()
    } else {
      toast.error('Error!')
    }
  }
  useEffect(() => {
    ctx.setIsModalOpen(showModal)
  }, [showModal])
  useEffect(() => {
    const getAllBalance = async () => {
      if (!account) return
      try {
        setLoadingMessage(NOTIFY.WARNING.LOAD_DATA)
        const res = await checkSummonStakingToken()
        if (res.success) {
          setLoadingMessage(null)
          setKabyToken(res.data)
        }

        const { getTokenBalance } = await getInfoWallet()
        const amount = await getTokenBalance(account)

        setKabyBalance(Number(amount.kabyBalance))

        const staked = await getBalanceStakedSummon()

        if (staked.success) setStakedAmount(Number(staked.data.summonBalance) || 0)

        const resReward = await getRewardStakingSummonHero(account)
        if (resReward.success) {
          const amountReward = Number(resReward.data) || 0
          setReward(amountReward)
        }
      } catch (e) {}
    }
    getAllBalance()
  }, [account, chainId])
  return (
    <Modal
      centered
      show={showModal}
      onHide={handleCloseModal}
      className="modal-chose-wallet stake-popup"
    >
      <div className="custom-popup">
        <Modal.Header closeButton>
          <Modal.Title> </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col className="d-flex flex-column justify-content-between">
              <div>
                <h4>STAKE</h4>
                <Form>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label> Kaby Amount </Form.Label>

                    <InputGroupWithExtras>
                      <InputGroupWithExtras.Text className="input-before"></InputGroupWithExtras.Text>
                      <Form.Control
                        ref={refInputAmountStake}
                        step={1}
                        defaultValue={null}
                        onKeyPress={(event) => {
                          if (!/[0-9]/.test(event.key)) {
                            event.preventDefault()
                          }
                        }}
                        min={1}
                      />
                      <InputGroupWithExtras.Text className="input-after">
                        <Button
                          className="max-btn "
                          onClick={() => {
                            refInputAmountStake.current.value = kabyBalance
                          }}
                          type="button"
                        >
                          MAX
                        </Button>
                      </InputGroupWithExtras.Text>
                    </InputGroupWithExtras>
                    <Form.Text> Balance: {Math.round(kabyBalance * 10000) / 10000} KABY </Form.Text>
                  </Form.Group>

                  <Form.Group className="stake-lock-time">
                    <div>
                      <Form.Label className="text-lock text-responsive">
                        Lock till Oct 15 12:00 AM UTC
                      </Form.Label>
                    </div>
                    <div>
                      <Form.Label className="text-responsive">APR: {20}% </Form.Label>
                    </div>
                  </Form.Group>
                </Form>
              </div>
              <div className="d-lg-flex justify-content-lg-center stake-end">
                {!kabyToken?.allowance ? (
                  <Button
                    className="disable"
                    style={{ width: '80%' }}
                    //onClick={approving}
                    variant="info"
                    type="button"
                  >
                    APPROVE
                  </Button>
                ) : (
                  <Button
                    style={{ width: '80%' }}
                    className="disable"
                    //onClick={staking}
                    variant="info"
                    type="button"
                  >
                    STAKE
                  </Button>
                )}
              </div>
            </Col>
            <Col className="d-flex flex-column justify-content-between">
              <div>
                <h4>UNSTAKE</h4>

                <Form>
                  <Form.Group className="mb-3 kaby-amount" controlId="formBasicEmail">
                    <Form.Label> Kaby Amount </Form.Label>
                    {/* <InputGroupWithExtras>
                      <Form.Control
                        ref={refInputAmountUnstake}
                        type="number"
                        step={1}
                        defaultValue={0}
                      />
                      <InputGroupWithExtras.Text>
                        <Button
                          className="max-btn"
                          onClick={() => {}}
                          type="button"
                        >
                          MAX
                        </Button>
                      </InputGroupWithExtras.Text>
                    </InputGroupWithExtras> */}
                    <br />
                    <Form.Text> Staked: {stakedAmount} KABY </Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className="text-responsive">
                      Reward: {reward.toFixed(2)} KABY{' '}
                    </Form.Label>
                  </Form.Group>
                </Form>
              </div>
              <div className="d-flex justify-content-center stake-end unstake-res">
                {
                  <Button
                    // className={
                    //   new Date() >= UnlockDay && !kabyToken?.allowance
                    //     ? ""
                    //     : "disable"
                    // }
                    style={{ width: '80%' }}
                    onClick={
                      //   () => {
                      //   if (new Date() >= UnlockDay && !kabyToken?.allowance)
                      //     unstaking();
                      // }
                      unstaking
                    }
                    variant="info"
                    type="button"
                  >
                    UNSTAKE
                  </Button>
                }
              </div>
            </Col>
          </Row>
        </Modal.Body>
      </div>
    </Modal>
  )
}

export default SummonStakePopup

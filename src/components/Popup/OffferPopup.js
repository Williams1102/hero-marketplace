import { useWeb3React } from '@web3-react/core'
import React, { useEffect, useRef, useState, useContext } from 'react'
import { Modal, Form, Button, Row, Col, Spinner } from 'react-bootstrap'
import InputGroupWithExtras from 'react-bootstrap/esm/InputGroup'
import * as heroService from 'services/heroes'
import * as marketService from 'services/marketplace'
import { getInfoWallet } from 'services/contracts/wallet'
import './popup.scss'
import { toast } from 'react-toastify'
import { TRANSACTION } from 'constant/transactions'
import { NOTIFY } from 'constant'
import ModalContext from 'containers/layout/NewAppLayout'
const OfferHeroPopup = ({ showModal, handleCloseModal, heroId, offered }) => {
  const refInputAmount = useRef(null)
  const { chainId, account } = useWeb3React()
  const [balanceKaby, setBalanceKaby] = useState(0)
  const [amountInput, setAmountInput] = useState(0)
  const [kabyToken, setKabyToken] = useState(null)
  const [load, setLoad] = useState(false)
  const [transaction, setTransaction] = useState(null)

  const ctx = useContext(ModalContext)

  useEffect(() => {
    ctx.setIsModalOpen(showModal)
  }, [showModal])
  useEffect(() => {
    const getApprovingKabyToken = async () => {
      const approved = await marketService.getApprovedMarketKabyToken()
      if (approved.success) return setKabyToken(approved.data)
    }
    return getApprovingKabyToken()
  }, [account, chainId, load])

  useEffect(() => {
    if (!account || !chainId) return

    const getBalance = async (address) => {
      const { getTokenBalance } = await getInfoWallet()
      const balance = await getTokenBalance(address)

      return setBalanceKaby(balance.kabyBalance)
    }
    getBalance(account)
  }, [chainId, account])

  const offerHeroWithPrice = async () => {
    setTransaction(TRANSACTION.OFFER)

    const price = amountInput
    const offer = await heroService.makeOfferHero(heroId, price)

    setTransaction(null)
    handleCloseModal()

    if (offer.success) {
      offered()
      toast.success(NOTIFY.SUCCESS.OFFER)
    } else toast.error(NOTIFY.ERROR.default)
  }

  const approveAndUpdateState = async () => {
    setTransaction(TRANSACTION.APPROVE)

    const success = await marketService.approveMarketKabyToken()

    setTransaction(null)

    if (success.success) {
      setKabyToken({
        address: kabyToken.address,
        amount: Number.MAX_SAFE_INTEGER,
      })
      setLoad(!load)
      toast.success(NOTIFY.SUCCESS.APPROVED)
      handleCloseModal()
    } else toast.error(NOTIFY.ERROR.default)
  }

  return (
    <Modal
      centered
      show={showModal}
      onHide={() => {
        handleCloseModal()
        setAmountInput(0)
      }}
      className="modal-chose-wallet"
    >
      <div className="custom-popup">
        <Modal.Header closeButton>
          <Modal.Title> </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col className="d-flex flex-column justify-content-between">
              <div>
                <h4>OFFER HERO</h4>
                <Form>
                  <Form.Group className="popup-description"></Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label> Amount </Form.Label>
                    <InputGroupWithExtras>
                      <InputGroupWithExtras.Text
                        onClick={() => {
                          const value = Number(refInputAmount.current.value)
                          refInputAmount.current.value = value > 0 ? value - 1 : 0
                          setAmountInput(refInputAmount.current.value)
                        }}
                        className="input-before"
                      >
                        -
                      </InputGroupWithExtras.Text>
                      <Form.Control
                        ref={refInputAmount}
                        step={1}
                        defaultValue={0}
                        min={0}
                        onChange={() => {
                          refInputAmount.current.value = Number(refInputAmount.current.value || 0)
                          setAmountInput(refInputAmount.current.value)
                        }}
                        onKeyPress={(event) => {
                          if (!/[0-9]/.test(event.key)) {
                            event.preventDefault()
                          }
                        }}
                      />
                      <InputGroupWithExtras.Text
                        onClick={() => {
                          const value = Number(refInputAmount.current.value)
                          refInputAmount.current.value = value + 1
                          setAmountInput(refInputAmount.current.value || 0)
                        }}
                        className="input-after"
                      >
                        +
                      </InputGroupWithExtras.Text>
                    </InputGroupWithExtras>
                  </Form.Group>

                  <div>
                    <Form.Text>
                      Current Kaby Balance: <b>{balanceKaby} KABY</b>
                    </Form.Text>
                  </div>
                </Form>
              </div>
              <div className="justify-content-between stake-end divider-end">
                <div className="show-total">
                  <h6>Total :</h6>
                  <p> {amountInput} KABY </p>
                </div>
                <div>
                  {!kabyToken?.allowance ? (
                    <Button
                      className=""
                      onClick={!transaction ? approveAndUpdateState : null}
                      variant="info"
                      type="button"
                    >
                      {transaction === TRANSACTION.APPROVE ? (
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
                          APPROVING...
                        </>
                      ) : (
                        <span>APPROVE</span>
                      )}
                    </Button>
                  ) : (
                    <Button
                      onClick={
                        !transaction && !!amountInput && amountInput < balanceKaby
                          ? offerHeroWithPrice
                          : null
                      }
                      className={
                        (!amountInput || amountInput > balanceKaby || transaction) && 'disable'
                      }
                      variant="info"
                      type="button"
                    >
                      {transaction === TRANSACTION.OFFER ? (
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
                          OFFERING...
                        </>
                      ) : (
                        <span>OFFER</span>
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </Col>
          </Row>
        </Modal.Body>
      </div>
    </Modal>
  )
}

export default OfferHeroPopup

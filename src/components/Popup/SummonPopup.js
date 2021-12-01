import { useWeb3React } from '@web3-react/core'
import React, { useEffect, useRef, useState, useContext } from 'react'
import { Modal, Form, Button, Row, Col, Spinner } from 'react-bootstrap'
import InputGroupWithExtras from 'react-bootstrap/esm/InputGroup'
import { getApprovedKabyToken, summonHero, approveKabyToken } from 'services/heroes'
import { getInfoWallet } from 'services/contracts/wallet'
import { toast } from 'react-toastify'
import { NOTIFY } from 'constant'
import { ReactComponent as PlusIcon } from 'images/summon/plus.svg'
import { ReactComponent as MinusIcon } from 'images/summon/minus.svg'
import './popup.scss'
import { TRANSACTION } from 'constant/transactions'
import moment from 'moment'
import ModalContext from 'containers/layout/NewAppLayout'
const maxValueAmount = 10

const SummonPopup = ({ showModal, handleCloseModal, current, limit, end, start, hourDiff }) => {
  const { account, chainId } = useWeb3React()
  const [kabyBalance, setKabyBalance] = useState(0)
  const [summonAmount, setSummonAmount] = useState(0)
  const refInputAmount = useRef(null)
  const [loadingMessage, setLoadingMessage] = useState(null)
  const [kabyToken, setKabyToken] = useState(null)
  const [transaction, setTransaction] = useState(null)
  const ctx = useContext(ModalContext)
  const summonHeroes = async () => {
    if (!account) return
    setTransaction(TRANSACTION.SUMMON)
    const response = await summonHero(summonAmount)
    setTransaction(null)

    if (response.success) {
      toast.success('Summon Hero successful!')
      setKabyBalance(kabyBalance - summonHero * 1500)
      handleCloseModal()
    } else {
      toast.error('Error!')
    }
  }

  const approving = async () => {
    if (loadingMessage) return toast.warning(loadingMessage)

    setLoadingMessage(NOTIFY.WARNING.APPROVING)
    setTransaction(TRANSACTION.APPROVE)

    const response = await approveKabyToken(kabyToken.address)

    setTransaction(null)
    setLoadingMessage(null)

    if (response.success) {
      toast.success(NOTIFY.SUCCESS.APPROVED)
      setKabyToken({
        address: kabyToken.address,
        allowance: Number.MAX_SAFE_INTEGER,
      })
    } else {
      toast.error('Error')
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

        const res = await getApprovedKabyToken()
        setLoadingMessage(null)
        if (res.success) {
          setKabyToken(res.data)
        }

        const { getTokenBalance } = await getInfoWallet()
        const amount = await getTokenBalance(account)
        setKabyBalance(Number(amount.kabyBalance) || 0)
      } catch (e) {}
    }
    getAllBalance()
  }, [account, chainId])

  useEffect(() => {
    setSummonAmount(0)
  }, [showModal])
  return (
    <Modal centered show={showModal} onHide={handleCloseModal} className="modal-chose-wallet">
      <div className="custom-popup">
        <Modal.Header closeButton>
          <Modal.Title> </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col className="d-flex flex-column justify-content-between">
              <div>
                <h4 className="summon-title">SUMMON HERO</h4>
                <Form>
                  <Form.Group className="popup-description">
                    <span>Buy exodus heroes of Kaby Arena.</span>
                  </Form.Group>
                  <Form.Group className="content-area" controlId="summonHero">
                    <div className="price-area">
                      <Form.Label className="label-area"> Price </Form.Label>
                      <div className="price">1500 KABY</div>
                    </div>
                    <div className="amount-area">
                      <Form.Label className="label-area"> Amount </Form.Label>
                      <div className="">
                        <InputGroupWithExtras className="amount-content">
                          <InputGroupWithExtras.Text
                            onClick={() => {
                              const value = Number(refInputAmount.current.value)
                              refInputAmount.current.value = value > 0 ? value - 1 : 0
                              setSummonAmount(Number(refInputAmount.current.value))
                            }}
                            className="input-before amount-border"
                          >
                            <MinusIcon />
                          </InputGroupWithExtras.Text>
                          <Form.Control
                            className="amount-border amount-text"
                            ref={refInputAmount}
                            step={1}
                            defaultValue={0}
                            min={0}
                            max={maxValueAmount}
                            //value={refInputAmount.current.value}
                            onChange={() => {
                              if (
                                refInputAmount.current.value >= 0 &&
                                refInputAmount.current.value.indexOf('.') === -1
                              ) {
                                if (isNaN(refInputAmount.current.value)) {
                                  refInputAmount.current.value = 0
                                  setSummonAmount(refInputAmount.current.value)
                                } else {
                                  refInputAmount.current.value =
                                    Number(refInputAmount.current.value || 0) > maxValueAmount
                                      ? maxValueAmount
                                      : Number(refInputAmount.current.value || 0)
                                  setSummonAmount(Number(refInputAmount.current.value))
                                }
                              } else {
                                refInputAmount.current.value = 0
                                setSummonAmount(0)
                              }
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
                              refInputAmount.current.value =
                                value < maxValueAmount ? value + 1 : maxValueAmount
                              setSummonAmount(Number(refInputAmount.current.value))
                            }}
                            className="input-after amount-border"
                          >
                            <PlusIcon />
                          </InputGroupWithExtras.Text>
                        </InputGroupWithExtras>
                      </div>
                    </div>
                  </Form.Group>
                </Form>
              </div>
              <div className="d-flex justify-content-between stake-end">
                <div className="estimate-fee">
                  <div className="label">Total: </div>
                  <span className="text">{showModal ? 1500 * summonAmount : 0} KABY</span>
                </div>

                {!kabyToken?.allowance ? (
                  <Button
                    className={transaction ? 'disable' : null}
                    onClick={() => {
                      if (!transaction) approving()
                    }}
                    variant="info"
                    type="button"
                  >
                    {transaction === TRANSACTION.APPROVE ? (
                      <>
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
                    className={
                      !!transaction ||
                      summonAmount <= 0 ||
                      maxValueAmount < summonAmount ||
                      current === limit ||
                      moment(end) < moment().add(hourDiff, 'hours') ||
                      moment(start) > moment().add(hourDiff, 'hours')
                        ? 'disable'
                        : ''
                    }
                    onClick={() => {
                      if (
                        !transaction &&
                        summonAmount > 0 &&
                        maxValueAmount >= summonAmount &&
                        current !== limit &&
                        moment(end) > moment().add(hourDiff, 'hours') &&
                        moment(start) <= moment().add(hourDiff, 'hours')
                      )
                        return summonHeroes()
                    }}
                    variant="info"
                    type="button"
                  >
                    {transaction === TRANSACTION.SUMMON ? (
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
                      <span>SUMMON</span>
                    )}
                  </Button>
                )}
              </div>
            </Col>
          </Row>
        </Modal.Body>
      </div>
    </Modal>
  )
}

export default SummonPopup

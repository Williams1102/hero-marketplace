import { useWeb3React } from '@web3-react/core'
import React, { useEffect, useRef, useState, useContext } from 'react'
import { Modal, Form, Button, Row, Col, Spinner } from 'react-bootstrap'
import InputGroupWithExtras from 'react-bootstrap/esm/InputGroup'
import * as airdropHeroInstance from 'services/contracts/airdropHero'
import { toast } from 'react-toastify'
import { NOTIFY } from 'constant'
import { ReactComponent as PlusIcon } from 'images/summon/plus.svg'
import { ReactComponent as MinusIcon } from 'images/summon/minus.svg'
import './popup.scss'
import { TRANSACTION } from 'constant/transactions'
import ModalContext from 'containers/layout/NewAppLayout'
const ClaimHeroPopup = ({ showModal, handleCloseModal }) => {
  const { account, chainId } = useWeb3React()
  const [airdropped, setAirdropped] = useState(0)
  const [maxValueAmount, setMaxValueAmount] = useState(0)
  const [claimAmount, setClaimAmount] = useState(0)
  const refInputAmount = useRef(null)
  const [loadingMessage, setLoadingMessage] = useState(null)
  const [kabyToken, setKabyToken] = useState({ allowance: 1 })
  const [transaction, setTransaction] = useState(null)
  const ctx = useContext(ModalContext)

  const claimAirdropHeroes = async () => {
    if (!account) return
    setTransaction(TRANSACTION.CLAIM)
    const response = await airdropHeroInstance.claimHero(claimAmount)
    setTransaction(null)
    if (response.success) {
      toast.success('Claimed Airdrop Hero successful!')
      handleCloseModal()
    } else {
      toast.error('Error!')
    }
  }

  const approving = async () => {
    if (loadingMessage) return toast.warning(loadingMessage)

    setLoadingMessage(NOTIFY.WARNING.APPROVING)
    setTransaction(TRANSACTION.APPROVE)

    const response = await airdropHeroInstance.approveAirdropHero()

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

        // const res = await airdropHeroInstance.getAllowanceAirdropHero();
        // if (res.success) {
        //   setKabyToken(res.data);
        // }

        const airdropData = await airdropHeroInstance.getAirdropped()

        if (airdropData.success) {
          setAirdropped(airdropData.data)
        }
        const maxAirdropData = await airdropHeroInstance.getMaxAirdrop()

        if (maxAirdropData.success) {
          setMaxValueAmount(maxAirdropData.data)
        }
        setLoadingMessage(null)
      } catch (e) {}
    }
    getAllBalance()
  }, [account, chainId, transaction])

  useEffect(() => {
    setClaimAmount(0)
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
                <h4 className="summon-title mb-4">Claim Hero</h4>
                <Form>
                  <Form.Group className="content-area" controlId="summonHero">
                    <div className="claim-input-area">
                      <Form.Label className="label-area d-flex justify-content-end pb-2">
                        {/* <span>
                          {" "}
                          Claimed hero {airdropped}/{maxValueAmount}{" "}
                        </span> */}
                      </Form.Label>
                      <div className="">
                        <InputGroupWithExtras>
                          <InputGroupWithExtras.Text
                            onClick={() => {
                              const value = Number(refInputAmount.current.value)
                              refInputAmount.current.value = value > 0 ? value - 1 : 0
                              setClaimAmount(Number(refInputAmount.current.value))
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
                            max={maxValueAmount - airdropped}
                            //value={refInputAmount.current.value}
                            onChange={() => {
                              if (
                                refInputAmount.current.value >= 0 &&
                                refInputAmount.current.value.indexOf('.') === -1
                              ) {
                                if (isNaN(refInputAmount.current.value)) {
                                  refInputAmount.current.value = 0
                                  setClaimAmount(refInputAmount.current.value)
                                } else {
                                  refInputAmount.current.value =
                                    Number(refInputAmount.current.value || 0) >
                                    maxValueAmount - airdropped
                                      ? maxValueAmount - airdropped
                                      : Number(refInputAmount.current.value || 0)
                                  setClaimAmount(Number(refInputAmount.current.value))
                                }
                              } else {
                                refInputAmount.current.value = 0
                                setClaimAmount(0)
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
                                value < maxValueAmount - airdropped
                                  ? value + 1
                                  : maxValueAmount - airdropped
                              setClaimAmount(Number(refInputAmount.current.value))
                            }}
                            className="input-after amount-border"
                          >
                            <PlusIcon />
                          </InputGroupWithExtras.Text>
                        </InputGroupWithExtras>
                      </div>
                    </div>
                    <div className="w-50">
                      <p>
                        {' '}
                        Claimed hero: {airdropped || 0}/{maxValueAmount || 0}{' '}
                      </p>
                    </div>
                  </Form.Group>
                </Form>
              </div>
              <div className="d-flex justify-content-end stake-end">
                {/* <div className="estimate-fee">
                  <div className="label">Total: </div>
                  <span className="text">
                    {showModal ? 1500 * summonAmount : 0} KABY
                  </span>
                </div> */}

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
                      !!transaction || claimAmount <= 0 || maxValueAmount - airdropped < claimAmount
                        ? 'disable'
                        : ''
                    }
                    onClick={() => {
                      if (
                        !transaction &&
                        claimAmount > 0 &&
                        maxValueAmount - airdropped >= claimAmount
                      )
                        return claimAirdropHeroes()
                    }}
                    variant="info"
                    type="button"
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
                        PENDING...
                      </>
                    ) : (
                      <span>Claim</span>
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

export default ClaimHeroPopup

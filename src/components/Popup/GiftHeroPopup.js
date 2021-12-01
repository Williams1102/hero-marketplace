import { useWeb3React } from '@web3-react/core'
import React, { useState, useRef, useCallback, useContext, useEffect } from 'react'
import { Modal, Form, Button, Row, Col, Spinner } from 'react-bootstrap'
import * as heroService from 'services/contracts/hero'
import './popup.scss'
import InputGroupWithExtras from 'react-bootstrap/esm/InputGroup'
import { TRANSACTION } from 'constant/transactions'
import { toast } from 'react-toastify'
import { NOTIFY } from 'constant'
import ModalContext from 'containers/layout/NewAppLayout'
const GiftPopup = ({ showModal, handleCloseModal, heroId }) => {
  const { account } = useWeb3React()

  const [transaction, setTransaction] = useState(null)
  const ctx = useContext(ModalContext)
  const refInputAmount = useRef(null)

  useEffect(() => {
    ctx.setIsModalOpen(showModal)
  }, [showModal])
  useCallback(() => {
    if (!account) return handleCloseModal()
  }, [account, handleCloseModal])
  const giftHero = async () => {
    try {
      setTransaction(TRANSACTION.GIFT)
      await heroService.giftHeroToAddress(heroId, refInputAmount.current.value)
      setTransaction(null)
      toast.success(NOTIFY.SUCCESS.default)
    } catch (e) {
      setTransaction(null)
      toast.error(NOTIFY.ERROR.default)
    }
  }

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
                <h4>GIFT</h4>
                <Form.Group className="mb-3 " controlId="formBasicEmail">
                  <Form.Label className="label-area my-2">
                    {' '}
                    Transfer your hero to other wallet{' '}
                  </Form.Label>
                  <InputGroupWithExtras>
                    <InputGroupWithExtras.Text className="input-before" />
                    <Form.Control ref={refInputAmount} placeholder="Enter Address" />
                    <InputGroupWithExtras.Text className="input-after" />
                  </InputGroupWithExtras>
                </Form.Group>
              </div>
              <div className="divider-end">
                <div className="d-lg-flex justify-content-end stake-end ">
                  <Button
                    className={transaction && 'disable'}
                    onClick={() => {
                      if (!refInputAmount.current.value) return toast.warn('please input address!')
                      if (!transaction) return giftHero()
                    }}
                    variant="info"
                    type="button"
                  >
                    {transaction === TRANSACTION.GIFT ? (
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
                      <span>TRANSFER</span>
                    )}
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </Modal.Body>
      </div>
    </Modal>
  )
}

export default GiftPopup

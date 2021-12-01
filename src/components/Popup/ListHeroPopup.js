import { useWeb3React } from '@web3-react/core'
import React, { useEffect, useRef, useState, useContext } from 'react'
import { Modal, Form, Button, Row, Col, Spinner } from 'react-bootstrap'
import InputGroupWithExtras from 'react-bootstrap/esm/InputGroup'
import * as heroService from 'services/heroes'
import { getInfoWallet } from 'services/contracts/wallet'
import './popup.scss'
import { TRANSACTION } from 'constant/transactions'
import { toast } from 'react-toastify'
import { NOTIFY } from 'constant'
import ModalContext from 'containers/layout/NewAppLayout'
const ListHeroPopup = ({ showModal, handleCloseModal, heroId, listed }) => {
  const refInputAmount = useRef(null)
  const ctx = useContext(ModalContext)
  const { chainId, account } = useWeb3React()

  const [balanceKaby, setBalanceKaby] = useState(0)
  const [transaction, setTransaction] = useState(null)
  const [amountInput, setAmountInput] = useState(0)

  useEffect(() => {
    ctx.setIsModalOpen(showModal)
  }, [showModal])
  useEffect(() => {
    if (!account || !chainId) return

    const getBalance = async (address) => {
      const { getTokenBalance } = await getInfoWallet()
      const balance = await getTokenBalance(address)
      if (balance.kabyBalance) return setBalanceKaby(balance.kabyBalance)
    }
    getBalance(account)
  }, [chainId, account])

  const sellHeroOnSales = async () => {
    setTransaction(TRANSACTION.LIST)
    const value = amountInput

    const seller = await heroService.addListHeroOnSale(heroId, value)

    setTransaction(null)

    if (seller.success) {
      listed(value)
      toast.success(NOTIFY.SUCCESS.LIST)
      handleCloseModal()
    } else toast.error(NOTIFY.ERROR.default)
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
                <h4>LIST HERO</h4>
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
                        min={1}
                        onChange={() => {
                          refInputAmount.current.value = Number(refInputAmount.current.value) || 0
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
                  <Button
                    onClick={!transaction ? sellHeroOnSales : null}
                    variant="info"
                    type="button"
                    className={(!amountInput || transaction) && 'disable'}
                  >
                    {transaction === TRANSACTION.LIST ? (
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
                        LISTING...
                      </>
                    ) : (
                      <span>LIST</span>
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

export default ListHeroPopup

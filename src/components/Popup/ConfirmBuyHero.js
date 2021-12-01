import { useWeb3React } from '@web3-react/core'
import React, { useEffect, useState, useContext } from 'react'
import { Modal, Form, Button, Row, Col, Spinner } from 'react-bootstrap'
import * as heroService from 'services/heroes'
import * as marketService from 'services/marketplace'
import { getInfoWallet } from 'services/contracts/wallet'
import './popup.scss'
import { TRANSACTION } from 'constant/transactions'
import { toast } from 'react-toastify'
import { NOTIFY } from 'constant'
import ModalContext from 'containers/layout/NewAppLayout'
const ConfirmBuyPopup = ({ showModal, handleCloseModal, heroId, sellerPrice, refresh }) => {
  const { chainId, account } = useWeb3React()
  const ctx = useContext(ModalContext)
  const [transaction, setTransaction] = useState(null)
  const [kabyToken, setKabyToken] = useState(null)

  useEffect(() => {
    const getApprovingKabyToken = async () => {
      const approved = await marketService.getApprovedMarketKabyToken()
      if (approved.success) return setKabyToken(approved.data)
    }
    return getApprovingKabyToken()
  }, [account, chainId])

  const [balanceKaby, setBalanceKaby] = useState(0)
  useEffect(() => {
    ctx.setIsModalOpen(showModal)
  }, [showModal])
  useEffect(() => {
    if (!account || !chainId) return

    const getBalance = async (address) => {
      const { getTokenBalance } = await getInfoWallet()
      const balance = await getTokenBalance(address)
      setBalanceKaby(balance.kabyBalance)
    }
    getBalance(account)
  }, [chainId, account])

  const buyHeroOnSales = async () => {
    if (!sellerPrice) return

    setTransaction(TRANSACTION.BUY)

    const buy = await heroService.buyHeroInListOnSales(heroId, sellerPrice)

    setTransaction(null)
    if (buy.success) {
      toast.success(NOTIFY.SUCCESS.BUY)
      refresh()
      handleCloseModal()
    } else toast.error(NOTIFY.ERROR.default)
  }

  const approveAndUpdateState = async () => {
    setTransaction(TRANSACTION.APPROVE)

    const success = await marketService.approveMarketKabyToken()
    setTransaction(null)

    if (success.success) {
      setKabyToken({
        address: kabyToken.address,
        allowance: Number.MAX_SAFE_INTEGER,
      })
      toast.success(NOTIFY.SUCCESS.APPROVED)
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
                <h4>BUY HERO</h4>
                <Form>
                  <div>
                    <Form.Text>
                      {' '}
                      Are you sure to buy this hero with <b>{sellerPrice} KABY</b>{' '}
                    </Form.Text>
                  </div>
                  <Form.Text>
                    {' '}
                    Current Balance: <b>{balanceKaby} KABY</b>{' '}
                  </Form.Text>
                </Form>
              </div>
              <div className="divider-end">
                {sellerPrice > balanceKaby && (
                  <div className="error">
                    <span>*Not enough balance KABY</span>
                  </div>
                )}
                <div className="d-lg-flex justify-content-end stake-end ">
                  <Button
                    className=""
                    onClick={() => {
                      handleCloseModal()
                    }}
                    variant="danger"
                    type="button"
                  >
                    CANCEL
                  </Button>
                  {!kabyToken?.allowance ? (
                    <Button
                      className={transaction && 'disable'}
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
                      className={(!sellerPrice || transaction) && 'disable'}
                      onClick={!transaction && !!sellerPrice ? buyHeroOnSales : null}
                      variant="info"
                      type="button"
                    >
                      {transaction === TRANSACTION.BUY ? (
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
                        <span>BUY</span>
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

export default ConfirmBuyPopup

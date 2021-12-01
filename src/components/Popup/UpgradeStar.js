import { useWeb3React } from '@web3-react/core'
import React, { useEffect, useState, useContext } from 'react'
import { Modal, Form, Button, Row, Col, Spinner } from 'react-bootstrap'
// import * as heroService from "services/heroes";
import { getInfoWallet } from 'services/contracts/wallet'
import './popup.scss'
import { TRANSACTION } from 'constant/transactions'
import { toast } from 'react-toastify'
import { NOTIFY } from 'constant'
import {
  getAmountUpStar,
  upgradeStarForHero,
  getAllowance,
  approveUpgrade,
} from 'services/contracts/upgradeStar'
import * as heroAPI from 'actions/hero'
import { networkIdAPI } from 'constant/contract'
import LoadingPopup from './Loading'
import ModalContext from 'containers/layout/NewAppLayout'
const UpgradeStarPopup = ({ showModal, handleCloseModal, heroId, heroStar, handleStarUpgrade }) => {
  const { chainId, account } = useWeb3React()
  const [transaction, setTransaction] = useState(null)
  const [upStarPrice, setUpStarPrice] = useState(0)
  const [upgradeDetail, setUpgradeDetail] = useState(null)
  const [allowance, setAllowance] = useState(0)
  const ctx = useContext(ModalContext)
  useEffect(() => {
    ctx.setIsModalOpen(showModal)
  }, [showModal])
  useEffect(() => {
    if (!heroStar || !heroId) return
    const getBalance = async () => {
      const { getTokenBalance } = await getInfoWallet()
      const balance = await getTokenBalance(account)

      setBalanceKaby(Number(balance.kabyBalance) || 0)
      const amount = await getAmountUpStar(heroStar)

      if (amount) setUpStarPrice(amount)
    }
    const requestUpgrade = async () => {
      const networkId = networkIdAPI[chainId]
      const body = {
        networkId,
        heroId,
      }
      const res = await heroAPI.upgradeStar(body)
      if (res.status === 'success') {
        console.log(res.data)
        setUpgradeDetail(res.data)
      } else {
        setUpgradeDetail({})
        toast.error(NOTIFY.ERROR.default)
      }
    }
    requestUpgrade()
    getBalance()
    getAllowance().then((allowance) => {
      setAllowance(allowance)
    })
  }, [account, chainId, heroStar, heroId])

  const upgradeStar = async () => {
    if (upStarPrice > balanceKaby) {
      return
    }
    if (!upgradeDetail?.couldUpgrade) {
      return
    }
    setTransaction(TRANSACTION.UPGRADE)
    const result = await upgradeStarForHero(heroId)
    if (result.success) {
      toast.success(NOTIFY.SUCCESS.default)
      handleStarUpgrade()
      handleCloseModal()
    } else {
      toast.error(NOTIFY.ERROR.default)
      setTransaction(null)
    }
  }

  const approve = async () => {
    setTransaction(TRANSACTION.APPROVE)
    const result = await approveUpgrade()
    if (result.success) {
      toast.success(NOTIFY.SUCCESS.default)
      setAllowance(1e23)
    } else {
      toast.error(NOTIFY.ERROR.default)
    }
    setTransaction(null)
  }

  const [balanceKaby, setBalanceKaby] = useState(0)

  useEffect(() => {
    if (!account || !chainId) return

    const getBalance = async (address) => {
      const { getTokenBalance } = await getInfoWallet()
      const balance = await getTokenBalance(address)
      setBalanceKaby(balance.kabyBalance)
    }
    getBalance(account)
  }, [chainId, account])

  return (
    <>
      {!upgradeDetail && <LoadingPopup showModal={true} />}
      {upgradeDetail && (
        <Modal centered show={showModal} onHide={handleCloseModal} className="modal-chose-wallet">
          <div className="custom-popup">
            <Modal.Header closeButton>
              <Modal.Title> </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col className="d-flex flex-column justify-content-between">
                  <div>
                    <h4 className="upper-case">Upgrade Star</h4>
                    <Form>
                      <div>
                        <Form.Text id="text-upgrade-star-001">
                          Would you like to pay <strong> {upStarPrice} KABY </strong> to upgrade
                          star of your hero?
                          <br />
                          After upgrading to the next star, heroes will increase base stats and
                          unlock new skill levels. Later, you must use skill books to level up the
                          skill.
                        </Form.Text>
                      </div>
                    </Form>
                  </div>
                  <div className="divider-end">
                    {upStarPrice > balanceKaby && (
                      <div className="error">
                        <span>*Not enough balance KABY</span>
                      </div>
                    )}
                    {!upgradeDetail.couldUpgrade && (
                      <div className="error">
                        <span>*Hero hasn't reached max level yet</span>
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
                      {
                        <Button
                          className={
                            (!upgradeDetail?.couldUpgrade || !upStarPrice || transaction) &&
                            'disable'
                          }
                          onClick={() => {
                            if (allowance / 1e18 < upStarPrice) {
                              approve()
                            } else if (upStarPrice <= balanceKaby && !transaction) upgradeStar()
                          }}
                          variant="info"
                          type="button"
                        >
                          {[TRANSACTION.UPGRADE, TRANSACTION.APPROVE].includes(transaction) ? (
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
                            <span>{allowance / 1e18 >= upStarPrice ? 'UPGRADE' : 'APPROVE'}</span>
                          )}
                        </Button>
                      }
                    </div>
                  </div>
                </Col>
              </Row>
            </Modal.Body>
          </div>
        </Modal>
      )}
    </>
  )
}

export default UpgradeStarPopup

import { useWeb3React } from '@web3-react/core'
import React, { useEffect, useState, useContext } from 'react'
import { Modal, Form, Button, Row, Col } from 'react-bootstrap'
import './popup.scss'
import * as marketActions from 'actions/market'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { toast } from 'react-toastify'
import { NOTIFY } from 'constant'
import ModalContext from 'containers/layout/NewAppLayout'
import { selectCurrentUser } from 'redux/user/user.selectors'
const ConfirmBuyItemPopup = ({
  showModal,
  handleCloseModal,
  itemId,
  price,
  quantity,
  owner,
  last,
}) => {
  const { chainId, account } = useWeb3React()
  const user = useSelector(selectCurrentUser)
  const dispatch = useDispatch()
  const history = useHistory()

  const ctx = useContext(ModalContext)
  const buyItem = () =>
    dispatch(
      marketActions.buyItemOffChain({
        itemId: +itemId,
        owner: owner,
        buyer: account,
        quantity: +quantity,
      })
    )
  //console.log(last);
  const buyItemOff = async () => {
    const buy = await buyItem()
    if (buy.status === 'success') {
      toast.success(NOTIFY.SUCCESS.ITEMBUY)
      handleCloseModal()
      //to load the offchain balance on header
      setInterval(function () {
        window.location.reload()
      }, 3000)
      //window.location.reload();
    } else toast.error(NOTIFY.ERROR.default)
    if (last === quantity && buy.status === 'success') {
      history.push(`/app/market/?param=item`)
    }
  }
  useEffect(() => {
    ctx.setIsModalOpen(showModal)
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
                <h4>BUY ITEMS</h4>
                <Form>
                  <div>
                    <Form.Text>
                      Are you sure to buy these items with <b>{price} KGT</b>
                    </Form.Text>
                  </div>
                  <Form.Text>
                    Current Balance: <b>{user?.amount} KGT</b>
                  </Form.Text>
                </Form>
              </div>
              <div className="divider-end">
                {price > user?.amount && (
                  <div className="error">
                    <span>*Not enough balance KGT</span>
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
                  <Button
                    // className="disable"
                    variant="info"
                    type="button"
                    onClick={buyItemOff}
                  >
                    <span>BUY</span>
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

export default ConfirmBuyItemPopup

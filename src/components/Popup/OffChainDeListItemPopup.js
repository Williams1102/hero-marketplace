import { useWeb3React } from '@web3-react/core'
import React, { useContext, useEffect } from 'react'
// import {useEffect, useState} from "react";
import { Modal, Form, Button, Row, Col } from 'react-bootstrap'
import './popup.scss'
import * as marketActions from 'actions/market'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { toast } from 'react-toastify'
import { NOTIFY } from 'constant'
import ModalContext from 'containers/layout/NewAppLayout'
const ConfirmBuyItemPopup = ({ showModal, handleCloseModal, itemId, quantity, params }) => {
  const { account } = useWeb3React()
  //const [balanceKaby, setBalanceKaby] = useState(0);
  const dispatch = useDispatch()
  const history = useHistory()
  const ctx = useContext(ModalContext)
  const deListItem = () =>
    dispatch(
      marketActions.deListItemMarket({
        itemId: +itemId,
        owner: account,
        quantity: +quantity,
      })
    )
  const handleDeListItem = async () => {
    const delist = await deListItem()
    if (delist.status === 'success') {
      toast.success(NOTIFY.SUCCESS.ITEMDELIST)
      handleCloseModal()
      if (params === 'market') {
        history.push(`/app/wallet/?param=item`)
      }
    } else toast.error(NOTIFY.ERROR.DEFAULT)
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
                <h4>DELIST ITEMS</h4>
                <Form>
                  <div>
                    <Form.Text>Are you sure to delist all of these items?</Form.Text>
                  </div>
                </Form>
              </div>
              <div className="divider-end">
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
                    onClick={handleDeListItem}
                  >
                    <span>DELIST</span>
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

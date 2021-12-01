import { useWeb3React } from '@web3-react/core'
import React, { useEffect, useState, useContext } from 'react'
import { Modal, Form, Button, Row, Col } from 'react-bootstrap'
import './popup.scss'
import * as marketActions from 'actions/market'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { NOTIFY } from 'constant'
import ModalContext from 'containers/layout/NewAppLayout'
const ConfirmBuyItemPopup = ({ showModal, handleCloseModal, quantity, itemId, max }) => {
  const { chainId, account } = useWeb3React()

  const ctx = useContext(ModalContext)
  const dispatch = useDispatch()
  const [quantityList, setQuantityList] = useState(0)
  const [price, setPrice] = useState(false)
  const changeValueQuantity = (e) => {
    // console.log(e.target.value);
    setQuantityList(e.target.value)
    if (e.target.value > max) {
      setQuantityList(max)
    }
  }
  const listItem = () =>
    dispatch(
      marketActions.listItemMarket({
        itemId: +itemId,
        owner: account,
        price: +price,
        quantity: +quantityList,
      })
    )

  const handleListItemMarket = async () => {
    const list = await listItem()
    if (list.status === 'success') {
      toast.success(NOTIFY.SUCCESS.ITEMLIST)
      handleCloseModal()
    } else toast.error(NOTIFY.ERROR.DEFAULT)
  }

  const changePrice = (e) => {
    setPrice(e.target.value)
  }

  const handleMaxQuantityList = () => {
    setQuantityList(max)
  }
  useEffect(() => {
    ctx.setIsModalOpen(showModal)
  }, [showModal])
  useEffect(() => {
    if (!account) return
    setQuantityList(quantity)
  }, [chainId, account, quantity])

  return (
    <Modal
      centered
      show={showModal}
      onHide={handleCloseModal}
      className="modal-chose-wallet modal-list-items"
    >
      <div className="custom-popup">
        <Modal.Header closeButton>
          <Modal.Title> </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col className="d-flex flex-column justify-content-between">
              <div>
                <h4>LIST ITEMS</h4>
                <Form>
                  <div>
                    <Form.Text></Form.Text>
                    <div className="list-popup">
                      <div className="list-popup-textprice">Price per unit</div>
                      <div className="list-popup-content">
                        <input
                          onKeyPress={(event) => {
                            if (!/[0-9]/.test(event.key)) {
                              event.preventDefault()
                            }
                          }}
                          className="list-popup-content-input "
                          onChange={(e) => changePrice(e)}
                        ></input>
                        <div className="list-popup-content-money">KGT</div>
                      </div>
                      <div className="list-popup-content1">
                        <div className="list-popup-content1-left">
                          <input
                            className="list-popup-content1-left-input"
                            onKeyPress={(event) => {
                              if (!/[0-9]/.test(event.key)) {
                                event.preventDefault()
                              }
                            }}
                            type="number"
                            onChange={(e) => changeValueQuantity(e)}
                            value={quantityList}
                          ></input>
                          <Button
                            className="list-popup-content1-left-max"
                            onClick={() => handleMaxQuantityList(max)}
                          >
                            MAX
                          </Button>
                        </div>
                        <div className="list-popup-content1-right">{max} items available</div>
                      </div>
                    </div>
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
                    className={quantityList === 0 && 'disable'}
                    variant="info"
                    type="button"
                    onClick={quantityList > 0 ? handleListItemMarket : null}
                  >
                    <span>LIST</span>
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

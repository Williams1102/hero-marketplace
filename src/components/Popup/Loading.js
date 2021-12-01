import React, { useContext, useEffect } from 'react'
import { Modal, Row, Col, Spinner } from 'react-bootstrap'
import './popup.scss'
import ModalContext from 'containers/layout/NewAppLayout'
const LoadingPopup = ({ showModal }) => {
  const ctx = useContext(ModalContext)
  useEffect(() => {
    ctx.setIsModalOpen(showModal)
  }, [showModal])
  return (
    <Modal
      centered
      show={showModal}
      backdrop="static"
      keyboard={false}
      className="modal-chose-wallet"
    >
      <div className="custom-popup">
        <Modal.Header>
          <Modal.Title> </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col className="d-flex justify-content-center">
              <div>
                <Spinner
                  as="div"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  variant="light"
                  className="spinner-loading"
                />
              </div>
              <div>Loading...</div>
            </Col>
          </Row>
        </Modal.Body>
      </div>
    </Modal>
  )
}

export default LoadingPopup

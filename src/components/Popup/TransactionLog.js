import React, { useContext, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Modal } from 'react-bootstrap'
import './popup.scss'
import WalletBackGround from 'assets/image/wallet-background.png'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import Moment from 'react-moment'
import { explorer } from 'constant/explorer'
import ModalContext from 'containers/layout/NewAppLayout'
const TransactionLog = ({ showModal, handleCloseModal, tx }) => {
  const ctx = useContext(ModalContext)
  const { chainId } = useWeb3React()
  const transactionExplorer = (id) => {
    return `${explorer[chainId]}/tx/${id}`
  }
  console.log(tx)
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
          <div className=" transaction-log">
            <h1> {tx?.transactionType} transaction</h1>
            <div className="image-log">
              <img src={WalletBackGround} alt="wallet bg" />
            </div>
            <div className="transaction-status">
              <h6>
                Transaction {tx?.status.toLowerCase() === 'success' ? 'Succeeded' : 'Failed'}{' '}
              </h6>
              <div>
                {' '}
                {tx?.transactionType.toLowerCase() === 'deposit' ? '+' : '-'} {tx?.amountReceived}{' '}
                KGT{' '}
              </div>
            </div>
            <div className="transaction-info">
              <ul>
                <li>
                  <h6>Sender</h6>
                  <CopyToClipboard text={tx?.fromAddress}>
                    <p>
                      {`${tx?.fromAddress.substring(0, 8)}...${tx?.fromAddress.substring(
                        tx?.fromAddress.length - 4
                      )}`}
                    </p>
                  </CopyToClipboard>
                </li>
                <li>
                  <h6>Recipient </h6>
                  <CopyToClipboard text={tx?.toAddress}>
                    <p>
                      {`${tx?.toAddress.substring(0, 8)}...${tx?.toAddress.substring(
                        tx?.toAddress.length - 4
                      )}`}{' '}
                    </p>
                  </CopyToClipboard>
                </li>
                <li>
                  <h6>Time</h6>
                  <p>
                    <Moment format="YYYY-MM-DD h:mm:ss">
                      {new Date(tx?.timestamp || Date.now()).toString()}
                    </Moment>
                  </p>
                </li>
                <li>
                  <h6> Transaction ID </h6>
                  <CopyToClipboard text={tx?.tx}>
                    <a href={transactionExplorer(tx?.tx)} target="_blank" rel="noreferrer">
                      {`${tx?.tx.substring(0, 8)}...${tx?.tx.substring(tx?.tx.length - 4)}`}
                    </a>
                  </CopyToClipboard>
                </li>
                {/* {tx?.transactionType.toLowerCase() === "withdraw" && (
                  <li>
                    <h6>Transaction Fee</h6>
                    <p> {tx?.fee || 0} </p>
                  </li>
                )} */}
              </ul>
            </div>
          </div>
          <div className="divider-end"></div>
        </Modal.Body>
      </div>
    </Modal>
  )
}

export default TransactionLog

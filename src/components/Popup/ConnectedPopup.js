import React, { useEffect, useContext } from 'react'
import { Modal } from 'react-bootstrap'
import IconMetamask from 'assets/css/metamask.svg'
import WalletConnect from 'images/walletconnect.png'
import { injected, setWallet, getWalletConnectProvider, walletSupported } from 'constant/connector'
import './popup.scss'
import { useWeb3React } from '@web3-react/core'
import { getErrorMessage } from 'constant/connector'
import { toast } from 'react-toastify'
import ModalContext from 'containers/layout/NewAppLayout'
const ConnectedPopup = ({ showModalWallet, handleCloseModalWallet, isFromHeroDetail }) => {
  const { activate, error, deactivate } = useWeb3React()
  const ctx = useContext(ModalContext)
  const handleConnect = (injected, walletType) => {
    try {
      setWallet(walletType)
      activate(injected).then((res) => {
        return handleCloseModalWallet()
      })
    } catch (e) {}
  }
  const handleMetamask = () => {
    handleConnect(injected, walletSupported.metamask)
  }
  const handleWalletconnect = async () => {
    const walletconnect = getWalletConnectProvider()
    handleConnect(walletconnect, walletSupported.walletconnect)
  }

  useEffect(() => {
    if (isFromHeroDetail) {
      ctx.setIsModalOpen(showModalWallet)
    } else {
      return
    }
  }, [showModalWallet])
  useEffect(() => {
    if (error) {
      deactivate()
      return toast.warn(getErrorMessage(error))
    }
  }, [error, deactivate])

  return (
    <Modal
      centered
      show={showModalWallet}
      onHide={handleCloseModalWallet}
      className="modal-connect-wallet"
    >
      <div className="connected-popup">
        <div className="ant-modal-header">
          <Modal.Header closeButton>
            <Modal.Title>Connect to a wallet</Modal.Title>
          </Modal.Header>
        </div>
        <Modal.Body>
          <div className="centered">
            <button onClick={handleMetamask} type="button" className="connected-btn">
              <div className="metamask-icon">
                <img width="24" height="24" src={IconMetamask} alt="" />
              </div>
              <div className="wallet-name">MetaMask</div>
            </button>
            <button onClick={handleWalletconnect} type="button" className="connected-btn">
              <div className="metamask-icon">
                <img width="40" height="24" src={WalletConnect} alt="" />
              </div>
              <div className="wallet-name">WalletConnect</div>
            </button>
          </div>
          {/* {error && <div className='error'>{getErrorMessage(error)}</div>} */}
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </div>
    </Modal>
  )
}

export default ConnectedPopup

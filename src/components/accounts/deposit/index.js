import { systemDepositWallet, systemDepositWalletProduction } from 'constant/contract/usersSystem'
import QrCode from 'qrcode.react'
import React, { useState } from 'react'
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { CopyToClipboard } from 'react-copy-to-clipboard'
// import { networkType } from "..";
const Deposit = ({ network, setNetwork }) => {
  const [copyMessage, setCopyMessage] = useState({
    copied: false,
    message: '',
  })
  const { REACT_APP_ENVIRONMENT } = process.env
  console.log(REACT_APP_ENVIRONMENT)
  return (
    <div className="column-flex-center ">
      <div className="column-flex-center ">
        {/* <h1 className="wallet-action-title" id="title-quick-deposit">
          quick deposit
        </h1> */}
        {/* <div className="network">
          <Button
            onClick={() => setNetwork(networkType.bsc)}
            className={
              network === networkType.bsc
                ? "color-btn wallet-action-btn"
                : "wallet-action-btn"
            }
          >
            BSC
          </Button>
          <Button
            onClick={() => setNetwork(networkType.polygon)}
            className={
              network === networkType.polygon
                ? "color-btn wallet-action-btn"
                : "wallet-action-btn"
            }
          >
            polygon
          </Button>
        </div> */}
      </div>
      <div className="system-address">
        <QrCode
          size={200}
          value={
            REACT_APP_ENVIRONMENT === 'development'
              ? systemDepositWallet
              : systemDepositWalletProduction
          }
        />
        <div className="text-address column-flex-center">
          <h6>
            {REACT_APP_ENVIRONMENT === 'development'
              ? systemDepositWallet
              : systemDepositWalletProduction}
          </h6>
          <p>
            Note: Address only accepts <strong>KGT</strong>{' '}
          </p>
          <OverlayTrigger
            key={'top'}
            placement={'top'}
            overlay={<Tooltip id={`tooltip-${'top'}`}>{copyMessage.message}</Tooltip>}
          >
            <CopyToClipboard
              onCopy={() => setCopyMessage({ copied: true, message: 'copied' })}
              text={
                REACT_APP_ENVIRONMENT === 'development'
                  ? systemDepositWallet
                  : systemDepositWalletProduction
              }
            >
              <Button className="wallet-action-btn color-btn mt-4">copy address</Button>
            </CopyToClipboard>
          </OverlayTrigger>
        </div>
      </div>
    </div>
  )
}

export default Deposit

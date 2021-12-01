import React from 'react'
import WalletPage from 'components/wallet-new-design/WalletPage.js'
const WalletContainer = (props) => {
  const query = new URLSearchParams(props.location.search)
  const param = query.get('param') || 'hero'
  console.log(param)
  return (
    <>
      <WalletPage param={param} />
    </>
  )
}
export default WalletContainer

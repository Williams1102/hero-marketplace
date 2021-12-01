import React from 'react'
import Header from './Header'

const MarketLayout = (props) => {
  const { children, ...rest } = props

  return (
    <div className="content-app">
      <Header {...rest} />
      <div className="layout-content">{props.children}</div>
      {/* <Footer />˝ */}
    </div>
  )
}

export default MarketLayout

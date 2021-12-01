import React from 'react'
import HeaderNew from './LandingPageHeader'
import FooterNew from './LandingPageFooter'
import LeftToolBar from './LeftToolBar'

const Layout = (props) => {
  const { children, ...rest } = props

  return (
    <div className="content-app">
      <HeaderNew {...rest} path={props?.location?.pathname} />
      <div className="layout-content">{props.children}</div>
      <LeftToolBar />
      <FooterNew />
    </div>
  )
}

export default Layout

import React from 'react'
import MarketPage from 'components/market-new-design/MarketPage'

const MarketPageContainer = (props) => {
  const query = new URLSearchParams(props.location.search)
  const param = query.get('param') || 'hero'

  return (
    <>
      <MarketPage param={param} />
    </>
  )
}
export default MarketPageContainer

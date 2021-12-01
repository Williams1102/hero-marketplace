import React from 'react'
//import HeroDetail from "components/hero-detail/HeroDetail";
import ItemDetail from 'components/item-detail/ItemDetail'

const ItemDetailContainer = (props) => {
  return (
    <>
      <ItemDetail
        id={props.match.params.id}
        networkId={props.match.params.networdId}
        param={props.match.params.param}
      />
    </>
  )
}

export default ItemDetailContainer

import React from 'react'
//import HeroDetail from "components/hero-detail/HeroDetail";
import HeroDetail from 'components/hero-detail/HeroDetailNewUI'

const HeroDetailContainer = (props) => {
  //console.log(props.match);
  return (
    <>
      <HeroDetail id={props.match.params.id} networkId={props.match.params.networdId} />
    </>
  )
}

export default HeroDetailContainer

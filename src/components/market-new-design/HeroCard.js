import React from 'react'
import './heroCard.scss'
import IdContainer from 'assets/image/Rectangle 42.png'
import Water from 'assets/image/water-icon.png'
import Fire from 'assets/image/fire-icon.png'
import Dark from 'assets/image/dark-icon.png'
import FireBG from 'assets/image/fire_bg.png'
import WindBG from 'assets/image/wind_bg.png'
import WaterBG from 'assets/image/water_bg.png'
import DarkBG from 'assets/image/dark_bg.png'
import LightBG from 'assets/image/light_bg.png'
import Light from 'assets/image/light-icon.png'
import Wind from 'assets/image/wind-icon.png'
import Attack from 'assets/image/attack-item.png'
import Defense from 'assets/image/defense-item.png'
import Support from 'assets/image/speed-item.png'
import HP from 'assets/image/HP-item.png'
import HeroCardBackground from 'assets/image/hero-card-background.png'
import GenesisBG from 'assets/image/card_bg_genesis.png'
import ExodusBG from 'assets/image/card_bg_exodus.png'
import { useHistory } from 'react-router'
const NewHeroCard = (props) => {
  const getBGByGen = (gens) => {
    switch (gens) {
      case 1:
        return GenesisBG
      case 2:
        return ExodusBG
      default:
        return HeroCardBackground
    }
  }
  const background = {
    Fire: FireBG,
    Wind: WindBG,
    Light: LightBG,
    Dark: DarkBG,
    Water: WaterBG,
  }
  const type = {
    Attack: Attack,
    Defense: Defense,
    Support: Support,
    Dark: HP,
    Hp: HP,
  }
  const element = {
    Fire: Fire,
    Wind: Wind,
    Light: Light,
    Dark: Dark,
    Water: Water,
  }
  const history = useHistory()
  return (
    <div
      onClick={() =>
        props.gens === -1 ? null : history.push(`/app/hero/${props.networkId}/${props.heroId}`)
      }
      className="new-hero-card"
    >
      <img alt="#" className="new-hero-card-background" src={getBGByGen(props.gens)}></img>
      <img alt="#" className="new-hero-card-id-container" src={IdContainer}></img>
      <span className="new-hero-card-levelreal">Level: {props.level}</span>
      <span className="new-hero-card-id">#{props.heroId}</span>
      <span className="new-hero-card-level">{props.star}</span>
      <img
        alt="#"
        src={background[props.element]}
        className="new-hero-card-element-background"
      ></img>
      <img alt="#" src={props.image} className="new-hero-card-hero-image"></img>
      <div className="new-hero-card-name">
        <span>{props.name}</span>
      </div>

      {props.gens === -1 ? null : (
        <img className="new-hero-card-element" alt="#" src={element[props.element]}></img>
      )}
      {props.gens === -1 ? null : (
        <img className="new-hero-card-type" alt="#" src={type[props.type]}></img>
      )}
      {/* <img alt="#" src={Fire} className="new-hero-card-element"></img> */}
      {/* <img alt="#" src={Attack} className="new-hero-card-type"></img> */}
      {props.gens === -1 ? null : (
        <span className="new-hero-card-price">
          {props.price > 999 ? props.price.toLocaleString() : props.price} POLY
        </span>
      )}
      {/* <div className="new-hero-card-skill">
        {props.skills.map((skillIamge, index) => (
          <img key={`skillId:${index}`} alt="#" src={skillIamge}></img>
        ))}
      </div> */}
    </div>
  )
}
export default NewHeroCard

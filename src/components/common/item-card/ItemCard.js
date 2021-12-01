import React from 'react'
import './itemCard.scss'
// import itemCardBG from "assets/image/item-card-background.png";
// import IdContainer from "assets/image/Rectangle 42.png";
// import Water from "assets/image/water-icon.png";
// import Fire from "assets/image/fire-icon.png";
// import Dark from "assets/image/dark-icon.png";
// import FireBG from "assets/image/fire_bg.png";
// import WindBG from "assets/image/wind_bg.png";
// import WaterBG from "assets/image/water_bg.png";
// import DarkBG from "assets/image/dark_bg.png";
// import LightBG from "assets/image/light_bg.png";
// import Light from "assets/image/light-icon.png";
// import Wind from "assets/image/wind-icon.png";
// import Attack from "assets/image/attack-item.png";
// import Defense from "assets/image/defense-item.png";
// import Support from "assets/image/speed-item.png";
// import HP from "assets/image/HP-item.png";
import TransparentBG from 'assets/image/transparent-background.png'
import KGToffchaincoin from 'assets/image/KGToffchaincoin.png'
// import testitemImage from "assets/image/item_1_0.png";
// import skilltest from "assets/css/item-skill1.png";
// import ItemCardBackground from "assets/image/item-card-background.png";
// import GenesisBG from "assets/image/card_bg_genesis.png";
// import ExodusBG from "assets/image/card_bg_exodus.png";
// import KabyCoinIcon from "assets/image/kabycoinicon.png";
import { useHistory } from 'react-router'
const NewitemCard = (props) => {
  // console.log(props.itemId);
  // console.log(props.param);
  // const getBGByGen = (gens) => {
  //   switch (gens) {
  //     case 1:
  //       return GenesisBG;
  //     case 2:
  //       return ExodusBG;
  //     default:
  //       return ItemCardBackground;
  //   }
  // };
  // const background = {
  //   Fire: FireBG,
  //   Wind: WindBG,
  //   Light: LightBG,
  //   Dark: DarkBG,
  //   Water: WaterBG,
  // };
  // const type = {
  //   Attack: Attack,
  //   Defense: Defense,
  //   Support: Support,
  //   Dark: HP,
  //   Hp: HP,
  // };
  // const element = {
  //   Fire: Fire,
  //   Wind: Wind,
  //   Light: Light,
  //   Dark: Dark,
  //   Water: Water,
  // };
  const history = useHistory()
  return (
    <div
      onClick={() => history.push(`/app/item/${props.itemId}/${props.param}`)}
      // onClick={() => history.push(`/app/maintain`)}
      className="new-item-card"
    >
      <img alt="#" className="new-item-card-background" src={TransparentBG}></img>
      {/* <img
        alt="#"
        className="new-item-card-id-container"
        src={IdContainer}
      ></img>
      <span className="new-item-card-id">#{props.itemId}</span> */}
      {/* <span className="new-item-card-level">{props.star}</span> */}
      {/* <img
        alt="#"
        src={background[props.element]}
        className="new-item-card-element-background"
      ></img> */}
      <img alt="#" src={props.image} className="new-item-card-item-image"></img>
      <div className="new-item-card-name">
        <span>{props.name}</span>
      </div>

      {/* {props.gens === -1 ? null : (
        <img
          className="new-item-card-element"
          alt="#"
          src={element[props.element]}
        ></img>
      )}
      {props.gens === -1 ? null : (
        <img
          className="new-item-card-type"
          alt="#"
          src={type[props.type]}
        ></img>
      )} */}
      {/* <img alt="#" src={Fire} className="new-item-card-element"></img> */}
      {/* <img alt="#" src={Attack} className="new-item-card-type"></img> */}
      {props.param === 'market' && (
        <div className="new-item-card-price">
          {props.price}
          <img src={KGToffchaincoin} alt="#"></img>
        </div>
      )}

      <div className="new-item-card-quantity">Quantity: {props.quantity}</div>

      {/* <div className="new-item-card-skill">
        {props.skills.map((skillIamge, index) => (
          <img key={`skillId:${index}`} alt="#" src={skillIamge}></img>
        ))}
      </div> */}
    </div>
  )
}
export default NewitemCard

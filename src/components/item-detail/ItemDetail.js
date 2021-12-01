import React, { useEffect, useState } from 'react'
import './itemdetail.scss'
import * as marketActions from 'actions/market'
import { useDispatch, useSelector } from 'react-redux'
import { useWeb3React } from '@web3-react/core'
import { Button } from 'react-bootstrap'
import { useHistory } from 'react-router'
import { TRANSACTION } from 'constant/transactions'
import ConfirmBuyItemPopup from 'components/Popup/OffChainBuyItemPopup'
import ConfirmListItemPopup from 'components/Popup/OffChainListItemPopup'
import ConfirmDeListItemPopup from 'components/Popup/OffChainDeListItemPopup'
import ConnectedPopup from 'components/Popup/ConnectedPopup'
import backIcon from 'images/herodetail/backIcon.svg'
import itemBG2 from 'images/item-detail/itemBG2.png'
import { ReactComponent as Line } from 'images/item-detail/longLine.svg'
import KGToffchaincoin from 'images/item-detail/KGTlogo.png'
import { selectCurrentUser } from 'redux/user/user.selectors'

const ItemDetail = (props) => {
  const { account } = useWeb3React()
  const user = useSelector(selectCurrentUser)
  const [popup, setPopup] = useState(null)
  const dispatch1 = useDispatch()
  const history = useHistory()
  const [refresh, setRefresh] = useState(false)
  const [itemMarketOwned, setItemMarketOwned] = useState(false)
  const [itemLast, setItemLast] = useState(false)
  const [itemDetail, setItemDetail] = useState({
    createdDate: '',
    description: '',
    element: '',
    id: '',
    image: '',
    itemId: '',
    locked: '',
    name: '',
    owner: '',
    price: '',
    quantity: '',
  })
  const [itemIdMarket, setItemIdMarket] = useState(0)
  const [quantity, setQuantity] = useState(0)
  const [lockQuantity, setLockQuantity] = useState(0)
  const [openQuantity, setOpenQuantity] = useState(0)
  const showOffPopup = () => {
    setPopup(null)
    setRefresh(!refresh)
  }

  useEffect(() => {
    // if (!account) return;
    if (props.param === 'market') {
      const fetchItemDetail = () =>
        dispatch1(
          marketActions.fetchItemDetail({
            id: props.id,
          })
        )
      const fetchDataItemDetailMarket = async () => {
        const result = await fetchItemDetail()
        // console.log(account);
        // console.log(result.data);
        if (result && result.status === 'success') {
          if (account !== result.data.owner) {
            setItemDetail(result.data)
            setItemLast(result.data.quantity)
          } else {
            //console.log("same owner");
            setItemMarketOwned(true)
            setItemDetail(result.data)
            setItemIdMarket(result.data.itemId)
            setLockQuantity(result.data.quantity)
          }
        }
      }
      fetchDataItemDetailMarket()
    }
  }, [dispatch1, props.id, refresh, account, props.param])
  useEffect(() => {
    if (props.param === 'wallet' && user) {
      const fetchItemDetailWallet = () =>
        dispatch1(
          marketActions.fetchItemDetailWallet({
            id: props.id,
            account: user.address,
          })
        )
      const fetchDataItemDetailWallet = async () => {
        const result = await fetchItemDetailWallet()
        if (result && result.status === 'success') {
          setItemDetail(result.data)
          setItemIdMarket(result?.data?.itemId)
          setLockQuantity(result?.data?.lockQuantity)
          setOpenQuantity(result?.data?.quantity)
        }
        // console.log(result.data);
        // console.log(itemDetail.quantity);
        // console.log(lockQuantity);
      }
      fetchDataItemDetailWallet()
    }
  }, [dispatch1, props.id, refresh, props.param, user])

  const listItemOffChain = () => {
    setPopup(TRANSACTION.LISTITEM)
  }

  const deListItemOffChain = () => {
    setPopup(TRANSACTION.DELISTITEM)
  }

  const getMaxQuantity = () => {
    setQuantity(itemDetail.quantity)
  }

  const changeValueQuantity = (e) => {
    setQuantity(e.target.value)
    if (e.target.value > itemDetail.quantity) {
      setQuantity(itemDetail.quantity)
    }
  }
  return (
    <>
      {account ? (
        <>
          <ConfirmBuyItemPopup
            showModal={popup === TRANSACTION.BUYITEM}
            handleCloseModal={() => {
              showOffPopup()
            }}
            itemId={itemDetail.itemId}
            price={itemDetail.price * quantity}
            quantity={quantity}
            owner={itemDetail.owner}
            last={itemLast}
          />
          <ConfirmListItemPopup
            showModal={popup === TRANSACTION.LISTITEM}
            handleCloseModal={() => {
              showOffPopup()
            }}
            quantity={quantity}
            itemId={itemIdMarket}
            max={itemDetail.quantity}
          />
          <ConfirmDeListItemPopup
            showModal={popup === TRANSACTION.DELISTITEM}
            handleCloseModal={() => {
              showOffPopup()
            }}
            quantity={lockQuantity}
            itemId={itemIdMarket}
            params={props.param}
          />
        </>
      ) : (
        !!popup && (
          <>
            <ConnectedPopup showModalWallet={!!popup} handleCloseModalWallet={showOffPopup} />
          </>
        )
      )}
      <div className="head-bg"></div>
      <div className="head-bg-layer"></div>
      <div className="item-detail-bg"></div>
      <div className="item-detail-bg-rock"></div>
      <div className="item-detail-container">
        <div className="item-detail-info-container">
          <div className="item-detail-info">
            <div className="item-detail-pic">
              <Button onClick={history.goBack} className="hero-detail-button-back">
                <img src={backIcon} alt="back" />
                <span className="btn-back">BACK</span>
              </Button>
              <div className="item-detail-image">
                <div className="item-detail-image-container">
                  <img
                    alt="bg"
                    style={{ position: 'unset' }}
                    src={itemBG2}
                    className="item-bg"
                  ></img>
                  <img alt="item" className="item-img" src={itemDetail.image}></img>
                </div>
              </div>
            </div>

            <div className="item-detail-stat">
              <h2 className="item-name">{itemDetail.name}</h2>
              <div className="item-detail-info-right">
                <div className="font-face-ac text-right">OWNER</div>
                <div className="ownertext text-right">
                  <span> {itemDetail.owner}</span>
                  {/* {`${itemDetail.owner.substring(
                    0,
                    8,
                  )}...${itemDetail.owner.substring(
                    itemDetail.owner.length - 4,
                  )}`} */}
                </div>
              </div>
              <Line className="item-owner-underline" />
              <div className="item-price-title">
                {/* <div className="word1">P</div>
                <div className="word2">r</div>
                <div className="word3">i</div>
                <div className="word4">c</div>
                <div className="word5">e</div> */}
                {/* <img src={priceIMG} alt="price" className="titleImage" /> */}
                PRICE
              </div>
              <div className="item-price-content">
                <div className="item-price-content-child">
                  <div className="item-price-content-child-value">{itemDetail.price}</div>
                  <div className="item-price-content-child-icon">
                    <img src={KGToffchaincoin} alt="coin" className="icon-coin" />
                  </div>
                </div>
              </div>
              <div className="item-quantity-title">QUANTITY</div>
              {account === itemDetail.owner && (
                <div className="item-quantity-listed">
                  {lockQuantity + openQuantity} items ({lockQuantity} listed)
                </div>
              )}
              {account !== itemDetail.owner && (
                <div className="item-quantity-content">
                  <div className="item-quantity-content-max">
                    <input
                      onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault()
                        }
                      }}
                      type="number"
                      onChange={(e) => changeValueQuantity(e)}
                      value={quantity}
                      className="item-quantity-content-max-input"
                    ></input>
                    <Button className="item-quantity-content-max-button" onClick={getMaxQuantity}>
                      MAX
                    </Button>
                  </div>
                  {itemDetail.quantity && (
                    <div className="item-quantity-content-available">
                      {itemDetail.quantity} items available
                    </div>
                  )}
                </div>
              )}

              <div className="item-description-title">
                {/* <img
                  src={descriptionIMG}
                  alt="description"
                  className="item-description-title-img"
                ></img> */}
                DESCRIPTION
              </div>
              <div className="item-description-title-small">
                {/* <img
                  src={descriptionIMG}
                  alt="description"
                  className="item-description-title-img"
                ></img> */}
                {/* Used to upgrade 1 skill hero */}
                {itemDetail.description}
              </div>
              {/* <div className="item-description-content">
                {itemDetail.description}
              </div> */}
              <div className="owner-btn d-flex">
                {itemDetail.owner !== account ? (
                  <button
                    className="action-btn"
                    // onClick={() => {
                    //   setPopup(TRANSACTION.BUY);
                    // }}
                    onClick={() => {
                      setPopup(TRANSACTION.BUYITEM)
                    }}
                  >
                    BUY
                  </button>
                ) : lockQuantity === 0 && !itemMarketOwned ? (
                  <button className="action-btn" onClick={listItemOffChain}>
                    LIST
                  </button>
                ) : (
                  <button className="action-btn" onClick={deListItemOffChain}>
                    DELIST
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default ItemDetail

import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentUser } from 'redux/user/user.selectors'
import './walletpage.scss'
import BackGroundPicture from 'assets/image/background2.png'
import GroupKaby from 'assets/image/wallet-hero-BG.png'
import YourWalletBadge from 'assets/image/your-wallet-badge.png'
import ItemBackGroundWallPaper from 'assets/image/market-item-newBG.png'
import Water from 'assets/image/water-icon.png'
import Fire from 'assets/image/fire-icon.png'
import Dark from 'assets/image/dark-icon.png'
import Light from 'assets/image/light-icon.png'
import Wind from 'assets/image/wind-icon.png'
import Attack from 'assets/image/attack-item.png'
import Defense from 'assets/image/defense-item.png'
import Support from 'assets/image/speed-item.png'
import HP from 'assets/image/HP-item.png'
import EnergyPotion from 'assets/image/energypotion.png'
import ExpBook from 'assets/image/expbook.png'
import HeroTicket from 'assets/image/heroticket.png'
import SkillBook from 'assets/image/skillbook.png'
import StarShard from 'assets/image/starshard.png'
import TalentBook from 'assets/image/talentbook.png'
import Treasure from 'assets/image/Icon_treasure.png'
import { ReactComponent as SearchIcon } from '../../assets/css/search-icon.svg'
import HeroCard from './HeroCard'
import ItemCard from '../common/item-card/ItemCard'
import { useWeb3React } from '@web3-react/core'
import * as marketActions from 'actions/market'
import { networkIdAPI } from 'constant/contract'
import Storage from 'utilities/storage'

const WalletPage = (props) => {
  const [isMobile, setIsMobile] = useState(false)
  const handleResize = () => {
    if (window.innerWidth <= 500) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }
  }
  window.addEventListener('resize', handleResize)
  // if (props.param === "item") {
  //   history.push("/app/maintain");
  // }
  const { chainId, account } = useWeb3React()
  const user = useSelector(selectCurrentUser)
  const pageStatusTmp = Storage.get('pageStatus')
  const isDashboardExpandedTmp = Storage.get('isDashboardExpanded')
  const element = [
    { text: 'Water', image: Water, value: 'water' },
    { text: 'Fire', image: Fire, value: 'fire' },
    { text: 'Dark', image: Dark, value: 'dark' },
    { text: 'Light', image: Light, value: 'light' },
    { text: 'Wind', image: Wind, value: 'wind' },
  ]
  const elementItem = [
    { text: 'Exp Book', image: ExpBook, value: 'exp_book' },
    {
      text: 'PvE Energy Potion',
      image: EnergyPotion,
      value: 'pve_energy_potion',
    },
    { text: 'Star shard', image: StarShard, value: 'star_shard' },
    { text: 'Skill book', image: SkillBook, value: 'skill_book' },
    {
      text: 'Reroll Skill Book',
      image: TalentBook,
      value: 'skill_reroll_scroll',
    },
    {
      text: 'Treasure Box',
      image: Treasure,
      value: 'treasure_chest',
    },
    {
      text: 'Non-NFT Hero ticket',
      image: HeroTicket,
      value: 'non_nft_hero_ticket',
    },
  ]
  const type = [
    { text: 'Attack', image: Attack, value: 'attack' },
    { text: 'Defense', image: Defense, value: 'defense' },
    { text: 'Support', image: Support, value: 'support' },
    { text: 'HP', image: HP, value: 'hp' },
  ]
  const selectOptions = [
    { text: 'Lowest Id', value: 2 },
    { text: 'Highest Id', value: 3 },
    { text: 'Lowest Price', value: 1 },
    { text: 'Highest Price', value: 0 },
    { text: 'Lowest Level', value: 4 },
    { text: 'Highest Level', value: 5 },
  ]
  const selectOptionsItem = [
    { text: 'Lowest Price', value: 1 },
    { text: 'Highest Price', value: 0 },
  ]
  const filterTemplateObject = {
    elements: '',
    types: '',
    search: '',
    sortBy: 1,
    account: account,
    pageSize: 9,
    pageNumber: 1,
    networkId: 1,
    star: '1,9',
  }
  const filterTemplateObjectItem = {
    elements: '',
    search: '',
    sortBy: 1,
    account: account,
    pageSize: 12,
    pageNumber: 1,
  }
  let dashboardInlineStyle = {
    marginTop: props.param === 'item' ? '98px' : '0px',
    borderRadius: props.param === 'item' ? '24px' : '0px',
  }
  let badgeIlineStyle = {
    marginTop: props.param === 'item' ? '-10.5vw' : '-3.3vw',
    marginBottom: props.param === 'item' ? '1.5vw' : '6.5vw',
  }
  let checkBoxGridStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridColumnsGap: '10vw',
  }
  let checkBoxArray = []
  for (let index = 0; index < 9; index++) {
    checkBoxArray.push(false)
  }
  let checkBoxArrayItem = []
  for (let index = 0; index < 7; index++) {
    checkBoxArrayItem.push(false)
  }
  const handleSlider1 = (e) => {
    const position = +e.target.value
    setSlider1(position)
    setFilter({
      ...filter,
      star: `${Math.floor(Math.min(position, slider2) / 12.5 + 1)},${Math.floor(
        Math.max(position, slider2) / 12.5 + 1
      )}`,
    })
    setPage(1)
  }
  const handleSlider2 = (e) => {
    const position = +e.target.value
    setSlider2(position)
    setFilter({
      ...filter,
      star: `${Math.floor(Math.min(slider1, position) / 12.5 + 1)},${Math.floor(
        Math.max(slider1, position) / 12.5 + 1
      )}`,
    })
    setPage(1)
  }
  const setPaginationArray = (totalPage, currentPage) => {
    if (totalPage === 0) {
      return []
    }
    let tmp = [
      {
        value: 1,
        active: false,
      },
      {
        value: 2,
        active: false,
      },
      {
        value: 3,
        active: false,
      },
      {
        value: 4,
        active: false,
      },
      {
        value: 5,
        active: false,
      },
      {
        value: 6,
        active: false,
      },
      {
        value: 7,
        active: false,
      },
    ]
    if (totalPage <= 7) {
      tmp = tmp.slice(0, +totalPage)
      if (tmp[currentPage - 1]) {
        tmp[currentPage - 1].active = true
      } else {
        tmp[0].active = true
      }
      return tmp
    }
    if (+currentPage < 5) {
      tmp[currentPage - 1].active = true
      tmp[5].value = '...'
      tmp[6].value = totalPage
      return tmp
    }
    if (+currentPage + 4 > +totalPage) {
      tmp[1].value = '...'
      tmp[6].value = totalPage
      tmp[5].value = +totalPage - 1
      tmp[4].value = +totalPage - 2
      tmp[3].value = +totalPage - 3
      tmp[2].value = +totalPage - 4
      if (tmp[6 - totalPage + currentPage]) {
        tmp[6 - totalPage + currentPage].active = true
      } else {
        tmp[0].active = true
      }
      return tmp
    }
    tmp[1].value = '...'
    tmp[2].value = +currentPage - 1
    tmp[3].value = currentPage
    tmp[4].value = +currentPage + 1
    tmp[5].value = '...'
    tmp[6].value = totalPage
    tmp[3].active = true
    return tmp
  }
  const handleSearch = (e) => {
    const keycode = e.keyCode
    const keyCodeArray = [69, 231, 187, 189, 190]
    if (keyCodeArray.includes(keycode)) {
      e.preventDefault()
    }
    console.log(keycode)
  }
  const handleSearchInput = (e) => {
    if (props.param === 'hero') {
      setHeroId(e.target.value)
    } else {
      setItemId(e.target.value)
    }
  }
  const [totalPage, setTotalPage] = useState(8)
  const [selectText, setSelectText] = useState(
    pageStatusTmp !== null ? pageStatusTmp.selectText : 'Lowest Price'
  )
  const [selectTextItem, setSelectTextItem] = useState(
    pageStatusTmp !== null ? pageStatusTmp?.selectTextItem || 'Lowest Price' : 'Lowest Price'
  )
  const [isSelectOpen, setIsSelectOpen] = useState(false)
  const [filter, setFilter] = useState(
    pageStatusTmp !== null ? pageStatusTmp.filter : filterTemplateObject
  )
  const [filterItem, setFilterItem] = useState(
    pageStatusTmp !== null
      ? pageStatusTmp?.filterItem || filterTemplateObjectItem
      : filterTemplateObjectItem
  )
  const [slider1, setSlider1] = useState(pageStatusTmp !== null ? pageStatusTmp.slider1 : 1)
  const [slider2, setSlider2] = useState(pageStatusTmp !== null ? pageStatusTmp.slider2 : 100)
  const [checkBoxState, setCheckBoxState] = useState(
    pageStatusTmp !== null ? pageStatusTmp.checkBoxState : checkBoxArray
  )
  const [checkBoxStateItem, setCheckBoxStateItem] = useState(
    pageStatusTmp !== null
      ? pageStatusTmp?.checkBoxStateItem || checkBoxArrayItem
      : checkBoxArrayItem
  )
  // const [maxPage, setMaxPage] = useState(null);
  const [isDashboardExpanded, setIsDashBoardExtened] = useState(
    isDashboardExpandedTmp !== null ? isDashboardExpandedTmp : true
  )
  const [heroes, setHeroes] = useState([])
  const [items, setItems] = useState([])
  const [pageNumber, setPage] = useState(pageStatusTmp !== null ? pageStatusTmp.pageNumber : 1)
  const [pageNumberItem, setPageItem] = useState(
    pageStatusTmp !== null ? pageStatusTmp?.pageNumberItem || 1 : 1
  )
  const [pagination, setPagination] = useState(setPaginationArray(totalPage, pageNumber))
  const [heroId, setHeroId] = useState(pageStatusTmp?.heroId)
  const [itemId, setItemId] = useState(pageStatusTmp?.itemId)
  const handleFilterItem = (param, value) => {
    setPageItem(1)
    setCheckBoxStateItem((prev) => {
      prev[value.id] = !prev[value.id]
      return prev
    })
    if (param === 'sortBy') {
      setFilterItem((filter) => {
        return { ...filter, [param]: value }
      })
      return
    }
    setFilterItem((filterItemPrev) => {
      let tmp = filterItemPrev[param] === '' ? [] : filterItemPrev[param].split(',')
      if (value.checked) {
        if (!tmp.includes(value.content)) {
          tmp.push(value.content)
        }
        return { ...filterItemPrev, [param]: tmp.join(',') }
      } else {
        return {
          ...filterItemPrev,
          [param]: tmp.filter((ele) => ele !== value.content).join(','),
        }
      }
    })
  }
  const handleFilter = (param, value) => {
    setPage(1)
    // setPagination(setPaginationArray(totalPage, 1));
    if (param === 'elements' || param === 'types') {
      setCheckBoxState((prev) => {
        prev[value.id] = !prev[value.id]
        return prev
      })
      setFilter((filter) => {
        let tmp = filter[param] === '' ? [] : filter[param].split(',')
        if (value.checked) {
          if (!tmp.includes(value.content)) {
            tmp.push(value.content)
          }
          return { ...filter, [param]: tmp.join(',') }
        } else {
          return {
            ...filter,
            [param]: tmp.filter((ele) => ele !== value.content).join(','),
          }
        }
      })
    } else {
      setFilter((filter) => {
        return { ...filter, [param]: value }
      })
    }
  }

  const dispatch = useDispatch()

  useEffect(() => {
    setPage(1)
  }, [chainId, user])

  useEffect(() => {
    const networkId = networkIdAPI[chainId]

    const fetchHeroListUser = () =>
      dispatch(
        marketActions.fetchHeroListUser({
          ...filter,
          pageNumber,
          account: user.address,
          networkId: networkId,
          heroId: heroId,
          // star: `${Math.floor(
          //   Math.min(slider1, slider2) / 12.5 + 1,
          // )},${Math.floor(Math.max(slider1, slider2) / 12.5 + 1)}`,
        })
      )

    const fetchData = async () => {
      const result = await fetchHeroListUser()

      if (result && result.status === 'success') {
        const totalItems = result.data.pagination.totalItem
        const totalPageTmp = totalItems === 0 ? 0 : Math.ceil(totalItems / filter.pageSize)
        // Math.ceil(
        //   result.data.pagination.totalItem / filter.pageSize,
        // );
        setTotalPage(totalPageTmp)
        setPagination(setPaginationArray(totalPageTmp, pageNumber))
        // setTotalPage(
        //   Math.ceil(result.data.pagination.totalItem / filter.pageSize),
        // );
        setHeroes(result.data.data)
      }
    }
    if (!user) {
      return
    }
    if (props.param === 'hero') {
      fetchData()
    } else {
      return
    }
  }, [filter, pageNumber, chainId, user, heroId, dispatch, props.param])
  useEffect(() => {
    const fetchItemList = () =>
      dispatch(
        marketActions.fetchItemListWallet({
          ...filterItem,
          pageNumber: pageNumberItem,
          pageSize: 12,
          account: user.address,
          search: null,
          sortBy: null,
          // networkId: networkId,
          // heroId: heroId,
          // star: `${Math.floor(
          //   Math.min(slider1, slider2) / 12.5 + 1,
          // )},${Math.floor(Math.max(slider1, slider2) / 12.5 + 1)}`,
        })
      )

    const fetchData = async () => {
      const result = await fetchItemList()

      if (result && result.status === 'success') {
        const totalItems = result.data.pagination.totalItem
        const totalPageTmp = totalItems === 0 ? 0 : Math.ceil(totalItems / filterItem?.pageSize)
        // Math.ceil(
        //   result.data.pagination.totalItem / filter.pageSize,
        // );
        setTotalPage(totalPageTmp)
        setPagination(setPaginationArray(totalPageTmp, pageNumberItem))
        // setTotalPage(
        //   Math.ceil(result.data.pagination.totalItem / filter.pageSize),
        // );
        setItems(result.data.data)
      }
    }
    if (!user) {
      return
    }
    if (props.param === 'hero') {
      return
    } else {
      fetchData()
    }
  }, [filterItem, pageNumberItem, user, dispatch, props.param, itemId])
  useEffect(() => {
    const savePageStatus = () => {
      const pageStatus = {
        currentPage: pageNumber,
        filter,
        filterItem,
        selectText,
        selectTextItem,
        checkBoxState,
        checkBoxStateItem,
        pageNumberItem: pageNumberItem,
        pageNumber: pageNumber,
        slider1,
        slider2,
        isDashboardExpanded,
        heroId: heroId,
        itemId: itemId,
      }
      Storage.set('pageStatus', pageStatus)
    }

    savePageStatus()
    // eslint-disable-next-line
  }, [
    isDashboardExpanded,
    filter,
    pageNumber,
    selectText,
    checkBoxState,
    checkBoxStateItem,
    pageNumberItem,
    filterItem,
    slider1,
    slider2,
    heroId,
    itemId,
  ])
  return (
    <React.Fragment>
      {/* <div className="new-wallet-page-total-background">
        <img alt="#" src={BrickBackGround}></img>
        <div className="new-wallet-page-total-background-container">
          <div className="new-wallet-page-total-background-container-up"></div>
          <div className="new-wallet-page-total-background-container-down"></div>
        </div>
      </div> */}
      <div className="bg-fade-layer1"></div>
      <div
        // style={{
        //   backgroundImage: `url(${BrickBackGround})`,
        // }}
        className="bg-fade-layer2"
      ></div>
      <div className="bg-fade-layer3"></div>
      {/* <div className="bg-fade-layer2">
        <img src={FadeUp}></img>
      </div> */}
      {/* <div className="bg-fade-layer3">
        <img src={FadeDown}></img>
      </div> */}
      <div className="new-wallet-page">
        <div className="new-wallet-page-background">
          <img
            className="new-wallet-page-background-banner"
            alt="#"
            src={props.param === 'hero' ? BackGroundPicture : ItemBackGroundWallPaper}
          ></img>
          {props.param === 'hero' && (
            <img className="new-wallet-page-background-groupkaby" alt="#" src={GroupKaby}></img>
          )}
          <div style={badgeIlineStyle} className="new-wallet-page-background-yourwalletbadge">
            {props.param === 'hero' && <img alt="#" src={YourWalletBadge}></img>}
            {props.param === 'hero' && <span>YOUR WALLET</span>}
            {props.param === 'item' && 'YOUR WALLET'}
          </div>
        </div>
        <div
          // style={{
          //   backgroundImage: `url(${BrickBackGround})`,
          // }}
          className="new-wallet-page-body"
        >
          <div className="new-wallet-page-body-left">
            <div style={dashboardInlineStyle} className="new-wallet-page-body-left-dashboard">
              <div className="new-wallet-page-body-left-dashboard-header">
                <div>
                  <span className="new-wallet-page-body-left-dashboard-header-filter">Filter</span>
                  {isDashboardExpanded ? (
                    <svg
                      onClick={() => {
                        Storage.set('isDashboardExpanded', !isDashboardExpanded)
                        setIsDashBoardExtened(!isDashboardExpanded)
                      }}
                      width="9"
                      height="5"
                      viewBox="0 0 9 5"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M4.83333 0L0.666667 5L9 5L4.83333 0Z" fill="white" />
                    </svg>
                  ) : (
                    <svg
                      onClick={() => {
                        Storage.set('isDashboardExpanded', !isDashboardExpanded)
                        setIsDashBoardExtened(!isDashboardExpanded)
                      }}
                      width="9"
                      height="6"
                      viewBox="0 0 9 6"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M4.16667 5.5L8.33333 0.5H0L4.16667 5.5Z" fill="white" />
                    </svg>
                  )}
                </div>
              </div>
              {(isDashboardExpanded || !isMobile) && (
                <React.Fragment>
                  {' '}
                  {!isMobile && <hr className="hr-header"></hr>}
                  {props.param === 'hero' && (
                    <div className="new-wallet-page-body-left-dashboard-script">Element</div>
                  )}
                  <div
                    style={props.param === 'item' ? checkBoxGridStyle : null}
                    className="new-wallet-page-body-left-dashboard-checkbox"
                  >
                    {(props.param === 'hero' ? element : elementItem).map((ele, index) => (
                      <React.Fragment key={`checkboxElement${index}`}>
                        <div className="new-wallet-page-body-left-dashboard-checkbox-children">
                          <span>
                            <input
                              onClick={(e) => {
                                if (props.param === 'hero') {
                                  handleFilter('elements', {
                                    checked: e.target.checked,
                                    id: index,
                                    content: e.target.value,
                                  })
                                } else {
                                  handleFilterItem('elements', {
                                    checked: e.target.checked,
                                    id: index,
                                    content: e.target.value,
                                  })
                                }
                              }}
                              defaultChecked={
                                (props.param === 'hero' ? checkBoxState : checkBoxStateItem)[index]
                              }
                              type="checkbox"
                              className="checkbox"
                              value={ele.value}
                            ></input>
                            <label>{ele.text}</label>
                          </span>
                          <img alt="#" src={ele.image}></img>
                        </div>
                      </React.Fragment>
                    ))}
                  </div>
                  {props.param === 'hero' && (
                    <div className="new-wallet-page-body-left-dashboard-script">Type</div>
                  )}
                  {props.param === 'hero' && (
                    <div className="new-wallet-page-body-left-dashboard-checkbox">
                      {type.map((typ, index) => (
                        <React.Fragment key={`checkboxType${index}`}>
                          <div className="new-wallet-page-body-left-dashboard-checkbox-children">
                            <span>
                              <input
                                onClick={(e) => {
                                  handleFilter('types', {
                                    checked: e.target.checked,
                                    id: +index + 5,
                                    content: e.target.value,
                                  })
                                }}
                                defaultChecked={checkBoxState[+index + 5]}
                                type="checkbox"
                                className="checkbox"
                                value={typ.value}
                              ></input>
                              <label>{typ.text}</label>
                            </span>
                            <img alt="#" src={typ.image}></img>
                          </div>
                        </React.Fragment>
                      ))}
                    </div>
                  )}
                  {props.param === 'hero' && (
                    <div className="new-wallet-page-body-left-dashboard-script">Star</div>
                  )}
                  {props.param === 'hero' && (
                    <div
                      style={{
                        marginLeft: `${
                          Math.min(slider1, slider2) === 87.5
                            ? 80
                            : Math.min(slider1, slider2) === 100
                            ? 90
                            : Math.min(slider1, slider2) - 2
                        }%`,

                        width: `${Math.abs(slider2 - slider1) + 3}%`,
                      }}
                      className="new-wallet-page-body-left-dashboard-star-display"
                    >
                      {Math.floor(slider1 / 12.5) === Math.floor(slider2 / 12.5) && (
                        <span>
                          {slider1 === 0 ? 1 : Math.floor(slider1 / 12.5) + 1}
                          <svg
                            width="16"
                            height="15"
                            viewBox="0 0 16 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M7.70117 0L9.49728 5.52786H15.3096L10.6073 8.94427L12.4035 14.4721L7.70117 11.0557L2.99889 14.4721L4.795 8.94427L0.0927196 5.52786H5.90506L7.70117 0Z"
                              fill="url(#paint0_linear)"
                            />
                            <defs>
                              <linearGradient
                                id="paint0_linear"
                                x1="7.70117"
                                y1="0"
                                x2="7.70117"
                                y2="16"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stopColor="white" />
                                <stop offset="1" stopColor="#FDDC17" />
                              </linearGradient>
                            </defs>
                          </svg>
                        </span>
                      )}
                      {Math.floor(slider1 / 10) !== Math.floor(slider2 / 10) && (
                        <span>
                          {Math.min(slider1, slider2) === 0
                            ? 1
                            : Math.floor(Math.min(slider1, slider2) / 12.5 + 1)}
                          <svg
                            width="16"
                            height="15"
                            viewBox="0 0 16 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M7.70117 0L9.49728 5.52786H15.3096L10.6073 8.94427L12.4035 14.4721L7.70117 11.0557L2.99889 14.4721L4.795 8.94427L0.0927196 5.52786H5.90506L7.70117 0Z"
                              fill="url(#paint0_linear)"
                            />
                            <defs>
                              <linearGradient
                                id="paint0_linear"
                                x1="7.70117"
                                y1="0"
                                x2="7.70117"
                                y2="16"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stopColor="white" />
                                <stop offset="1" stopColor="#FDDC17" />
                              </linearGradient>
                            </defs>
                          </svg>
                        </span>
                      )}
                      {Math.floor(slider1 / 12.5) !== Math.floor(slider2 / 12.5) && (
                        <span>
                          {Math.max(slider1, slider2) === 0
                            ? 1
                            : Math.floor(Math.max(slider1, slider2) / 12.5 + 1)}
                          <svg
                            width="16"
                            height="15"
                            viewBox="0 0 16 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M7.70117 0L9.49728 5.52786H15.3096L10.6073 8.94427L12.4035 14.4721L7.70117 11.0557L2.99889 14.4721L4.795 8.94427L0.0927196 5.52786H5.90506L7.70117 0Z"
                              fill="url(#paint0_linear)"
                            />
                            <defs>
                              <linearGradient
                                id="paint0_linear"
                                x1="7.70117"
                                y1="0"
                                x2="7.70117"
                                y2="16"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stopColor="white" />
                                <stop offset="1" stopColor="#FDDC17" />
                              </linearGradient>
                            </defs>
                          </svg>
                        </span>
                      )}
                    </div>
                  )}
                  {props.param === 'hero' && (
                    <div className="new-wallet-page-body-left-dashboard-star">
                      <div className="new-wallet-page-body-left-dashboard-star-slider-track"></div>
                      <div
                        style={{
                          marginLeft: `${Math.min(slider1, slider2)}%`,
                          width: `${Math.abs(slider2 - slider1)}%`,
                        }}
                        className="new-wallet-page-body-left-dashboard-star-slider-track-active"
                      ></div>
                      <input
                        onInput={handleSlider1}
                        step="12.5"
                        type="range"
                        min="0"
                        max="100"
                        value={slider1}
                      ></input>
                      <input
                        onInput={handleSlider2}
                        type="range"
                        step="12.5"
                        min="0"
                        max="100"
                        value={slider2}
                      ></input>
                    </div>
                  )}
                </React.Fragment>
              )}
            </div>
          </div>
          <div className="new-wallet-page-body-right">
            <div className="new-wallet-page-body-right-header">
              {props.param === 'hero' && (
                <div
                  onClick={() => {
                    setIsSelectOpen(!isSelectOpen)
                  }}
                  className="new-wallet-page-body-right-header-sort"
                >
                  Sort:
                  <div className="new-wallet-page-body-right-header-sort-select-input">
                    {props.param === 'hero' ? selectText : selectTextItem}{' '}
                    <svg
                      width="10px"
                      height="5px"
                      viewBox="0 0 11 6"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M5.70117 6L10.7012 0H0.701172L5.70117 6Z" fill="#BBBBBB" />
                    </svg>
                  </div>
                </div>
              )}
              {props.param === 'hero' && (
                <div className="new-wallet-page-body-right-header-search">
                  <input
                    type="number"
                    value={props.param === 'hero' ? heroId : itemId}
                    onKeyDown={handleSearch}
                    onInput={handleSearchInput}
                    placeholder={props.param === 'hero' ? 'Hero ID' : 'Item ID'}
                  ></input>
                  <SearchIcon />
                </div>
              )}
            </div>
            {isSelectOpen && props.param === 'hero' && (
              <div className="new-wallet-page-body-right-select-option">
                {(props.param === 'hero' ? selectOptions : selectOptionsItem).map(
                  (option, index) => (
                    <React.Fragment key={`select${index}`}>
                      <div
                        onClick={() => {
                          if (props.param === 'hero') {
                            handleFilter(
                              'sortBy',
                              option.value,
                              setIsSelectOpen(false),
                              setSelectText(option.text)
                            )
                          } else {
                            handleFilterItem(
                              'sortBy',
                              option.value,
                              setIsSelectOpen(false),
                              setSelectTextItem(option.text)
                            )
                          }
                        }}
                        // onClick={
                        //   () => {
                        //     setIsSelectOpen(false);
                        //     setSelectText(option.text);
                        //   }
                        //   // handleFilter(
                        //   //   "sortBy",
                        //   //   option.value,

                        //   // )
                        //   // setIsSelectOpen(false),
                        //   // setSelectText(option.text),
                        // }
                        className="new-wallet-page-body-right-select-option-children"
                      >
                        {option.text}
                      </div>
                    </React.Fragment>
                  )
                )}
              </div>
            )}
            <div
              style={{ marginTop: props.param === 'hero' ? '30px' : '96px' }}
              className="new-wallet-page-body-right-hero-card"
            >
              {props.param === 'hero'
                ? heroes.map((hero, index) => (
                    <HeroCard
                      networkId={hero.networkid}
                      star={hero.star}
                      gens={hero.gens}
                      heroId={hero.id}
                      key={`hero${index}`}
                      type={hero.type}
                      price={hero.price}
                      element={hero.element}
                      // heroCardClick={handleHeroCardClick}
                      name={hero.name}
                      image={hero.image}
                      skills={hero.skills}
                      level={hero?.level}
                    />
                  ))
                : items.map((item, index) => (
                    <ItemCard
                      // networkId={hero.networkid}
                      // star={hero.star}
                      // gens={hero.gens}
                      itemId={item.id}
                      param="wallet"
                      key={`item${index}`}
                      // type={hero.type}
                      price={item.price}
                      // element={hero.element}
                      // heroCardClick={handleHeroCardClick}
                      name={item.name}
                      image={item.image}
                      quantity={item.quantity}
                      // skills={hero.skills}
                    />
                  ))}
            </div>
            <div className="new-wallet-page-body-right-pagination">
              <span
                onClick={() => {
                  if ((props.param === 'hero' ? +pageNumber : +pageNumberItem) === 1) {
                    return
                  }
                  setPagination(() => {
                    return setPaginationArray(
                      totalPage,
                      (props.param === 'hero' ? +pageNumber : +pageNumberItem) - 1
                    )
                  })
                  if (props.param === 'hero') {
                    setPage(+pageNumber - 1)
                  } else {
                    setPageItem(+pageNumberItem - 1)
                  }
                }}
                className="new-wallet-page-body-right-pagination-button"
              >
                PREV
              </span>
              {pagination.map((pagi, index) => (
                <React.Fragment key={`pagination${index}`}>
                  <span
                    value={pagi.value}
                    onClick={() => {
                      if (pagi.value === '...') {
                        return
                      }
                      if (props.param === 'hero') {
                        setPage(pagi.value)
                      } else {
                        setPageItem(pagi.value)
                      }
                      setPagination(() => {
                        return setPaginationArray(totalPage, +pagi.value)
                      })
                    }}
                    style={{ color: pagi.active && 'yellow' }}
                    className="new-wallet-page-body-right-pagination-page"
                  >
                    {pagi.value}
                  </span>
                </React.Fragment>
              ))}

              <span
                onClick={() => {
                  if ((props.param === 'hero' ? +pageNumber : +pageNumberItem) >= totalPage) {
                    return
                  }

                  if (props.param === 'hero') {
                    setPage(+pageNumber + 1)
                  } else {
                    setPageItem(+pageNumberItem + 1)
                  }
                  setPagination(() => {
                    return setPaginationArray(
                      totalPage,
                      (props.param === 'hero' ? +pageNumber : +pageNumberItem) + 1
                    )
                  })
                }}
                className="new-wallet-page-body-right-pagination-button"
              >
                NEXT
              </span>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
export default WalletPage

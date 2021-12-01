import React from 'react'
import { useState, useEffect } from 'react'
import './marketpage.scss'
import BackGroundPicture from 'assets/image/background2.png'
import GroupKaby from 'assets/image/training-hero-BG.png'
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
import { useDispatch, useSelector } from 'react-redux'
import * as marketActions from 'actions/market'
import Storage from 'utilities/storage'
import Switch from 'react-switch'
import * as MarketplaceNFTService from 'services/contracts/heroMarketNFT'
import { loadHeroMarketplace } from 'redux/marketplace/heroAction'
import { isEmpty } from 'lodash'

const ITEMS_DATA = [
  {
    id: 40,
    image: 'https://sv.kabyarena.com/game/items/item_003.png',
    name: 'Star shard',
    price: 1,
    quantity: 10000,
  },
  {
    id: 47,
    image: 'https://sv.kabyarena.com/game/items/item_002.png',
    name: 'PvE Energy Potion',
    price: 1,
    quantity: 9999,
  },
  {
    id: 58,
    image: 'https://sv.kabyarena.com/game/items/item_002.png',
    name: 'PvE Energy Potion',
    price: 1,
    quantity: -100,
  },
  {
    id: 55,
    image: 'https://sv.kabyarena.com/game/items/item_003.png',
    name: 'Star shard',
    price: 1,
    quantity: 1,
  },
  {
    id: 46,
    image: 'https://sv.kabyarena.com/game/items/item_001.png',
    name: 'Exp Book',
    price: 1,
    quantity: 9942,
  },
  {
    id: 57,
    image: 'https://sv.kabyarena.com/game/items/item_001.png',
    name: 'Exp Book',
    price: 1,
    quantity: -100,
  },
  {
    id: 61,
    image: 'https://sv.kabyarena.com/game/items/item_001.png',
    name: 'Exp Book',
    price: 1,
    quantity: 4,
  },
  {
    id: 50,
    image: 'https://sv.kabyarena.com/game/items/item_006.png',
    name: 'Reroll Skill Book',
    price: 5,
    quantity: 10000,
  },
  {
    id: 45,
    image: 'https://sv.kabyarena.com/game/items/item_004.png',
    name: 'Skill book',
    price: 5,
    quantity: 9999,
  },
  {
    id: 49,
    image: 'https://sv.kabyarena.com/game/items/item_000.png',
    name: 'Treasure Box',
    price: 10,
    quantity: 9987,
  },
  {
    id: 52,
    image: 'https://sv.kabyarena.com/game/items/item_003.png',
    name: 'Star shard',
    price: 20,
    quantity: 9999,
  },
  {
    id: 60,
    image: 'https://sv.kabyarena.com/game/items/item_000.png',
    name: 'Treasure Box',
    price: 99,
    quantity: 10,
  },
]

const HEROES_DATA = [
  {
    name: 'GOLEM',
    image: 'https://sv.kabyarena.com/game/heroes/hero_3_0.png',
    id: 300,
    networkid: 1,
    star: 5,
    element: 'Water',
    type: 'Support',
    price: 50000,
    skills: [],
    gens: 2,
    level: 1,
  },
  {
    name: 'CENTAUR',
    image: 'https://sv.kabyarena.com/game/heroes/hero_17_1.png',
    id: 315,
    networkid: 1,
    star: 2,
    element: 'Fire',
    type: 'Defense',
    price: 0,
    skills: [],
    gens: 2,
    level: 1,
  },
  {
    name: 'WOLF',
    image: 'https://sv.kabyarena.com/game/heroes/hero_6_1.png',
    id: 314,
    networkid: 1,
    star: 2,
    element: 'Fire',
    type: 'Hp',
    price: 0,
    skills: [],
    gens: 2,
    level: 1,
  },
  {
    name: 'SIRENIAN',
    image: 'https://sv.kabyarena.com/game/heroes/hero_7_1.png',
    id: 313,
    networkid: 1,
    star: 5,
    element: 'Fire',
    type: 'Support',
    price: 0,
    skills: [],
    gens: 2,
    level: 4,
  },
  {
    name: 'WOLF',
    image: 'https://sv.kabyarena.com/game/heroes/hero_6_1.png',
    id: 312,
    networkid: 1,
    star: 3,
    element: 'Fire',
    type: 'Defense',
    price: 0,
    skills: [],
    gens: 2,
    level: 30,
  },
  {
    name: 'MAGMOTH',
    image: 'https://sv.kabyarena.com/game/heroes/hero_18_2.png',
    id: 311,
    networkid: 1,
    star: 3,
    element: 'Wind',
    type: 'Hp',
    price: 0,
    skills: [],
    gens: 2,
    level: 20,
  },
  {
    name: 'GOLEM',
    image: 'https://sv.kabyarena.com/game/heroes/hero_3_2.png',
    id: 310,
    networkid: 1,
    star: 2,
    element: 'Wind',
    type: 'Support',
    price: 0,
    skills: [],
    gens: 2,
    level: 1,
  },
  {
    name: 'STRIX',
    image: 'https://sv.kabyarena.com/game/heroes/hero_5_0.png',
    id: 309,
    networkid: 1,
    star: 3,
    element: 'Water',
    type: 'Hp',
    price: 0,
    skills: [],
    gens: 2,
    level: 1,
  },
  {
    name: 'GRIM REAPER',
    image: 'https://sv.kabyarena.com/game/heroes/hero_14_1.png',
    id: 308,
    networkid: 1,
    star: 5,
    element: 'Fire',
    type: 'Defense',
    price: 0,
    skills: [],
    gens: 2,
    level: 1,
  },
]

const MarketPage = (props) => {
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
  const pageStatusTmp = Storage.get('pageStatusMarket')
  const isDashboardExpandedTmp = Storage.get('isDashboardExpandedMarket')
  const element = [
    { text: 'Water', image: Water, value: 'water' },
    { text: 'Fire', image: Fire, value: 'fire' },
    { text: 'Dark', image: Dark, value: 'dark' },
    { text: 'Light', image: Light, value: 'light' },
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
    // account: account,
    pageSize: 9,
    pageNumber: 1,
    networkId: 1,
    star: '1,9',
  }
  const filterTemplateObjectItem = {
    elements: '',
    search: '',
    sortBy: 1,
    // account: account,
    pageSize: 12,
    pageNumber: 1,
  }
  let dashboardInlineStyle = {
    marginTop: props.param === 'item' ? '98px' : '0px',
    borderRadius: props.param === 'item' ? '24px' : '0px',
  }
  let badgeIlineStyle = {
    marginTop: props.param === 'item' ? '-12.5vw' : '-4.5vw',
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
    setCurrentPage(1)
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
    setCurrentPage(1)
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
  const [currentPage, setCurrentPage] = useState(
    pageStatusTmp !== null ? pageStatusTmp.currentPage : 1
  )
  const [currentPageItem, setCurrentPageItem] = useState(
    pageStatusTmp !== null ? pageStatusTmp?.currentPageItem || 1 : 1
  )
  const [pagination, setPagination] = useState(setPaginationArray(totalPage, currentPage))
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
  const [owner, setOwnerFilter] = useState(pageStatusTmp?.owner)
  const [offer, setOffered] = useState(pageStatusTmp?.offer)
  const [isFirstTime, setIsFirstTime] = useState(true)
  const [stat, setStat] = useState({})
  const [heroId, setHeroId] = useState(pageStatusTmp?.heroId)
  const [itemId, setItemId] = useState(pageStatusTmp?.itemId)
  const { listHero } = useSelector((state) => state.heroSlices)
  console.log('🚀 ~ file: MarketPage.js ~ line 504 ~ MarketPage ~ listHero', listHero)
  const handleFilterItem = (param, value) => {
    setCurrentPageItem(1)
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
    setCurrentPage(1)
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
    const loadInfoMarketplaceNFTs = async () => {
      const data = await MarketplaceNFTService.getInfoMarketplace()
      console.log('🚀 ~ file: MarketPage.js ~ line 476 ~ loadInfoMarketplaceNFTs ~ data ', data)
      if (data.success) setHeroes(data.data)
    }
    // loadInfoMarketplaceNFTs()
    dispatch(loadHeroMarketplace({ limit: 12, skip: 0 }))
  }, [])

  useEffect(() => {
    if (!account) {
      setOffered(false)
      setOwnerFilter(false)
    }

    const fetchData = async () => {
      setHeroes([])
    }
    if (props.param === 'hero') {
      fetchData()
    } else {
      return
    }
    // eslint-disable-next-line
  }, [filter, currentPage, chainId, account, offer, owner, heroId, props.param])
  useEffect(() => {
    const fetchItemList = () =>
      dispatch(
        marketActions.fetchItemList({
          ...filterItem,
          pageSize: 12,
          pageNumber: currentPageItem,
          search: null,
        })
      )
    // let isSubcribed = true;
    const fetchData = async () => {
      setItems(ITEMS_DATA)
    }
    if (props.param === 'hero') {
      return
    } else {
      fetchData()
    }
  }, [currentPageItem, props.param, filterItem, itemId]) // eslint-disable-line
  useEffect(() => {
    const savePageStatus = () => {
      const pageStatus = {
        currentPage,
        filter,
        filterItem,
        selectText,
        selectTextItem,
        checkBoxState,
        checkBoxStateItem,
        pageNumber: currentPage,
        pageNumberItem: currentPageItem,
        currentPageItem,
        slider1,
        slider2,
        isDashboardExpanded,
        offer,
        owner,
        itemId: itemId,
        heroId: heroId,
      }
      Storage.set('pageStatusMarket', pageStatus)
    }
    savePageStatus()
    // eslint-disable-next-line
  }, [
    filter,
    filterItem,
    selectText,
    slider1,
    slider2,
    checkBoxState,
    checkBoxStateItem,
    isDashboardExpanded,
    currentPage,
    currentPageItem,
    offer,
    owner,
    heroId,
    itemId,
  ]) // eslint-disable-line

  useEffect(() => {
    if (owner) {
      setOffered(false)
    }
    if (isFirstTime) {
      return
    } else {
      setCurrentPage(1)
    }
  }, [owner]) // eslint-disable-line

  useEffect(() => {
    if (offer) {
      setOwnerFilter(false)
    }
    if (isFirstTime) {
      setIsFirstTime(false)
      return
    } else {
      setCurrentPage(1)
    }
  }, [offer]) // eslint-disable-line

  return (
    <React.Fragment>
      <div className="bg-fade-layer1"></div>
      <div className="bg-fade-layer2"></div>
      <div className="bg-fade-layer3"></div>

      <div className="new-market-page">
        <div className="new-market-page-background">
          <img
            className="new-market-page-background-banner"
            alt="#"
            src={props.param === 'hero' ? BackGroundPicture : ItemBackGroundWallPaper}
          ></img>
          {props.param === 'hero' && (
            <img className="new-market-page-background-groupkaby" alt="#" src={GroupKaby}></img>
          )}
          <div style={badgeIlineStyle} className="new-market-page-background-yourmarketbadge">
            {props.param === 'hero' && <img alt="#" src={YourWalletBadge}></img>}
            {props.param === 'hero' && <span>MARKET PLACE</span>}
            {props.param === 'item' && 'MARKETPLACE'}
          </div>
        </div>
        <div
          style={{
            justifyContent: props.param === 'hero' ? 'space-between' : 'space-evenly',
          }}
          className="total-hero-info"
        >
          {/* {props.param === 'hero' && (
            <div className="total-hero-info-section">
              <span className="total-hero-info-header">
                Total {props.param === 'hero' ? 'Heroes' : 'Items'}
              </span>

              <span className="total-hero-info-content">
                {(props.param === 'hero' ? stat?.totalhero : stat?.totalitem) > 999
                  ? (props.param === 'hero' ? stat?.totalhero : stat?.totalitem).toLocaleString()
                  : props.param === 'hero'
                  ? stat?.totalhero
                  : stat?.totalitem}{' '}
                {props.param === 'hero' ? 'Hero' : 'Item'}
                {(props.param === 'hero' ? stat?.totalhero : stat?.totalitem) > 1 &&
                props.param === 'hero'
                  ? 'es'
                  : 's'}
              </span>
            </div>
          )} */}
          {/* <div className="total-hero-info-section">
            <span className="total-hero-info-header">Total Volume</span>
            <span className="total-hero-info-content">
              {stat?.totalvolume > 999 ? stat?.totalvolume.toLocaleString() : stat?.totalvolume}{' '}
              {props.param === 'hero' ? 'KABY' : 'KGT'}
            </span>
          </div>
          <div className="total-hero-info-section">
            <span className="total-hero-info-header">Highest Price</span>
            <span className="total-hero-info-content">
              {stat?.highestprice > 999 ? stat?.highestprice.toLocaleString() : stat?.highestprice}{' '}
              {props.param === 'hero' ? 'KABY' : 'KGT'}
            </span>
          </div> */}
        </div>
        <div className="new-market-page-body">
          {/* <div className="new-market-page-body-left">
            <div style={dashboardInlineStyle} className="new-market-page-body-left-dashboard">
              <div className="new-market-page-body-left-dashboard-header">
                <div>
                  <span className="new-market-page-body-left-dashboard-header-filter">Filter</span>
                  {isDashboardExpanded ? (
                    <svg
                      onClick={() => {
                        Storage.set('isDashboardExpandedMarket', !isDashboardExpanded)
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
                        Storage.set('isDashboardExpandedMarket', !isDashboardExpanded)
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
                    <div className="new-market-page-body-left-dashboard-script">Element</div>
                  )}
                  <div
                    style={props.param === 'item' ? checkBoxGridStyle : null}
                    className="new-market-page-body-left-dashboard-checkbox"
                  >
                    {(props.param === 'hero' ? element : elementItem).map((ele, index) => (
                      <React.Fragment key={`checkboxElement${index}`}>
                        <div className="new-market-page-body-left-dashboard-checkbox-children">
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
                    <div className="new-market-page-body-left-dashboard-script">Type</div>
                  )}
                  {props.param === 'hero' && (
                    <div className="new-market-page-body-left-dashboard-checkbox">
                      {type.map((typ, index) => (
                        <React.Fragment key={`checkboxType${index}`}>
                          <div className="new-market-page-body-left-dashboard-checkbox-children">
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
                    <div className="new-market-page-body-left-dashboard-script">Star</div>
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
                      className="new-market-page-body-left-dashboard-star-display"
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
                    <div className="new-market-page-body-left-dashboard-star">
                      <div className="new-market-page-body-left-dashboard-star-slider-track"></div>
                      <div
                        style={{
                          marginLeft: `${Math.min(slider1, slider2)}%`,
                          width: `${Math.abs(slider2 - slider1)}%`,
                        }}
                        className="new-market-page-body-left-dashboard-star-slider-track-active"
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
          </div> */}
          <div className="new-market-page-body-right">
            {/* <div className="new-market-page-body-right-header">
              {props.param === 'hero' && (
                <div className="market-switch-filter">
                  <div className="market-switch-filter-label">My Offers</div>
                  <Switch
                    onChange={() => setOffered(!offer)}
                    checked={offer}
                    uncheckedIcon={false}
                    disabled={!account}
                  />
                </div>
              )}
              {props.param === 'hero' && (
                <div className="market-switch-filter">
                  <div className="market-switch-filter-label">Owned</div>
                  <Switch
                    onChange={() => setOwnerFilter(!owner)}
                    checked={owner}
                    uncheckedIcon={false}
                    disabled={!account}
                  />
                </div>
              )}
              <div
                onClick={() => {
                  setIsSelectOpen(!isSelectOpen)
                }}
                className="new-market-page-body-right-header-sort"
              >
                Sort:
                <div className="new-market-page-body-right-header-sort-select-input">
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
              {props.param === 'hero' && (
                <div className="new-market-page-body-right-header-search">
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
            </div> */}
            {/* {isSelectOpen && (
              <div
                className={
                  props.param === 'hero'
                    ? 'new-market-page-body-right-select-option'
                    : 'new-market-page-body-right-select-option-item'
                }
              >
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
                        className={
                          props.param === 'hero'
                            ? 'new-market-page-body-right-select-option-children'
                            : 'new-market-page-body-right-select-option-item-children'
                        }
                      >
                        {option.text}
                      </div>
                    </React.Fragment>
                  )
                )}
              </div>
            )} */}
            <div className="new-market-page-body-right-hero-card">
              {props.param === 'hero'
                ? isEmpty(listHero)
                  ? 'Loading'
                  : listHero.map((hero, index) => (
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
                      param="market"
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
            <div className="new-market-page-body-right-pagination">
              <span
                onClick={() => {
                  if ((props.param === 'hero' ? +currentPage : +currentPageItem) === 1) {
                    return
                  }
                  setPagination(() => {
                    return setPaginationArray(
                      totalPage,
                      (props.param === 'hero' ? +currentPage : +currentPageItem) - 1
                    )
                  })
                  if (props.param === 'hero') {
                    setCurrentPage(+currentPage - 1)
                  } else {
                    setCurrentPageItem(+currentPageItem - 1)
                  }
                }}
                className="new-market-page-body-right-pagination-button"
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
                        setCurrentPage(pagi.value)
                      } else {
                        setCurrentPageItem(pagi.value)
                      }
                      setPagination(() => {
                        return setPaginationArray(totalPage, +pagi.value)
                      })
                    }}
                    style={{ color: pagi.active && 'yellow' }}
                    className="new-market-page-body-right-pagination-page"
                  >
                    {pagi.value}
                  </span>
                </React.Fragment>
              ))}

              <span
                onClick={() => {
                  if ((props.param === 'hero' ? +currentPage : +currentPageItem) >= totalPage) {
                    return
                  }
                  setPagination(() => {
                    return setPaginationArray(
                      totalPage,
                      (props.param === 'hero' ? +currentPage : +currentPageItem) + 1
                    )
                  })
                  if (props.param === 'hero') {
                    setCurrentPage(+currentPage + 1)
                  } else setCurrentPageItem(+currentPageItem + 1)
                }}
                className="new-market-page-body-right-pagination-button"
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
export default MarketPage

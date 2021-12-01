import React from 'react'
import { useState, useEffect } from 'react'
import './training.scss'
import BackGroundPicture from 'assets/image/background2.png'
import GroupKaby from 'assets/image/Training-hero-BG-ver2.png'
import YourWalletBadge from 'assets/image/your-wallet-badge.png'
// import BrickBackGround from "assets/image/Rectangle50.png";
// import FadeDown from "assets/image/Rectangle 51.png";
// import FadeUp from "assets/image/Rectangle 55.png";
// import BrickBackGroundDown from "assets/image/Rectangle 52.png";
import Water from 'assets/image/water-icon.png'
import Fire from 'assets/image/fire-icon.png'
import Dark from 'assets/image/dark-icon.png'
import Light from 'assets/image/light-icon.png'
import Wind from 'assets/image/wind-icon.png'
import Attack from 'assets/image/attack-item.png'
import Defense from 'assets/image/defense-item.png'
import Support from 'assets/image/speed-item.png'
import HP from 'assets/image/HP-item.png'
import { ReactComponent as SearchIcon } from '../../assets/css/search-icon.svg'
import HeroCard from '../common/hero-card/HeroCard'
import { useWeb3React } from '@web3-react/core'
import { useDispatch } from 'react-redux'
import * as marketActions from 'actions/market'
import { networkIdAPI } from 'constant/contract'
import Storage from 'utilities/storage'
import Switch from 'react-switch'
import StakePopup from 'components/Popup/StakingPopup'
import UpgradeStarPopup from 'components/Popup/UpgradeStar'

const TrainingPage = (props) => {
  const [isMobile, setIsMobile] = useState(false)
  const handleResize = () => {
    if (window.innerWidth <= 500) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }
  }
  window.addEventListener('resize', handleResize)
  const { chainId, account } = useWeb3React()

  const pageStatusTmp = Storage.get('pageStatusTraining')
  const isDashboardExpandedTmp = Storage.get('isDashboardExpandedTraining')
  const element = [
    { text: 'Water', image: Water, value: 'water' },
    { text: 'Fire', image: Fire, value: 'fire' },
    { text: 'Dark', image: Dark, value: 'dark' },
    { text: 'Light', image: Light, value: 'light' },
    { text: 'Wind', image: Wind, value: 'wind' },
  ]
  const type = [
    { text: 'Attack', image: Attack, value: 'attack' },
    { text: 'Defense', image: Defense, value: 'defense' },
    { text: 'Support', image: Support, value: 'support' },
    { text: 'HP', image: HP, value: 'hp' },
  ]
  // const elementImage = {
  //   Fire: Fire,
  //   Wind: Wind,
  //   Light: Light,
  //   Dark: Dark,
  //   Water: Water,
  // };
  const selectOptions = [
    { text: 'Lowest Id', value: 2 },
    { text: 'Highest Id', value: 3 },
  ]
  const filterTemplateObject = {
    elements: '',
    types: '',
    search: '',
    sortBy: 2,
    // account: account,
    pageSize: 9,
    pageNumber: 1,
    networkId: 1,
    star: '1,9',
  }
  let checkBoxArray = []
  for (let index = 0; index < 9; index++) {
    checkBoxArray.push(false)
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
    setHeroId(e.target.value)
  }
  const [totalPage, setTotalPage] = useState(8)
  const [currentPage, setCurrentPage] = useState(
    pageStatusTmp !== null ? pageStatusTmp.currentPage : 1
  )
  const [pagination, setPagination] = useState(setPaginationArray(totalPage, currentPage))
  const [selectText, setSelectText] = useState(
    pageStatusTmp !== null ? pageStatusTmp.selectText : 'Lowest Id'
  )
  const [isSelectOpen, setIsSelectOpen] = useState(false)
  const [filter, setFilter] = useState(
    pageStatusTmp !== null ? pageStatusTmp.filter : filterTemplateObject
  )
  const [slider1, setSlider1] = useState(pageStatusTmp !== null ? pageStatusTmp.slider1 : 1)
  const [slider2, setSlider2] = useState(pageStatusTmp !== null ? pageStatusTmp.slider2 : 100)
  const [checkBoxState, setCheckBoxState] = useState(
    pageStatusTmp !== null ? pageStatusTmp.checkBoxState : checkBoxArray
  )
  // const [maxPage, setMaxPage] = useState(null);
  const [isDashboardExpanded, setIsDashBoardExtened] = useState(
    isDashboardExpandedTmp !== null ? isDashboardExpandedTmp : true
  )

  const [heroes, setHeroes] = useState([])
  // const [heroIndex, setHeroIndex] = useState(null);
  const [owner, setOwnerFilter] = useState(pageStatusTmp ? pageStatusTmp.owner : true)
  const [staked, setStaked] = useState(pageStatusTmp?.staked)
  const [isFirstTime, setIsFirstTime] = useState(true)
  const [trainingHero, setTrainingHero] = useState(null)
  const [upStar, setUpStar] = useState(null)
  const [changeAccount, setChangeAccount] = useState(true)
  const [heroId, setHeroId] = useState(pageStatusTmp?.heroId)
  // const [isAccountChange, setIsAccountChange] = useState(true);
  const handleFilter = (param, value) => {
    // setPagination(setPaginationArray(totalPage, 1));
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
    const savePageStatus = () => {
      const pageStatus = {
        currentPage,
        filter,
        selectText,
        checkBoxState,
        pageNumber: currentPage,
        slider1,
        slider2,
        isDashboardExpanded,
        staked: account ? staked : pageStatusTmp?.staked,
        owner: account ? owner : pageStatusTmp ? pageStatusTmp.owner : true,
        heroId: heroId,
      }
      Storage.set('pageStatusTraining', pageStatus)
    }

    // console.log("1");
    // console.log(account);
    savePageStatus()
    // eslint-disable-next-line
  }, [
    filter,
    selectText,
    slider1,
    slider2,
    checkBoxState,
    isDashboardExpanded,
    currentPage,
    staked,
    owner,
    heroId,
  ]); // eslint-disable-line
  useEffect(() => {
    // console.log("5");
    console.log(account)
    if (!account) {
      // console.log("set cả 2 về false");
      setStaked(false)
      setOwnerFilter(false)
    } else {
      // console.log("set cả 2 theo pagestt");
      setStaked(pageStatusTmp?.staked)
      setOwnerFilter(pageStatusTmp ? pageStatusTmp.owner : true)
    }
    setChangeAccount(!changeAccount)
  }, [account, chainId]); // eslint-disable-line
  useEffect(() => {
    // if (!account) {
    //   setStaked(false);
    //   setOwnerFilter(false);
    // }
    const networkId = networkIdAPI[chainId]
    const fetchHeroListTraining = () =>
      dispatch(
        marketActions.fetchHeroListTraining({
          ...filter,
          pageNumber: currentPage,
          account,
          networkId,
          owner,
          staked: staked,
          heroId: heroId,
          // star: `${Math.floor(
          //   Math.min(slider1, slider2) / 12.5 + 1,
          // )},${Math.floor(Math.max(slider1, slider2) / 12.5 + 1)}`,
        })
      )

    const fetchData = async () => {
      const result = await fetchHeroListTraining()

      if (result && result.status === 'success') {
        const totalItems = result.data.pagination.totalItem
        const totalPageTmp = totalItems === 0 ? 0 : Math.ceil(totalItems / filter.pageSize)
        // Math.ceil(
        //   result.data.pagination.totalItem / filter.pageSize,
        // );
        setTotalPage(totalPageTmp)
        setPagination(setPaginationArray(totalPageTmp, currentPage))
        // setTotalPage(
        //   Math.ceil(result.data.pagination.totalItem / filter.pageSize),
        // );
        setHeroes(result.data.data)
      } else {
        setHeroes([])
        setTotalPage(0)
        setPagination(setPaginationArray(0, 0))
      }
    }

    // console.log("2");
    // console.log(account);
    fetchData()
  }, [filter, currentPage, staked, owner, changeAccount, heroId]); // eslint-disable-line

  useEffect(() => {
    // if (owner) {
    //   setStaked(false);
    // }
    // console.log("3");
    if (isFirstTime) {
      return
    } else {
      setCurrentPage(1)
    }
  }, [owner]); // eslint-disable-line

  useEffect(() => {
    // console.log("4");
    if (isFirstTime) {
      setIsFirstTime(false)
      return
    } else {
      setCurrentPage(1)
    }
    // if (staked) {
    //   setOwnerFilter(false);
    // }
  }, [staked]); // eslint-disable-line

  // useEffect(() => {
  //   return () => {
  //     console.log(
  //       "🚀 ~ file: Training.js ~ line 347 ~ TrainingPage ~ isTrainingHero",
  //       trainingHero,
  //     );
  //   };
  // }, [trainingHero]);

  return (
    <React.Fragment>
      {/* <div className="new-training-page-total-background">
        <img alt="#" src={BrickBackGround}></img>
        <div className="new-training-page-total-background-container">
          <div className="new-training-page-total-background-container-up"></div>
          <div className="new-training-page-total-background-container-down"></div>
        </div>
      </div> */}
      {account && upStar !== null && (
        <UpgradeStarPopup
          showModal={upStar !== null}
          handleCloseModal={() => {
            setTrainingHero(upStar)
            setUpStar(null)
          }}
          heroStar={heroes[upStar]?.star}
          heroId={heroes[upStar]?.id}
        />
      )}
      {account && (
        <StakePopup
          showModal={trainingHero !== null && upStar === null}
          handleCloseModal={() => setTrainingHero(null)}
          handleOpenModal={() => {
            setUpStar(trainingHero)
            setTrainingHero(null)
          }}
          hero={heroes[trainingHero]}
        />
      )}
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
      <div className="new-training-page">
        <div className="new-training-page-background">
          <img
            className="new-training-page-background-banner"
            alt="#"
            src={BackGroundPicture}
          ></img>
          <img className="new-training-page-background-groupkaby" alt="#" src={GroupKaby}></img>
          <div className="new-training-page-background-yourmarketbadge">
            <img alt="#" src={YourWalletBadge}></img>
            <span>TRAINING</span>
          </div>
        </div>
        <div
          // style={{
          //   backgroundImage: `url(${BrickBackGround})`,
          // }}
          className="new-training-page-body"
        >
          <div className="new-training-page-body-left">
            <div className="new-training-page-body-left-dashboard">
              <div className="new-training-page-body-left-dashboard-header">
                <div>
                  <span className="new-training-page-body-left-dashboard-header-filter">
                    Filter
                  </span>
                  {isDashboardExpanded ? (
                    <svg
                      onClick={() => {
                        Storage.set('isDashboardExpandedTraining', !isDashboardExpanded)
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
                        Storage.set('isDashboardExpandedTraining', !isDashboardExpanded)
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
                  <div className="new-training-page-body-left-dashboard-script">Element</div>
                  <div className="new-training-page-body-left-dashboard-checkbox">
                    {element.map((ele, index) => (
                      <React.Fragment key={`checkboxElement${index}`}>
                        <div className="new-training-page-body-left-dashboard-checkbox-children">
                          <span>
                            <input
                              onClick={(e) => {
                                handleFilter('elements', {
                                  checked: e.target.checked,
                                  id: index,
                                  content: e.target.value,
                                })
                              }}
                              checked={checkBoxState[index]}
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
                  <div className="new-training-page-body-left-dashboard-script">Type</div>
                  <div className="new-training-page-body-left-dashboard-checkbox">
                    {type.map((typ, index) => (
                      <React.Fragment key={`checkboxType${index}`}>
                        <div className="new-training-page-body-left-dashboard-checkbox-children">
                          <span>
                            <input
                              onClick={(e) => {
                                handleFilter('types', {
                                  checked: e.target.checked,
                                  id: +index + 5,
                                  content: e.target.value,
                                })
                              }}
                              checked={checkBoxState[+index + 5]}
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
                  <div className="new-training-page-body-left-dashboard-script">Star</div>
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
                    className="new-training-page-body-left-dashboard-star-display"
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
                  <div className="new-training-page-body-left-dashboard-star">
                    <div className="new-training-page-body-left-dashboard-star-slider-track"></div>
                    <div
                      style={{
                        marginLeft: `${Math.min(slider1, slider2)}%`,
                        width: `${Math.abs(slider2 - slider1)}%`,
                      }}
                      className="new-training-page-body-left-dashboard-star-slider-track-active"
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
                </React.Fragment>
              )}
            </div>
          </div>
          <div className="new-training-page-body-right">
            <div className="new-training-page-body-right-header">
              <div className="market-switch-filter">
                <div className="market-switch-filter-label">Staked</div>
                <Switch
                  onChange={() => setStaked(!staked)}
                  checked={staked}
                  uncheckedIcon={false}
                  disabled={!account}
                />
              </div>
              <div className="market-switch-filter">
                <div className="market-switch-filter-label">Owned</div>
                <Switch
                  onChange={() => setOwnerFilter(!owner)}
                  checked={owner}
                  uncheckedIcon={false}
                  disabled={!account}
                />
              </div>
              <div
                onClick={() => {
                  setIsSelectOpen(!isSelectOpen)
                }}
                className="new-training-page-body-right-header-sort"
              >
                Sort:
                <div className="new-training-page-body-right-header-sort-select-input">
                  {selectText}{' '}
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

              <div className="new-training-page-body-right-header-search">
                <input
                  type="number"
                  value={heroId}
                  onKeyDown={handleSearch}
                  onInput={handleSearchInput}
                  placeholder="Hero ID"
                ></input>
                <SearchIcon />
              </div>
            </div>
            {isSelectOpen && (
              <div className="new-training-page-body-right-select-option">
                {selectOptions.map((option, index) => (
                  <React.Fragment key={`select${index}`}>
                    <div
                      onClick={() =>
                        handleFilter(
                          'sortBy',
                          option.value,
                          setIsSelectOpen(false),
                          setSelectText(option.text)
                        )
                      }
                      className="new-training-page-body-right-select-option-children"
                    >
                      {option.text}
                    </div>
                  </React.Fragment>
                ))}
              </div>
            )}
            <div className="new-training-page-body-right-hero-card">
              {heroes.map((hero, index) => (
                <HeroCard
                  stake_amount={hero.stake_amount}
                  training={() => setTrainingHero(index)}
                  networkId={hero.networkid}
                  star={hero.star}
                  gens={hero.gens}
                  heroId={hero.id}
                  position={index}
                  key={`hero${index}`}
                  type={hero.type}
                  price={hero.price}
                  element={hero.element}
                  name={hero.name}
                  image={hero.image}
                  skills={hero.skills}
                />
              ))}
            </div>
            <div className="new-training-page-body-right-pagination">
              <span
                onClick={() => {
                  if (currentPage === 1) {
                    return
                  }
                  setPagination(() => {
                    return setPaginationArray(totalPage, +currentPage - 1)
                  })
                  setCurrentPage(+currentPage - 1)
                }}
                className="new-training-page-body-right-pagination-button"
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
                      setCurrentPage(pagi.value)
                      setPagination(() => {
                        return setPaginationArray(totalPage, +pagi.value)
                      })
                    }}
                    style={{ color: pagi.active && 'yellow' }}
                    className="new-training-page-body-right-pagination-page"
                  >
                    {pagi.value}
                  </span>
                </React.Fragment>
              ))}

              <span
                onClick={() => {
                  if (currentPage >= totalPage) {
                    return
                  }
                  setPagination(() => {
                    return setPaginationArray(totalPage, +currentPage + 1)
                  })
                  setCurrentPage(+currentPage + 1)
                }}
                className="new-training-page-body-right-pagination-button"
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
export default TrainingPage

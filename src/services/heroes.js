import {
  claimHero,
  getKabyToken,
  approve,
  getHerosWithOffers,
  offerHero,
  cancelOffer,
  getListOffer,
  listHeroOnSale,
  delistHeroOnSale,
  takeOfferHero,
  getHeroOnSale,
  buyHero,
  stakeForUpgradeLevel,
  unstake,
  upgradeStarForHero,
  getAcceptedKabyToken,
  approveStakingPool,
  checkStakingData,
  getSummonStakingToken,
  approveSummonStakingPool,
  stakeForBuyHero,
  unstakeFromBuy,
  getBalanceSummon,
  getReWardStaking,
  getTotalBalanceSummonStaking,
  getMaxAmountSummon,
  getAmountSummoned,
} from './contracts/blockchain'

export const summonHero = async (amount) => {
  try {
    const claim = await claimHero(amount)
    if (claim)
      return {
        success: true,
        status: 200,
        error: null,
        pagination: null,
        data: { message: 'Summon hero is successful !' },
      }
    return {
      success: false,
      status: 404,
      error: 'Error! An error occurred. Please try again later',
      pagination: null,
      data: null,
    }
  } catch (e) {
    return {
      success: false,
      status: 404,
      error: e.message,
      pagination: null,
      data: null,
    }
  }
}

export const getApprovedKabyToken = async () => {
  try {
    const token = await getKabyToken()
    if (token)
      return {
        success: true,
        status: 200,
        error: null,
        pagination: null,
        data: { ...token },
      }
    return {
      success: false,
      status: 404,
      error: 'Error! An error occurred. Please try again later',
      pagination: null,
      data: null,
    }
  } catch (e) {
    console.log(e.message)
    return {
      success: false,
      status: 404,
      error: e.message,
      pagination: null,
      data: null,
    }
  }
}

export const approveKabyToken = async (kabyToken) => {
  try {
    const success = await approve(kabyToken)
    if (success)
      return {
        success: true,
        status: 200,
        error: null,
        pagination: null,
        data: { message: ' Kaby Token Is Approved !' },
      }
    return {
      success: false,
      status: 404,
      error: 'Error! An error occurred. Please try again later',
      pagination: null,
      data: null,
    }
  } catch (e) {
    return {
      success: false,
      status: 404,
      error: e.message,
      pagination: null,
      data: null,
    }
  }
}

export const checkStakingApproveKABY = async () => {
  try {
    const res = await getAcceptedKabyToken()
    if (res) {
      return {
        success: true,
        data: res,
      }
    }
    return {
      success: false,
      data: res,
    }
  } catch (e) {
    console.log('file heroes.js ~ line 188 :', e.message)

    return {
      success: false,
      message: e.message,
    }
  }
}

export const approveStakingForKABY = async (token) => {
  try {
    const res = await approveStakingPool(token)
    if (res) {
      return {
        success: true,
        data: res,
      }
    }
  } catch (e) {
    console.log('file heroes.js ~ line 188:', e.message)

    return {
      success: false,
      message: e.message,
    }
  }
}

export const getStakingDataService = async (userAddress, heroId) => {
  try {
    const staking = await checkStakingData(userAddress, heroId)
    if (staking) {
      return {
        success: true,
        data: staking,
      }
    }
  } catch (e) {
    console.log('file: heroes.js ~ line 188 ~ stakingForRewardHero ~ e.message', e.message)

    return {
      success: false,
      message: e.message,
    }
  }
}

export const unstakingForRewardHero = async (heroId, amount) => {
  try {
    const staking = await unstake(heroId, amount)
    if (staking) {
      return {
        success: true,
        data: staking,
      }
    }
  } catch (e) {
    console.log('file: heroes.js ~ line 188 ~ stakingForRewardHero ~ e.message', e.message)

    return {
      success: false,
      message: e.message,
    }
  }
}

export const stakingForRewardHero = async (heroId, amount) => {
  try {
    const staking = await stakeForUpgradeLevel(heroId, amount)
    if (staking) {
      return {
        success: true,
        data: staking,
      }
    }
  } catch (e) {
    console.log('file: heroes.js ~ line 188 ~ stakingForRewardHero ~ e.message', e.message)

    return {
      success: false,
      message: e.message,
    }
  }
}

export const stakingForUpgradeStarHero = async (mainId, subId, amount) => {
  try {
    const staking = await upgradeStarForHero(mainId, subId, amount)
    if (staking) {
      return {
        success: true,
        data: staking,
      }
    }
  } catch (e) {
    console.log('file: heroes.js ~ line 188 ~ stakingForRewardHero ~ e.message', e.message)

    return {
      success: false,
      message: e.message,
    }
  }
}

export const checkPriceOfHeroOnSales = async (heroId) => {
  try {
    const { price } = await getHeroOnSale(heroId)
    return price
  } catch (e) {
    console.log('file: heroes.js ~ line 223 ~ checkPriceOffer ~ e', e.message)
    return null
  }
}

export const checkPriceOffer = async (heroId, buyer) => {
  try {
    const price = await getHerosWithOffers(heroId, buyer)
    return price.offer
  } catch (e) {
    console.log('file: heroes.js ~ line 223 ~ checkPriceOffer ~ e', e.message)
    return 0
  }
}

export const makeOfferHero = async (heroId, priceOffer) => {
  try {
    const success = await offerHero(heroId, priceOffer)
    if (success)
      return {
        success: true,
        status: 200,
        error: null,
        pagination: null,
        data: { message: `Hero has been offered for the price: ${priceOffer}` },
      }
    return {
      success: false,
      status: 404,
      error: 'Error! An error occurred. Please try again later',
      pagination: null,
      data: null,
    }
  } catch (e) {
    console.log('file: heroes.js ~ line 258 ~ makeOfferHero ~ error message:', e.message)
    return {
      success: false,
      status: 404,
      error: e.message,
      pagination: null,
      data: null,
    }
  }
}

export const cancelOfferedHero = async (heroId) => {
  try {
    const success = await cancelOffer(heroId)
    if (success)
      return {
        success: true,
        status: 200,
        error: null,
        pagination: null,
        data: { message: `Hero has been canceled` },
      }
    return {
      success: false,
      status: 404,
      error: 'Error! An error occurred. Please try again later',
      pagination: null,
      data: null,
    }
  } catch (e) {
    return {
      success: false,
      status: 404,
      error: e.message,
      pagination: null,
      data: null,
    }
  }
}

export const getListOfferHistory = async (heroId) => {
  try {
    const list = await getListOffer(heroId)
    return list
  } catch (e) {
    return null
  }
}

export const buyHeroInListOnSales = async (id, price) => {
  try {
    const success = await buyHero(id, price)
    if (success)
      return {
        success: true,
        status: 200,
        error: null,
        pagination: null,
        data: { message: `Buy Hero Successful` },
      }
    return {
      success: false,
      status: 404,
      error: 'Error! An error occurred. Please try again later',
      pagination: null,
      data: null,
    }
  } catch (e) {
    console.log('file: heroes.js ~ line 333 ~ addListHeroOnSale ~ e', e.message)
    return {
      success: false,
      status: 404,
      error: e.message,
      pagination: null,
      data: null,
    }
  }
}

export const addListHeroOnSale = async (heroId, price) => {
  try {
    const success = await listHeroOnSale(heroId, price)
    if (success)
      return {
        success: true,
        status: 200,
        error: null,
        pagination: null,
        data: { message: `Hero has been added to List Hero On Sale` },
      }
    return {
      success: false,
      status: 404,
      error: 'Error! An error occurred. Please try again later',
      pagination: null,
      data: null,
    }
  } catch (e) {
    return {
      success: false,
      status: 404,
      error: e.message,
      pagination: null,
      data: null,
    }
  }
}

export const removeHeroInListOnSale = async (heroId) => {
  try {
    const success = await delistHeroOnSale(heroId)
    if (success)
      return {
        success: true,
        status: 200,
        error: null,
        pagination: null,
        data: { message: `Hero has been removed from List Hero On Sale` },
      }
    return {
      success: false,
      status: 404,
      error: 'Error! An error occurred. Please try again later',
      pagination: null,
      data: null,
    }
  } catch (e) {
    return {
      success: false,
      status: 404,
      error: e.message,
      pagination: null,
      data: null,
    }
  }
}

export const takeChooseOfferedHero = async (heroId, buyer, offerPrice) => {
  try {
    const success = await takeOfferHero(heroId, buyer, offerPrice)
    if (success)
      return {
        success: true,
        status: 200,
        error: null,
        pagination: null,
        data: { message: `Take Offer is successful!` },
      }
    return {
      success: false,
      status: 404,
      error: 'Error! An error occurred. Please try again later',
      pagination: null,
      data: null,
    }
  } catch (e) {
    return {
      success: false,
      status: 404,
      error: e.message,
      pagination: null,
      data: null,
    }
  }
}

export const checkSummonStakingToken = async () => {
  try {
    const data = await getSummonStakingToken()
    if (data.result)
      return {
        success: true,
        status: 200,
        error: null,
        pagination: null,
        data: data.result,
      }
    return {
      success: false,
      status: 404,
      error: 'Error! An error occurred. Please try again later',
      pagination: null,
      data: null,
    }
  } catch (e) {
    return {
      success: false,
      status: 404,
      error: e.message,
      pagination: null,
      data: null,
    }
  }
}

export const approveSummonStakingToken = async (token) => {
  try {
    console.log('approve summon staking !')
    const res = await approveSummonStakingPool(token)
    if (res)
      return {
        success: true,
        status: 200,
        error: null,
        pagination: null,
        data: { ...res },
      }
    return {
      success: false,
      status: 404,
      error: 'Error! An error occurred. Please try again later',
      pagination: null,
      data: null,
    }
  } catch (e) {
    return {
      success: false,
      status: 404,
      error: e.message,
      pagination: null,
      data: null,
    }
  }
}

export const stakingSummonHero = async (amount) => {
  try {
    const res = await stakeForBuyHero(amount)
    if (res)
      return {
        success: true,
        status: 200,
        error: null,
        pagination: null,
        data: { ...res },
      }
    return {
      success: false,
      status: 404,
      error: 'Error! An error occurred. Please try again later',
      pagination: null,
      data: null,
    }
  } catch (e) {
    return {
      success: false,
      status: 404,
      error: e.message,
      pagination: null,
      data: null,
    }
  }
}

export const getBalanceStakedSummon = async () => {
  try {
    const res = await getBalanceSummon()
    if (res)
      return {
        success: true,
        status: 200,
        error: null,
        pagination: null,
        data: { ...res },
      }
    return {
      success: false,
      status: 404,
      error: 'Error! An error occurred. Please try again later',
      pagination: null,
      data: null,
    }
  } catch (e) {
    return {
      success: false,
      status: 404,
      error: e.message,
      pagination: null,
      data: null,
    }
  }
}

export const unstakingSummonHero = async () => {
  try {
    const res = await unstakeFromBuy()
    if (res)
      return {
        success: true,
        status: 200,
        error: null,
        pagination: null,
        data: { ...res },
      }
    return {
      success: false,
      status: 404,
      error: 'Error! An error occurred. Please try again later',
      pagination: null,
      data: null,
    }
  } catch (e) {
    return {
      success: false,
      status: 404,
      error: e.message,
      pagination: null,
      data: null,
    }
  }
}

export const getRewardStakingSummonHero = async (wallet) => {
  try {
    const res = await getReWardStaking(wallet)
    if (res)
      return {
        success: true,
        status: 200,
        error: null,
        pagination: null,
        data: res.tokensReward,
      }
    return {
      success: false,
      status: 404,
      error: 'Error! An error occurred. Please try again later',
      pagination: null,
      data: null,
    }
  } catch (e) {
    return {
      success: false,
      status: 404,
      error: e.message,
      pagination: null,
      data: null,
    }
  }
}

export const getTotalLockValueStakingSummonHero = async () => {
  try {
    const res = await getTotalBalanceSummonStaking()
    if (res)
      return {
        success: true,
        status: 200,
        error: null,
        pagination: null,
        data: res,
      }
    return {
      success: false,
      status: 404,
      error: 'Error! An error occurred. Please try again later',
      pagination: null,
      data: null,
    }
  } catch (e) {
    console.log('file: blockchain.js ~ line 1046 ~ returnnewPromise ~ error', e.message)

    return {
      success: false,
      status: 404,
      error: e.message,
      pagination: null,
      data: null,
    }
  }
}

export const getMaxAmountSummonHero = async (user) => {
  try {
    const res = await getMaxAmountSummon(user)
    if (res)
      return {
        success: true,
        status: 200,
        error: null,
        pagination: null,
        data: res,
      }
    return {
      success: false,
      status: 404,
      error: 'Error! An error occurred. Please try again later',
      pagination: null,
      data: null,
    }
  } catch (e) {
    console.log('file: blockchain.js ~ line 1046 ~ returnnewPromise ~ error', e.message)

    return {
      success: false,
      status: 404,
      error: e.message,
      pagination: null,
      data: null,
    }
  }
}

export const getAmountSummonedHero = async (user) => {
  try {
    const res = await getAmountSummoned(user)
    if (res)
      return {
        success: true,
        status: 200,
        error: null,
        pagination: null,
        data: res,
      }
    return {
      success: false,
      status: 404,
      error: 'Error! An error occurred. Please try again later',
      pagination: null,
      data: null,
    }
  } catch (e) {
    console.log('file: blockchain.js ~ line 1046 ~ returnnewPromise ~ error', e.message)

    return {
      success: false,
      status: 404,
      error: e.message,
      pagination: null,
      data: null,
    }
  }
}

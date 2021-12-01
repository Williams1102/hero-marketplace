import http from 'utilities/http'
export const fetchItemList = (params) => async (dispatch, getState) => {
  try {
    const result = await http.get('item-list-market', { params })

    return result
  } catch (err) {
    throw err
  }
}
export const fetchItemListWallet = (params) => async (dispatch, getState) => {
  try {
    const result = await http.get('item-list-wallet', { params })

    return result
  } catch (err) {
    throw err
  }
}
export const fetchHeroListUser = (params) => async (dispatch, getState) => {
  try {
    const result = await http.get('user_hero_list', { params })

    return result
  } catch (err) {
    throw err
  }
}

export const fetchHeroList = (params) => async (dispatch, getState) => {
  try {
    const result = await http.get('herolist', { params })

    return result
  } catch (err) {
    throw err
  }
}

export const fetchHeroListTraining = (params) => async (dispatch, getState) => {
  try {
    const result = await http.get('stake-hero-list', { params })

    return result
  } catch (err) {
    throw err
  }
}

export const fetchHeroTrainingExp = (params) => async (dispatch, getState) => {
  try {
    const result = await http.get('training-exp', { params })
    return result
  } catch (err) {
    throw err
  }
}

export const fetchHeroDetail = (params) => async (dispatch, getState) => {
  try {
    const result = await http.get('herodetail', { params })

    return result
  } catch (err) {
    throw err
  }
}

export const fetchHeroOfferList = (params) => async (dispatch, getState) => {
  try {
    const result = await http.get('hero/list-offer', { params })
    return result
  } catch (err) {
    throw err
  }
}

export const fetchHeroTransferList = (params) => async (dispatch, getState) => {
  try {
    const result = await http.get('hero/list-sale', { params })
    return result
  } catch (err) {
    throw err
  }
}

export const fetchItemDetail = (params) => async (dispatch, getState) => {
  try {
    const result = await http.get('item-market', { params })
    return result
  } catch (err) {
    throw err
  }
}
export const fetchItemDetailWallet = (params) => async (dispatch, getState) => {
  try {
    const result = await http.get('item-wallet', { params })
    return result
  } catch (err) {
    throw err
  }
}
export const buyItemOffChain = (data) => async (dispatch, getState) => {
  try {
    const result = await http.post('buy-item', data)
    return result
  } catch (err) {
    throw err
  }
}
export const listItemMarket = (data) => async (dispatch, getState) => {
  try {
    const result = await http.post('transfer-to-market', data)
    return result
  } catch (err) {
    throw err
  }
}

export const deListItemMarket = (data) => async (dispatch, getState) => {
  try {
    const result = await http.post('transfer-to-wallet', data)
    return result
  } catch (err) {
    throw err
  }
}

export const getBalance = (params) => async (dispatch, getState) => {
  try {
    const result = await http.get('user', { params })
    return result
  } catch (err) {
    throw err
  }
}

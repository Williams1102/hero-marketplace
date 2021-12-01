import { approveMarket, getMarketKabyToken } from './contracts/blockchain'

export const getApprovedMarketKabyToken = async () => {
  try {
    const token = await getMarketKabyToken()
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
    return {
      success: false,
      status: 404,
      error: e.message,
      pagination: null,
      data: null,
    }
  }
}

export const approveMarketKabyToken = async () => {
  try {
    const success = await approveMarket()
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

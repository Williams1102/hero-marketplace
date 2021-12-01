export const returnSuccess = (payload) => ({ success: true, data: payload })
export const returnError = (message) => ({ success: false, error: message })

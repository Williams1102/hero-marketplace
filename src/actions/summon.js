import http from 'utilities/http'

export const fetchHeroCountSummon = (params) => async (dispatch, getState) => {
  try {
    const result = await http.get('count_nft', { params })

    return result
  } catch (err) {
    throw err
  }
}

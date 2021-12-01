import http from 'utilities/http'
export const upgradeStar = async (data) => {
  try {
    const result = await http.post('upgrade-star', data)
    return result
  } catch (err) {
    throw err
  }
}

import { IS_MOUNTED } from './commonTypes'

export const setMounted = (isMounted) => ({
  type: IS_MOUNTED,
  isMounted,
})

import { createSelector } from 'reselect'

const getMounted = (state) => state.common

export const mount = createSelector([getMounted], (common) => common.isMounted)

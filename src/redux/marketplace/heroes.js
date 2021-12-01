import { createSlice } from '@reduxjs/toolkit'
import { loadHeroMarketplace } from './heroAction'

const initHeroState = {
  listHero: [],
  heroSelector: -1,
  limit: 12,
  skip: 0,
}

const heroSlices = createSlice({
  name: 'heroSlices',
  initialState: initHeroState,
  reducers: {
    selectedHero: (state, { payload }) => {
      state.heroSelector = payload.heroIndex
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadHeroMarketplace.fulfilled, (state, { payload }) => {
      state.listHero = payload.data
      state.limit = payload.limit
      state.skip = payload.skip
    })
  },
})

export const { selectedHero } = heroSlices.actions
export default heroSlices.reducer

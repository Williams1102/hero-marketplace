import { createAsyncThunk } from '@reduxjs/toolkit'
import { getInfoMarketplace } from 'services/contracts/heroMarketNFT'

export const loadHeroMarketplace = createAsyncThunk(
  'loadHeroMarketplace',
  async ({ limit, skip }, { dispatch }) => {
    // const { limit, skip } = { limit: 12, skip: 0 }
    try {
      const res = await getInfoMarketplace({ limit, skip })
      if (res.success)
        return {
          data: res.data,
          limit,
          skip,
        }
      return {
        data: [],
        limit,
        skip,
      }
    } catch (e) {
      console.log('🚀 ~ file: heroAction.js ~ line 21 ~ e', e.message)
      return {
        data: [],
        limit,
        skip,
      }
    }
  }
)

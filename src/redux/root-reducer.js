import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import userReducer from './user/user.reducer'
import common from './common/commonReducer'
import heroSlices from './marketplace/heroes'

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = (history) =>
  persistReducer(
    persistConfig,
    combineReducers({
      router: connectRouter(history),
      user: userReducer,
      common,
      heroSlices,
    })
  )

export default rootReducer

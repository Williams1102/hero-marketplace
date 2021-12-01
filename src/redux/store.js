import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'
import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

import rootReducer from './root-reducer'

export const history = createBrowserHistory()

const middlewares = [thunk, routerMiddleware(history)]

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger)
}

const store = createStore(rootReducer(history), applyMiddleware(...middlewares))

export const getStore = () => store

export default store

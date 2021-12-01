import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { Provider } from 'react-redux'
import store, { history } from './redux/store'
import './fonts/American Captain.ttf'
import { getLibrary } from 'utilities/helpers'
import { Web3ReactProvider } from '@web3-react/core'

import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'owl.carousel/dist/assets/owl.carousel.css'
import 'owl.carousel/dist/assets/owl.theme.default.css'
import './index.css'

ReactDOM.render(
  <Provider store={store}>
    <Web3ReactProvider getLibrary={getLibrary}>
      <App history={history} />
    </Web3ReactProvider>
  </Provider>,
  document.getElementById('root')
)

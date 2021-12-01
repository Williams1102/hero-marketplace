import './App.css'
import { ConnectedRouter } from 'connected-react-router'
import { ToastContainer } from 'react-toastify'

import AppRouters from './routers'
import 'react-toastify/dist/ReactToastify.css'
require('./assets/css/style.css')

const App = ({ history }) => {
  return [
    <ConnectedRouter history={history}>
      <AppRouters />
    </ConnectedRouter>,
    <ToastContainer
      key="toast"
      hideProgressBar
      pauseOnHover={false}
      pauseOnFocusLoss={false}
      autoClose={3000}
      position="top-right"
    />,
  ]
}
export default App

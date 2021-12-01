import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import { LOGIN_GREETING_PATH } from '../configs/route_path'

const PrivateRoute = ({ isLoggedIn, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        !isLoggedIn ? <Redirect to={LOGIN_GREETING_PATH} /> : <Component {...props} />
      }
    />
  )
}

const mapStateToProps = (state) => {
  const { user } = state
  return {
    isLoggedIn: !!user.currentUser,
  }
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute)

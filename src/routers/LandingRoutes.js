import React, { lazy } from 'react'
import * as routePath from 'configs/route_path'
import LandingLayout from 'containers/layout/LandingPageLayout'
import { Switch, Route, Redirect } from 'react-router-dom'

const Roadmap = lazy(() => import('containers/roadmap/RoadMapContainer'))
const Home = lazy(() => import('containers/home/NewHomeContainer'))
const Gameplay = lazy(() => import('containers/gameplay/GamePlayContainer'))
const Token = lazy(() => import('containers/tokenicon/TokenIconContainer'))

const LandingRoutes = () => (
  <LandingLayout>
    <Switch>
      <Route path={routePath.ROADMAP_PATH} component={Roadmap}></Route>
      <Route path={routePath.GAME_PATH} component={Gameplay}></Route>
      <Route path={routePath.TOKENICON_PATH} component={Token}></Route>
      <Route path={routePath.HOME_PATH} component={Home} exact></Route>
      <Redirect to="/not-found" />
    </Switch>
  </LandingLayout>
)
export default LandingRoutes

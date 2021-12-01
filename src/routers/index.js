import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import * as routePath from 'configs/route_path'
import ScrollToTop from './ScrollToTop'

// const LandingRoutes = lazy(() => import('./LandingRoutes'))
const AppRoutes = lazy(() => import('./AppRoutes'))
const NotFound = lazy(() => import('components/notFound/NotFound'))
// const Maintain = lazy(() => import('../containers/maintain/MaintainContainer'))
const AppRouter = () => (
  <Router>
    <Suspense fallback={<div> </div>}>
      <ScrollToTop>
        <Switch>
          <Redirect from="/hero/:networdId/:id" to={routePath.HERO_DETAIL} />
          <Redirect from="/training" to={routePath.TRAINING} />
          <Redirect from="/wallet" to={routePath.WALLET_PATH} />
          <Redirect from="/summon" to={routePath.SUMON_PATH} />
          <Redirect from="/stake" to={routePath.STAKE_PATH} />
          {/* <Redirect from="/market?param=item" to={routePath.MAINTAIN} /> */}
          {/* <Redirect from="/wallet?param=item" to={routePath.MAINTAIN} /> */}
          {/* <Redirect from="/app/account" to={routePath.MAINTAIN} /> */}
          {/* <Redirect from="/app/hero/:networdId/:id" to={routePath.MAINTAIN} />
          <Redirect from="/app/training" to={routePath.MAINTAIN} />
          <Redirect from="/app/wallet" to={routePath.MAINTAIN} />
          <Redirect from="/app/summon" to={routePath.MAINTAIN} />
          <Redirect from="/app/stake" to={routePath.MAINTAIN} />
          <Redirect from="/app/market" to={routePath.MAINTAIN} />
          <Redirect from="/app" to={routePath.MAINTAIN} /> */}
          {/* <Route path="/maintain" component={Maintain}></Route> */}
          <Route path="/not-found" component={NotFound} />
          <Route path="/app/not-found" component={NotFound} />
          {/* <Route path="/app/maintain" component={Maintain} /> */}
          <Route path={'/app'} component={AppRoutes}></Route>
          <Redirect from="/" to={routePath.MARKET_PATH} />

          {/* <Route path={"/"} component={LandingRoutes}></Route> */}
        </Switch>
      </ScrollToTop>
    </Suspense>
  </Router>
)
export default AppRouter

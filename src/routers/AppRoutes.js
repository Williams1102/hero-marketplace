import React, { lazy } from 'react'
import * as routePath from 'configs/route_path'
import { AppLayout } from 'containers/layout/NewAppLayout'
import { Switch, Route } from 'react-router-dom'
const Market = lazy(() => import('containers/market-new-design/NewMarketPage'))
//const Summon = lazy(() => import("containers/summon/SummonPageContainer"));
const Stake = lazy(() => import('containers/Stake/StakeContainer'))
const Wallet = lazy(() => import('containers/wallet/WalletContainer'))
const Training = lazy(() => import('containers/training/TrainingContainer'))
const HeroDetail = lazy(() => import('containers/hero-detail/HeroDetailContainer'))
const ItemDetail = lazy(() => import('containers/item-detail/ItemDetailContainer'))
const Account = lazy(() => import('containers/accounts'))
// const Maintain = lazy(() => import('containers/maintain/MaintainContainer'))
const AppRoutes = () => (
  <Switch>
    <AppLayout>
      {/* <Route path={routePath.MAINTAIN} component={Maintain}></Route> */}
      {/* <Route path={routePath.MARKET_PATH} component={Market}></Route>
      <Route path={routePath.STAKE_PATH} component={Stake}></Route>
      <Route path={routePath.WALLET_PATH} component={Wallet}></Route>
      <Route path={routePath.TRAINING} component={Training}></Route>
      <Route path={routePath.HERO_DETAIL} component={HeroDetail}></Route>
      <Route path={routePath.ITEM_DETAIL} component={ItemDetail}></Route>
      <Route path={routePath.ACCOUNT} component={Account}></Route> */}
      <Route path={routePath.MARKET_PATH} component={Market}></Route>
      <Route path={routePath.STAKE_PATH} component={Stake}></Route>
      <Route path={routePath.WALLET_PATH} component={Wallet}></Route>
      <Route path={routePath.TRAINING} component={Training}></Route>
      <Route path={routePath.HERO_DETAIL} component={HeroDetail}></Route>
      <Route path={routePath.ITEM_DETAIL} component={ItemDetail}></Route>
      <Route path={routePath.ACCOUNT} component={Account}></Route>
      {/* <Route path={routePath.MAINTAIN} component={Maintain}></Route> */}
    </AppLayout>
  </Switch>
)
export default AppRoutes

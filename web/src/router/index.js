import React from 'react'
import {Router, Route, hashHistory, IndexRoute, Redirect} from 'react-router'
import IsLogin from '@/utils/isLogin'

import Home from '@/pages/home';
import Recode from '@/pages/recode'
import Login from '@/pages/user/login';
// import Register from '@/pages/user/register'
import Types from '@/pages/types'


const Routes = () => (
  <Router history={hashHistory}>
    <Route exact path="/" component={Home} onEnter={IsLogin()}>
      <IndexRoute component={Recode}/>
      <Route exact path="login" component={Login}/>
      <Route exact path="types" component={Types}/>
    </Route>
  </Router>
);


export default Routes;
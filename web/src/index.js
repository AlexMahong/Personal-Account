import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'

import Routes from './router'
import 'antd-mobile/dist/antd-mobile.css';  // or 'antd-mobile/dist/antd-mobile.less'

import './assets/css/style.less'

// import store from './store'

ReactDOM.render(
  // <Provider store={store}>
    <Routes/>
  // </Provider>
  ,
  document.getElementById('app')
)
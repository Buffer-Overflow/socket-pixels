import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'
import App from './components/frontend/App'

let routes =
  <Router history={browserHistory}>
    <Route path="/" component={App} />
  </Router>

render(routes, document.getElementById('root'))

/* eslint-env browser */
import React from 'react'
import { render } from 'react-dom'
import 'normalize.css/normalize.css'
import App from './components'

render(
  React.createElement(App),
  document.getElementById('app'),
)

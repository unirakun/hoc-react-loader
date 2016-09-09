import React from 'react'
import { render } from 'react-dom'

import 'normalize.css/normalize.css'

/* eslint import/no-extraneous-dependencies: 0 import/no-unresolved: 0 */
import 'file?name=[name].[ext]!./index.html'
import 'file?name=[name].[ext]!./favicon.gif'

import App from './components'

/* eslint-env browser */
render(
  <App />
  , document.getElementById('app')
)

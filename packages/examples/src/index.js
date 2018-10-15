import React from 'react'
import { render } from 'react-dom'
import 'normalize.css/normalize.css'
import App from './components'

render(
  <App />,
  document.getElementById('app'), // eslint-disable-line browser
)

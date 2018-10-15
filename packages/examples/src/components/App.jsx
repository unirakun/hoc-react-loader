import React from 'react'
import Examples from './Examples'
import './App.scss'

const App = () => (
  <div className="app">
    <img className="icon" src="/favicon.png" alt="presentation" />

    <h1>
      hoc-react-loader
    </h1>

    <div className="github">
      <a
        className="github-button"
        href="https://github.com/alakarteio/hoc-react-loader"
        data-style="mega"
        data-count-href="/alakarteio/hoc-react-loader/stargazers"
        data-count-api="/repos/alakarteio/hoc-react-loader#stargazers_count"
        data-count-aria-label="# stargazers on GitHub"
        aria-label="Star alakarteio/hoc-react-loader on GitHub"
      >
        Star it on github
      </a>
    </div>

    <p className="app-description">
      This is a higher order component ("HOC").
      Its purpose is to call a
      <pre>load</pre>
      callback passed through the
      <pre>props</pre>
      of a component only once (at
      <pre>componentWillMount</pre>
      ). This is convenient to load
      data from a backend for instance. The component shows a loading indicator when it's
      waiting for the props to be defined. The loading indicator can be changed easily.
    </p>

    <p className="description">
      Check out the examples below. Use the button to trigger a stubbed loading.
    </p>

    <Examples className="app" />
  </div>
)

export default App

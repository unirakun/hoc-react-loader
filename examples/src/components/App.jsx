import React from 'react'

/* eslint-disable import/no-extraneous-dependencies */
import Icon from 'favicon.png'
/* eslint-enable import/no-extraneous-dependencies */

import Examples from './Examples'
import styles from './App.scss'

const App = () => (
  <div className={styles.app}>
    <img className={styles.icon} src={Icon} role="presentation" />

    <h1>
      hoc-react-loader
    </h1>

    <div className={styles.github}>
      <a
        className="github-button"
        href="https://github.com/zenika/react-loader"
        data-style="mega"
        data-count-href="/zenika/react-loader/stargazers"
        data-count-api="/repos/zenika/react-loader#stargazers_count"
        data-count-aria-label="# stargazers on GitHub"
        aria-label="Star zenika/react-loader on GitHub"
      >
        Star it on github
      </a>
    </div>

    <p className={styles.description}>
      This is a higher order component ("HOC").
      Its purpose is to call a <pre>load</pre> callback passed through the <pre>props</pre> of
      a component only once (at <pre>componentWillMount</pre>). This is convenient to load
      data from a backend for instance. The component shows a loading indicator when it's
      waiting for the props to be defined. The loading indicator can be changed easily.
    </p>

    <p className={styles.description}>
      Check out the examples below. Use the button to trigger a stubbed loading.
    </p>

    <Examples className={styles.app} />
  </div>
)

export default App

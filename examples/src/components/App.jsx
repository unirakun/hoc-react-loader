import React from 'react'

import Examples from './Examples'
import styles from './App.scss'
import Icon from 'favicon.gif'

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
      {"hoc-react-loader is an higher order component to call a function whenever "}
      {"a props is undefined."}
      {"It shows a placeholder component when it waits for the props."}
    </p>

    <p className={styles.description}>
      {"Check out the examples below. Use the button to trigger a stubed load."}
    </p>

    <Examples className={styles.app} />
  </div>
)

export default App

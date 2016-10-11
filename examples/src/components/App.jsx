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
      {'hoc-react-loader is an higher order component calling a function '}
      {'when a watched prop value is falsy. '}
      {'It shows a loading component when it\'s waiting for the props to be defined. '}
      {'This loading component can be changed easely.'}
    </p>

    <p className={styles.description}>
      {'Check out the examples below. Use the button to trigger stubed load.'}
    </p>

    <Examples className={styles.app} />
  </div>
)

export default App

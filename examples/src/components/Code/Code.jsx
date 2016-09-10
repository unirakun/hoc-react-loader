import React, { PropTypes } from 'react'
import '!!style!css!highlight.js/styles/github.css'
import Highlight from 'react-highlight'

import styles from './Code.scss'

const Code = ({ style, className, children }) => (
  <Highlight style={style} className={`javascript ${styles.code} ${className}`}>
    {children}
  </Highlight>
)

Code.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
}

export default Code

import React from 'react'
import PropTypes from 'prop-types'
import '!!style!css!highlight.js/styles/github.css' // eslint-disable-line import/no-webpack-loader-syntax, import/no-unresolved
import Highlight from 'react-highlight'

import styles from './Code.scss'

const Code = ({
  style,
  className,
  children,
}) => (
  <Highlight
    style={style}
    className={`javascript ${styles.code} ${className}`}
  >
    {children}
  </Highlight>
)

Code.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
}

Code.defaultProps = {
  style: {},
  className: '',
}

export default Code

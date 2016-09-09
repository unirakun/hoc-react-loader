import React, { PropTypes } from 'react'

import Example from 'Example'
import styles from './Examples.scss'

import Base from './Base'

const Examples = ({ style, className }) => (
  <div style={style} className={`${styles.examples} ${className}`}>
    <Example
      className={styles.example}
      link="Base"
      code="export&nbsp;default loader(Base)"
    >
      <Base />
    </Example>
  </div>
)

Examples.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
}

export default Examples

import React, { PropTypes } from 'react'

/* eslint-disable import/no-extraneous-dependencies */
import Example from 'Example'
/* eslint-enable import/no-extraneous-dependencies */

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

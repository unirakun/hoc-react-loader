import React, { PropTypes } from 'react'
import Ink from 'react-ink'

import styles from './Button.scss'

const Button = ({ style, className, onClick }) => (
  <button onClick={onClick} className={`${styles.button} ${className}`}>
    Click to change prop
    <Ink />
  </button>
)

export default Button

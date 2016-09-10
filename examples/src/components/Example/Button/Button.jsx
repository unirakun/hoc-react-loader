import React, { PropTypes } from 'react'
import Ink from 'react-ink'

import styles from './Button.scss'

const Button = ({ style, className, onClick, loaded }) => (
  <button style={style} onClick={onClick} className={`${styles.button} ${className}`}>
    {loaded ? 'Unload' : 'Load'} data !
    <Ink />
  </button>
)

Button.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  loaded: PropTypes.bool.isRequired,
}

export default Button

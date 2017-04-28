import React, { PropTypes } from 'react'
import Ink from 'react-ink'

import styles from './Button.scss'

const Button = ({ style, className, onClick, toggle, text, toggleText, untoggleText }) => (
  <button style={style} onClick={onClick} className={`${styles.button} ${className}`}>
    {toggle ? untoggleText : toggleText} {text} !
    <Ink />
  </button>
)

Button.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  toggle: PropTypes.bool,
  text: PropTypes.string.isRequired,
  toggleText: PropTypes.string,
  untoggleText: PropTypes.string,
}

Button.defaultProps = {
  toggleText: 'Load',
  untoggleText: 'Unload',
}

export default Button

import React from 'react'
import PropTypes from 'prop-types'
import Ink from 'react-ink'
import './Button.scss'

const Button = ({
  style,
  className,
  onClick,
  toggled,
  text,
  toggleText,
  untoggleText,
}) => (
  <button
    className={`button ${className}`}
    style={style}
    onClick={onClick}
    type="button"
  >
    {`${toggled ? untoggleText : toggleText} ${text}!`}
    <Ink />
  </button>
)

Button.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  toggled: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  toggleText: PropTypes.string,
  untoggleText: PropTypes.string,
}

Button.defaultProps = {
  style: {},
  className: '',
  toggleText: 'Load',
  untoggleText: 'Unload',
}

export default Button

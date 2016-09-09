import React, { PropTypes } from 'react'

import dynStyle from './style'

const Dot = ({ style, className, children, opacity }) => (
  <div style={dynStyle(style, opacity)} className={className}>{children || '\u00a0'}</div>
)

Dot.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.node,
  opacity: PropTypes.number.isRequired,
}

export default Dot

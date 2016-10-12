import React, { PropTypes } from 'react'
import loader from 'hoc-react-loader'

const Base = ({ className = '' }) => (
  <div className={className}>Loaded ! </div>
)

Base.propTypes = {
  className: PropTypes.string,
}

export default loader(Base)

import React, { PropTypes } from 'react'
import loader from 'hoc-react-loader'

const TwoParams = ({ className = '', prop, prop2 }) => {
  return (
    <div className={className}>
      Loaded (prop = {prop} || prop2 = {prop2})
    </div>
  )
}

TwoParams.propTypes = {
  className: PropTypes.string,
  prop: PropTypes.string.isRequired,
  prop2: PropTypes.string.isRequired,
}

export default loader(TwoParams, { wait: ['prop', 'prop2'] })

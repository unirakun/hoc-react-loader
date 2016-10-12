import React, { PropTypes } from 'react'
import loader from 'hoc-react-loader'

const OneParam = ({ className = '', prop }) => {
  return (
    <div className={className}>
      Loaded (prop = {prop})
    </div>
  )
}

OneParam.propTypes = {
  className: PropTypes.string,
  prop: PropTypes.string.isRequired,
}

export default loader(OneParam, { wait: ['prop'] })

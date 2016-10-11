import React, { PropTypes } from 'react'
import loader from 'hoc-react-loader'

const DontWait = ({ className = '' }) => {
  return (
    <div className={className}>
      Loaded without waiting!
    </div>
  )
}

DontWait.propTypes = {
  className: PropTypes.string,
  prop: PropTypes.string.isRequired,
}

export default loader(DontWait, { wait: false })

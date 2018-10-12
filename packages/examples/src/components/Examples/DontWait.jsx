import React from 'react'
import { PropTypes } from 'prop-types'
import loader from '@hoc-react-loader/full'

const DontWait = ({ className }) => (
  <div className={className}>
    Loaded without waiting!
  </div>
)

DontWait.propTypes = {
  className: PropTypes.string,
}

DontWait.defaultProps = {
  className: undefined,
}

export default loader({ print: true })(DontWait)

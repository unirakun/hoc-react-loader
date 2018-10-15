import React from 'react'
import { PropTypes } from 'prop-types'
import loader from '@hoc-react-loader/full'

const TwoParams = ({ className, prop, prop2 }) => (
  <div className={className}>
    {`Loaded (prop = ${prop} || prop2 = ${prop2})`}
  </div>
)

TwoParams.propTypes = {
  className: PropTypes.string,
  prop: PropTypes.string.isRequired,
  prop2: PropTypes.string.isRequired,
}

TwoParams.defaultProps = {
  className: undefined,
}

export default loader({ print: ['prop', 'prop2'] })(TwoParams)

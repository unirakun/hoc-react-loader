import React from 'react'
import { PropTypes } from 'prop-types'
import loader from '@hoc-react-loader/full'

const OneParam = ({ className = '', prop }) => (
  <div className={className}>
    {`Loaded (prop = ${prop})`}
  </div>
)

OneParam.propTypes = {
  className: PropTypes.string,
  prop: PropTypes.string.isRequired,
}

OneParam.defaultProps = {
  className: undefined,
}

export default loader({ print: ['prop'] })(OneParam)

import React from 'react'
import { PropTypes } from 'prop-types'
import loader from '@hoc-react-loader/full'

const Base = ({ className }) => (
  <div className={className}>
    Loaded!
  </div>
)

Base.propTypes = {
  className: PropTypes.string,
}

Base.defaultProps = {
  className: undefined,
}

export default loader()(Base)

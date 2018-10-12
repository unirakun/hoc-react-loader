import React from 'react'
import { PropTypes } from 'prop-types'
import loader from '@hoc-react-loader/full'

const CustomLoadingIndicator = props => <div {...props}>Wait ...</div>

const LoadingIndicator = ({ className }) => (
  <div className={className}>
    Loaded!
  </div>
)

LoadingIndicator.propTypes = {
  className: PropTypes.string,
}

LoadingIndicator.defaultProps = {
  className: undefined,
}

export default loader({ LoadingIndicator: CustomLoadingIndicator })(LoadingIndicator)

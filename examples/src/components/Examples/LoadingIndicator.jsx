import React, { PropTypes } from 'react'
import loader from 'hoc-react-loader'

const CustomLoadingIndicator = (props) => <div {...props}>Wait ...</div>

const LoadingIndicator = ({ className = '' }) => (
  <div className={className}>Loaded ! </div>
)

LoadingIndicator.propTypes = {
  className: PropTypes.string,
}

export default loader(LoadingIndicator, { LoadingIndicator: CustomLoadingIndicator })

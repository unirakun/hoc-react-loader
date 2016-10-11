import React, { PropTypes } from 'react'
import loader from 'hoc-react-loader'

const CustomLoader = (props) => <div {...props}>Wait ...</div>

const Loader = ({ className = '' }) => (
  <div className={className}>Loaded ! </div>
)

Loader.propTypes = {
  className: PropTypes.string,
}

export default loader(Loader, { Loader: CustomLoader })

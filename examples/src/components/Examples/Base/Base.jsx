import React, { PropTypes } from 'react'

import loader from 'hoc-react-loader'

const Base = (props) => (
  <div>Loaded ! </div>
)

export default loader(Base)

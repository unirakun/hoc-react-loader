import React, { PropTypes } from 'react'
import loader from 'hoc-react-loader'

import styles from './Base.scss'

const Base = ({ className = '' }) => (
  <div className={`${styles.base} ${className}`}>Loaded ! </div>
)

Base.propTypes = {
  className: PropTypes.string,
}

export default loader(Base)

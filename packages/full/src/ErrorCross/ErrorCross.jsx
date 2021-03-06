import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { findCorrectColor, INITIAL_COLOR } from '../utils'

class Cross extends Component {
  constructor(props) {
    super(props)

    this.state = {
      color: INITIAL_COLOR,
    }
  }

  attach = (div) => {
    const newColor = findCorrectColor(div)
    const { color } = this.state

    if (color !== newColor) {
      this.setState({ color: newColor })
    }
  }

  render() {
    const { color } = this.state
    const { style, className, message } = this.props

    return (
      <div
        title={message}
        ref={this.attach}
      >
        <svg
          height="38"
          width="38"
          viewBox="0 0 38 38"
          className={className}
          style={style}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
            id="path3728"
            d="M 1.5341128,1.5341128 36.465887,36.465887 m 0,-34.9317742 L 1.5341128,36.465887"
          />
        </svg>
      </div>
    )
  }
}

const { string, object } = PropTypes
Cross.propTypes = {
  message: string,
  className: string,
  style: object,
}

Cross.defaultProps = {
  message: 'An error occured',
  className: '',
  style: {},
}

export default Cross

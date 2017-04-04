import React, { PropTypes, Component } from 'react'
import tinycolor from 'tinycolor2'

/* global window */
const getBackgroundColor = (node) => {
  return window.getComputedStyle(node, null).getPropertyValue('background-color')
}


class Cross extends Component {
  constructor(props) {
    super(props)

    this.state = {
      color: '#cecece',
    }
  }

  componentDidMount() {
    this.setColor()
  }

  setColor = () => {
    let parent = this.div && this.div.parentNode
    let parentColor = parent ? getBackgroundColor(parent) : undefined

    while (parent && !parentColor) {
      parent = parent.parentNode
      if (parent) parentColor = getBackgroundColor(parent)
    }

    if (parentColor) {
      const tinyC = tinycolor(parentColor)
      const color = tinyC.isDark() ? tinyC.lighten(20) : tinyC.darken(20)

      this.setState({
        color: color.toHexString(),
      })
    }
  }

  render() {
    const { color } = this.state
    const { style, className, message } = this.props

    return (
      <div
        title={message}
        ref={(c) => { this.div = c }}
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
            strokeWidth="3.03754568"
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

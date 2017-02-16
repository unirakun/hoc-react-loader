import React, { Component, PropTypes } from 'react'
import tinycolor from 'tinycolor2'

/* global window */
const getBackgroundColor = (node) => {
  return window.getComputedStyle(node, null).getPropertyValue('background-color')
}

// from https://github.com/SamHerbert/SVG-Loaders
class TailSpin extends Component {
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
    let parent = this.svg && this.svg.parentNode
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
    const { style, className } = this.props

    return (
      <svg
        ref={(c) => { this.svg = c }}
        width="38" height="38"
        viewBox="0 0 38 38"
        xmlns="http://www.w3.org/2000/svg"
        style={style}
        className={className}
      >
        <defs>
          <linearGradient x1="8.042%" y1="0%" x2="65.682%" y2="23.865%" id="a">
            <stop stopColor={color} stopOpacity=".2" offset="0%" />
            <stop stopColor={color} stopOpacity=".631" offset="63.146%" />
            <stop stopColor={color} stopOpacity=".8" offset="100%" />
          </linearGradient>
        </defs>
        <g fill="none" fillRule="evenodd">
          <g transform="translate(1 1)">
            <path d="M36 18c0-9.94-8.06-18-18-18" id="Oval-2" stroke="url(#a)" strokeWidth="2">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 18 18"
                to="360 18 18"
                dur="0.9s"
                repeatCount="indefinite"
              />
            </path>
            <circle fill={color} cx="36" cy="18" r="1">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 18 18"
                to="360 18 18"
                dur="0.9s"
                repeatCount="indefinite"
              />
            </circle>
          </g>
        </g>
      </svg>
    )
  }
}

TailSpin.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
}

export default TailSpin

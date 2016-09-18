import React, { Component, PropTypes } from 'react'

import Dot from './Dot'
import dynStyle from './style'

const MAX_DOTS = 3
const MAX_OPACITY = 0.6
const MIN_OPACITY = 0.1
const TIMEOUT = 1000

class Dots extends Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      opacities: Array.from(Array(MAX_DOTS)).map(() => MIN_OPACITY),
    }

    this.intervals = []
    this.timeouts = []
  }

  componentDidMount() {
    for (let i = 0; i < MAX_DOTS; ++i) {
      this.timeouts.push(setTimeout(() => this.runDot(i), (TIMEOUT / MAX_DOTS) * i))
    }
  }

  componentWillUnmount() {
    if (this.timeouts) {
      for (const timeout of this.timeouts) {
        clearTimeout(timeout)
      }
    }

    if (this.intervals) {
      for (const interval of this.intervals) {
        clearInterval(interval)
      }
    }
  }

  computeOpacity = (index) => {
    this.intervals.push(setInterval(() => {
      const { opacities } = this.state

      const newOpacities = [...opacities]
      newOpacities[index] = newOpacities[index] === MIN_OPACITY ? MAX_OPACITY : MIN_OPACITY

      this.setState({
        opacities: newOpacities,
      })
    }, TIMEOUT))
  }

  runDot = (index) => this.computeOpacity(index)

  render() {
    const { style, className } = this.props
    const { opacities } = this.state

    return (
      <div style={dynStyle(style)} className={className}>
        {opacities.map((i, index) => (
          <Dot key={index} opacity={opacities[index]} />
        ))}
      </div>
    )
  }
}

Dots.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
}

export default Dots

import React, { Component, PropTypes } from 'react'

import Dot from './Dot'
import dynStyle from './style'

const maxDots = 3
const maxOpacity = 0.6
const minOpacity = 0.1
const timeout = 1000

class Dots extends Component {
  constructor(props, context) {
    super(props, context)

    // FIXME : google help me to initialize this
    const opacities = []
    for (let i = 0; i < maxDots; ++i) opacities.push(minOpacity)

    this.state = {
      opacities,
    }

    this.intervals = []
  }

  componentDidMount() {
    for (let i = 0; i < maxDots; ++i) {
      setTimeout(() => this.runDot(i), (timeout / maxDots) * i)
    }
  }

  componentWillUnmount() {
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
      newOpacities[index] = newOpacities[index] === minOpacity ? maxOpacity : minOpacity

      this.setState({
        opacities: newOpacities,
      })
    }, timeout))
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

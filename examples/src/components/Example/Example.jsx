import React, { PropTypes, Component } from 'react'
import Ink from 'react-ink'

import Code from 'Code'
import Button from './Button'
import styles from './Example.scss'

const BASE_URL = 'https://github.com/Zenika/react-loader/blob/master/examples/src/components/Examples/'

class Example extends Component {
  constructor() {
    super()

    this.state = {
      loaded: false,
    }
  }

  onClick = () => {
    this.setState({
      loaded: !this.state.loaded,
    })
  }

  render() {
    const { style, className, code, children, link } = this.props

    return (
      <div style={style} className={`${styles.sample} ${className}`}>
        {React.cloneElement(children, { loaded: this.state.loaded, className: styles.result })}
        <a href={`${BASE_URL}${link}`}>
          <Code className={styles.code}>{code}</Code>
          <Ink />
        </a>
        <Button onClick={this.onClick} />
      </div>
    )
  }
}

Example.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  code: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  link: PropTypes.string.isRequired,
}

export default Example

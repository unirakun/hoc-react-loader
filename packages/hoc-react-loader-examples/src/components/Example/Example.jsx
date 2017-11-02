import React, { PropTypes, Component } from 'react'
import Ink from 'react-ink'

/* eslint-disable import/no-extraneous-dependencies */
import Code from 'Code'
/* eslint-enable import/no-extraneous-dependencies */

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

  onLoad = () => {
    this.setState({
      loaded: !this.state.loaded,
    })
  }

  onProp = () => {
    let { prop } = this.state
    prop = prop ? undefined : 'Yeah it works !'
    this.setState({
      prop,
    })
  }

  onProp2 = () => {
    let { prop2 } = this.state
    prop2 = prop2 ? undefined : 'Hello there :)'
    this.setState({
      prop2,
    })
  }

  render() {
    const { style, className, code, children, example, link, buttons = {} } = this.props
    const { loaded, prop, prop2 } = this.state

    return (
      <div>
        {children}
        <div style={style} className={`${styles.sample} ${className}`}>
          <a href={`${BASE_URL}${link}.jsx`}>
            <Code className={styles.code}>{code}</Code>
            <Ink />
          </a>
          {React.cloneElement(example, { ...this.state, className: styles.result })}
          <div className={styles.debug}>
            <h2>Props values</h2>
            <pre className={styles.props}>
              {buttons['0'] && `loaded: ${loaded ? 'true' : 'false'}\n`}
              {buttons['1'] && `prop: ${prop || 'undefined'}\n`}
              {buttons['2'] && `prop2: ${prop2 || 'undefined'}\n`}
            </pre>
          </div>
          <div className={styles.buttons}>
            {buttons['0'] &&
              <Button onClick={this.onLoad} loaded={this.state.loaded} text="data" />
            }
            {buttons['1'] &&
              <Button onClick={this.onProp} loaded={this.state.prop} text="prop" />
            }
            {buttons['2'] &&
              <Button onClick={this.onProp2} loaded={this.state.prop2} text="prop2" />
            }
          </div>
        </div>
      </div>

    )
  }
}

Example.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  code: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  buttons: PropTypes.object.isRequired,
  children: PropTypes.node,
  example: PropTypes.node,
}

export default Example

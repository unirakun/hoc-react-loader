import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import Ink from 'react-ink'
import Code from '../Code'
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
    this.setState(state => ({
      ...state,
      loaded: !state.loaded,
    }))
  }

  onError = () => {
    this.setState(state => ({
      ...state,
      error: state.error ? undefined : 'A (fake) error occured !',
    }))
  }

  onProp = () => {
    this.setState(state => ({
      ...state,
      prop: state.prop ? undefined : 'Yeah it works !',
    }))
  }

  onProp2 = () => {
    this.setState(state => ({
      ...state,
      prop2: state.prop2 ? undefined : 'Yeah it works !',
    }))
  }

  render() {
    const {
      style,
      className,
      code,
      children,
      example,
      link,
      buttons = {},
    } = this.props

    const {
      loaded,
      prop,
      prop2,
      error,
    } = this.state

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
              {buttons['3'] && `error: ${error || 'undefined'}\n`}
            </pre>
          </div>
          <div className={styles.buttons}>
            {buttons['0'] && (
              <Button onClick={this.onLoad} toggled={loaded} text="data" />
            )}
            {buttons['1'] && (
              <Button onClick={this.onProp} toggled={prop} text="prop" />
            )}
            {buttons['2'] && (
              <Button onClick={this.onProp2} toggled={prop2} text="prop2" />
            )}
            {buttons['3'] && (
              <Button
                onClick={this.onError}
                toggled={!!error}
                toggleText="Trigger"
                untoggleText="Clear"
                text="error"
              />
            )}
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

Example.defaultProps = {
  style: {},
  className: undefined,
  children: undefined,
  example: undefined,
}

export default Example

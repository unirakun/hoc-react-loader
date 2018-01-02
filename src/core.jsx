/* eslint react/prop-types: 0 */
import React, { Component } from 'react'

const getTypeOf = (something) => {
  const getType = {}
  return something && getType.toString.call(something)
}

// http://stackoverflow.com/a/7356528
const isFunction = (functionToCheck) => {
  const type = getTypeOf(functionToCheck)
  return type && type === '[object Function]'
}

const isString = (stringToCheck) => {
  const type = getTypeOf(stringToCheck)
  return type && type === '[object String]'
}

const hasStatus = (prop, propProcessor, defaultProp, defaultValue) => (props, state, context) => {
  if (prop === undefined) {
    const status = props[defaultProp]
    return status === undefined ? defaultValue : !!status
  }

  if (Array.isArray(prop)) {
    const boolProps = prop.map(p => !!props[p])
    return propProcessor(boolProps)
  }

  if (isFunction(prop)) {
    return !!prop(props, context)
  }

  return !!prop
}

const getDisplayName = c => c.displayName || c.name || 'Component'

export default (
  {
    LoadingIndicator,
    ErrorIndicator,
    print,
    load,
    error,
    delay,
  } = {},
) => {
  const loadFunctionName = isString(load) ? load : 'load'
  const isLoadFunction = isFunction(load)

  const isLoaded = hasStatus(print, bs => !bs.includes(false), 'loaded', true)
  const isInError = hasStatus(error, bs => bs.includes(true), 'error', false)

  return (ComposedComponent) => {
    const displayName = `Loader(${getDisplayName(ComposedComponent)})`

    return class extends Component {
      static displayName = displayName

      state = {
        props: {},
        pastDelay: false,
      }

      omitLoadInProps = (props) => {
        const isLoadAFunction = isFunction(props[loadFunctionName])

        if (isLoadAFunction) {
          this.setState({
            props: {
              ...props,
              [loadFunctionName]: undefined,
            },
          })
        } else {
          this.setState({ props })
        }

        return isLoadAFunction
      }

      componentWillMount() {
        // Load from hoc argument
        if (isLoadFunction) {
          load(this.props, this.context)
        }

        // Load from props
        if (this.omitLoadInProps(this.props)) {
          this.props[loadFunctionName](this.props, this.context)
        }
      }

      componentDidMount() {
         // set delay
        if (delay) {
          setTimeout(() => this.setState(state => ({ ...state, pastDelay: true })), delay)
        }
      }

      componentWillReceiveProps = (nextProps) => {
        this.omitLoadInProps(nextProps)
      }

      render() {
        if (delay && !this.state.pastDelay) {
          return null
        }

        if (isInError(this.props, this.state, this.context)) {
          return <ErrorIndicator {...this.state.props} />
        }

        if (isLoaded(this.props, this.state, this.context)) {
          return <ComposedComponent {...this.state.props} />
        }

        return <LoadingIndicator {...this.state.props} />
      }
    }
  }
}

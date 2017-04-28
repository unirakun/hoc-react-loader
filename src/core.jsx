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

const getDisplayName = c => c.displayName || c.name || 'Component'

export default (
  ComposedComponent,
  {
    LoadingIndicator,
    ErrorIndicator,
    print,
    load,
    error,
  } = {},
) => {
  const loadFunctionName = isString(load) ? load : 'load'

  return class extends Component {
    static displayName = `Loader(${getDisplayName(ComposedComponent)})`

    state = {
      props: {},
    }

    isInState = (prop, propProcessor, substitutionProp, defaultValue) => {
      // Print is undefined,
      // we rely on 'props[substitutionProp' if present
      // if not, we directly print the component
      if (prop === undefined) {
        const inState = this.props[substitutionProp]
        return inState === undefined ? defaultValue : !!inState
      }

      // prop is an array
      // Implicitly meaning that this is an array of props
      if (Array.isArray(prop)) {
        const boolProps = prop.map(p => Boolean(this.props[p]))
        return propProcessor(boolProps)
      }

      // Prop is a function
      if (isFunction(prop)) {
        return !!prop(this.props, this.context)
      }

      // Anything else
      return !!prop
    }

    isPrinted = () => this.isInState(print, boolProps => boolProps.every(p => !!p), 'loaded', true)
    isInError = () => this.isInState(error, boolProps => boolProps.includes(true), 'error', false)

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
      if (isFunction(load)) {
        load(this.props, this.context)
      }

      // Load from props
      if (this.omitLoadInProps(this.props)) {
        this.props[loadFunctionName](this.props, this.context)
      }
    }

    componentWillReceiveProps = (nextProps) => {
      this.omitLoadInProps(nextProps)
    }

    render() {
      if (this.isInError()) {
        return <ErrorIndicator {...this.state.props} />
      } else if (this.isPrinted()) {
        return <ComposedComponent {...this.state.props} />
      }

      return <LoadingIndicator {...this.state.props} />
    }
  }
}

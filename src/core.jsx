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
  {
    LoadingIndicator,
    print,
    load,
  } = {},
) => {
  const loadFunctionName = isString(load) ? load : 'load'
  const isPrintArray = Array.isArray(print)
  const isPrintFunction = isFunction(print)
  const isLoadFunction = isFunction(load)

  const isLoaded = (props, state, context) => {
    // Print is undefined,
    // we rely on 'props.loaded' if present
    // if not, we directly print the component
    if (print === undefined) {
      const { loaded } = props
      return loaded === undefined ? true : !!loaded
    }

    // Print is an array
    // Implicitly meaning that this is an array of props
    if (isPrintArray) {
      return print
        .map(p => Boolean(props[p]))
        .reduce((allProps, currentProp) => allProps && currentProp)
    }

    // Print is a function
    if (isPrintFunction) {
      return !!print(props, context)
    }

    // Anything else
    return !!print
  }

  return (ComposedComponent) => {
    const displayName = `Loader(${getDisplayName(ComposedComponent)})`

    return class extends Component {
      static displayName = displayName

      state = {
        props: {},
        promiseLoaded: false,
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

      componentWillReceiveProps = (nextProps) => {
        this.omitLoadInProps(nextProps)
      }

      render() {
        if (!isLoaded(this.props, this.state, this.context)) {
          return <LoadingIndicator {...this.state.props} />
        }
        return <ComposedComponent {...this.state.props} />
      }
    }
  }
}

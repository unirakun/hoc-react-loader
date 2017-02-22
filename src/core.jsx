import React, { Component, PropTypes } from 'react'

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

const getDisplayName = (c) => c.displayName || c.name || 'Component'

export default (
  ComposedComponent,
  {
    LoadingIndicator,
    wait = ['loaded'],
    load = undefined,
  } = {},
) => {
  const loadFunctionName = isString(load) ? load : 'load'

  return class extends Component {
    static displayName = `Loader(${getDisplayName(ComposedComponent)})`
    static propTypes = {
      load: PropTypes.func,
    }

    state = {
      props: {},
    }

    isLoaded = () => {
      // Wait is an array
      // Implicitly meaning that this is an array of props
      if (Array.isArray(wait)) {
        return wait
          .map(w => Boolean(this.props[w]))
          .reduce((allProps, currentProp) => allProps && currentProp)
      }

      // Wait is a function
      if (isFunction(wait)) {
        return wait(this.props, this.context)
      }

      // Anything else
      return !wait
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
      if (!this.isLoaded()) {
        return <LoadingIndicator {...this.state.props} />
      }

      return <ComposedComponent {...this.state.props} />
    }
  }
}

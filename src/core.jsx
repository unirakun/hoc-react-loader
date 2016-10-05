import React, { Component, PropTypes } from 'react'

// http://stackoverflow.com/a/7356528
const isFunction = (functionToCheck) => {
  const getType = {}
  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]'
}
const getDisplayName = (c) => c.displayName || c.name || 'Component'

export default (
  ComposedComponent,
  {
    Loader,
    wait = ['loaded'],
    load = undefined,
  } = {},
) => {
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
      return Boolean(wait)
    }

    omitLoadInProps = (props) => {
      const isLoadAFunction = isFunction(props.load)

      if (isLoadAFunction) {
        this.setState({
          props: {
            ...props,
            load: undefined,
          },
        })
      } else {
        this.setState({ props })
      }

      return isLoadAFunction
    }

    componentWillMount() {
      // Load from props
      if (this.omitLoadInProps(this.props)) {
        this.props.load()
      }

      // Load from hoc argument
      if (isFunction(load)) {
        load()
      }
    }

    componentWillReceiveProps = (nextProps) => {
      this.omitLoadInProps(nextProps)
    }

    render() {
      if (!this.isLoaded()) {
        return <Loader {...this.state.props} />
      }

      return <ComposedComponent {...this.state.props} />
    }
  }
}

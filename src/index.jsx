import React, { Component, PropTypes } from 'react'

const getDisplayName = (c) => c.displayName || c.name || 'Component'

export default (
  ComposedComponent,
  config,
) => {
  const {
    Loader = null,
    prop = 'loaded',
    wait = true,
  } = config || {}

  return class extends Component {
    static displayName = `Loader(${getDisplayName(ComposedComponent)})`
    static propTypes = {
      load: PropTypes.func,
    }

    state = {
      props: {},
    }

    isLoaded = () => {
      return Boolean(this.props[prop])
    }

    isLoadAFunction = () => {
      return (typeof this.props.load === 'function')
    }

    omitLoadInProps = (props) => {
      const isLoadAFunction = this.isLoadAFunction()

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
      if (this.omitLoadInProps(this.props)) {
        this.props.load()
      }
    }

    componentWillReceiveProps = (nextProps) => {
      this.omitLoadInProps(nextProps)
    }

    render() {
      if (wait && !this.isLoaded()) {
        if (Loader) {
          return <Loader {...this.state.props} />
        }

        return null
      }

      return <ComposedComponent {...this.state.props} />
    }
  }
}

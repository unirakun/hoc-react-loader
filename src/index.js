import React, { Component, PropTypes } from 'react'

const getDisplayName = (c) => c.displayName || c.name || 'Component'

export default ComposedComponent => class extends Component {
  static displayName = `Loader(${getDisplayName(ComposedComponent)})`
  static propTypes = {
    load: PropTypes.func,
  }

  state = {
    props: {},
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
    return <ComposedComponent {...this.state.props} />
  }
}

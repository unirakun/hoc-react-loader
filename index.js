import React, { Component, PropTypes } from 'React'

export const Loader = ComposedComponent => class extends Component {
  static propTypes = {
    load: PropTypes.func,
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

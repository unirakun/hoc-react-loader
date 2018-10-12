# hoc-react-loader
[![CircleCI](https://circleci.com/gh/alakarteio/hoc-react-loader.svg?&style=shield)](https://circleci.com/gh/alakarteio/hoc-react-loader/tree/master) [![NPM Version](https://badge.fury.io/js/hoc-react-loader.svg)](https://www.npmjs.com/package/hoc-react-loader) [![Coverage Status](https://coveralls.io/repos/github/alakarteio/hoc-react-loader/badge.svg?branch=master)](https://coveralls.io/github/alakarteio/hoc-react-loader?branch=master)

This is a [higher order component](https://facebook.github.io/react/docs/higher-order-components.html) ("HOC"). It's an advanced pattern used in React that let you reuse code logic, it can be summarized as a component factory. It improves isolation, interoperability and maintainability of your code base.

**hoc-react-loader**'s purpose is to call a `load` callback passed through the `props` of a component only once (at `componentWillMount`). This is convenient to load data from a backend for instance. The component shows a loading indicator when it's waiting for the props to be defined. The loading indicator can be changed easily.

 - To see full documentation: [click here](./packages/core/README.md)
 - Do you want a default LoadingIndicator and a default ErrorIndicator?, you can use [@hoc-react-loader/full](./packages/full/README.md)
 - You want your bundle not being bloated?, you can use [@hoc-react-loader/core](./packages/core/README.md)

## Example
```jsx
import React from 'react'
import loader from '@hoc-react-loader/core'

const Component = ({ data }) => <div>Component {JSON.stringify(data)}</div>
const load = props => console.log(props)

export default loader({ print: ['data'], load })(Component)
```

In this example `load` will be called at first mount, then the wrapped `Component` will be printed only if `props.data` is truthy.

`load` function can be the moment you ask for your API data.

## Demos
You can test some examples [here](https://alakarteio.github.io/hoc-react-loader/).

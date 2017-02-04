# hoc-react-loader
[![CircleCI](https://circleci.com/gh/Zenika/hoc-react-loader.svg?&style=shield&circle-token=07eae4d9bdbe138c04d32753312ba543a4e08f34)](https://circleci.com/gh/Zenika/hoc-react-loader/tree/master) [![NPM Version](https://badge.fury.io/js/hoc-react-loader.svg)](https://www.npmjs.com/package/hoc-react-loader) [![Coverage Status](https://coveralls.io/repos/github/Zenika/hoc-react-loader/badge.svg?branch=master)](https://coveralls.io/github/Zenika/hoc-react-loader?branch=master)

This is a higher order component ("HOC"). Its purpose is to call a `load` callback passed through the `props` of a component only once (at `componentWillMount`). This is convenient to load data from a backend for instance. The component shows a loading indicator when it's waiting for the props to be defined. The loading indicator can be changed easily.

## Demos
You can test some examples [here](https://zenika.github.io/hoc-react-loader/).

## Installation
`npm i --save tinycolor2 hoc-react-loader`

`tinycolor2` is a peer dependency of `hoc-react-loader`. It handles color picking for the default loading indicator. You don't have to install it if you use your own loading indicator.

## Usage
### With `this.props`
```es6
import loader from 'hoc-react-loader'

const Component = ({ data }) => <div>Component {JSON.stringify(data)}</div>

export default loader(Component, { wait: ['data'] })
```
In this case, the loader waits for `this.props.data` to be truthy, then mounts its child component and calls `this.props.load` if it exists. This is useful when the parent has control over the injected data, or when the `Component` is connected with `redux`. `this.props.load` should be injected by the parent component or injected by a `Container` (redux).

The `wait` parameter should be an array of props to waits. All these props should become truthy at some point.

Since the `LoadingIndicator` is not specified, the default `LoadingIndicator` is displayed while waiting for all the props. Here's an exemple with a specified loader:
```es6
import loader from 'hoc-react-loader'

const MyLoadingIndicator = () => <div>Waiting...</div>
const Component = ({ data }) => <div>Component {data}</div>

export default loader(Component, { wait: ['data'], LoadingIndicator: MyLoadingIndicator })
```

### Don't wait
```es6
import loader from 'hoc-react-loader'

const Component = ({ data }) => <div>Component {JSON.stringify(data)}</div>

export default loader(Component, { wait: false })
```
In this example, the loader component doesn't wait for props. `this.props.load` is called once, but the `LoadingIndicator` component isn't displayed.

### Load as a function parameter
```es6
import loader from 'hoc-react-loader'

const Component = ({ data }) => <div>Component {JSON.stringify(data)}</div>

export default loader(Component, { load: () => console.log('here') })
```
In this case, the loader calls `this.props.load` if it exists *AND* the `load` parameter, resulting in `here` to be printed.

The default `wait` parameter value is `false`. It means that in this example the `LoadingIndicator` isn't displayed.

### Load as a string parameter
```es6
import loader from 'hoc-react-loader'

const Component = ({ data }) => <div>Component {JSON.stringify(data)}</div>

export default loader(Component, { load: 'myLoader' })
```
In this case, the loader calls `this.props.myLoader` if it exists.

The default `wait` parameter value is `false`. It means that in this example the `LoadingIndicator` isn't displayed.

### Wait as a function
The `wait` parameter can also be a function. Then the `context` and `props` are given to it, and it should return the array of props to wait for.

# hoc-react-loader
[![CircleCI](https://circleci.com/gh/Zenika/react-loader.svg?&style=shield&circle-token=07eae4d9bdbe138c04d32753312ba543a4e08f34)](https://circleci.com/gh/Zenika/react-loader/tree/master)
[![NPM Version](https://badge.fury.io/js/hoc-react-loader.svg)](https://www.npmjs.com/package/hoc-react-loader)
[![Coverage Status](https://coveralls.io/repos/github/Zenika/react-loader/badge.svg?branch=master)](https://coveralls.io/github/Zenika/react-loader?branch=master)

## what is this?
This is a higher order component (`HOC`).
This HOC purpose is to call a `load` callback passes in `props` of a component only once (at `componentWillMount`).
This is convenient to load data from a `backend` for instance.

It shows a loading component when it's waiting for the props to be defined.
This loading component can be changed easely.

## try it
You can test some examples [here](https://zenika.github.io/react-loader/).

## install
`npm i --save hoc-react-loader`

## use
### With `this.props`
```es6
import loader from 'hoc-react-loader'

const Component = ({ data }) => <div>Component {JSON.stringify(data)}</div>

export default loader(Component, { wait: ['data'] })
```
In this case, the loader `HOC` waits for `this.props.data` to be set and be equivalent to `true`.
This is usefull when the parent has control over the data injected, or when the `Component` is connected with `redux`.

Here, `this.props.load` is called once, when the component is mounted.
`this.props.load` should be injected by parent component or injected by a `Container` (redux).

The `wait` parameter can be an array of props to waits.
All the props listed should be set and be equivalent to `true`.

The `Loader` is not specified, so the default `Loader` is printed while waiting for all the props.
Here an exemple with a specified loader :
```es6
import loader from 'hoc-react-loader'

const MyLoader = () => <div>Waiting ...</div>
const Component = ({ data }) => <div>Component {data}</div>

export default loader(Component, { wait: ['data'], Loader: MyLoader })
```

### Don't wait
```es6
import loader from 'hoc-react-loader'

const Component = ({ data }) => <div>Component {JSON.stringify(data)}</div>

export default loader(Component, { wait: false })
```
In this example, the loader component doesn't wait for props.
`this.props.load` is called once, but the `Loader` component isn't printed.

### Load as a parameter
```es6
import loader from 'hoc-react-loader'

const Component = ({ data }) => <div>Component {JSON.stringify(data)}</div>

export default loader(Component, { load: () => console.log('here') })
```
In this case, the loader calls `this.props.load` if it exists *AND* the `load` parameter resulting in `here` to be printed.

The default `wait` parameter value is `false`. It means that in this example the `Loader` isn't printed.

### Wait as a function
The `wait` parameter could also be a function. Then the `context` and `props` are given to it.

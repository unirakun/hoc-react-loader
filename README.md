# react-loader
## What
This is a high order component (`HOC`).

This HOC purpose is to call a `load` callback passes in `props` of a component only once (at `componentWillMount`).

This is convenient to load data from a `backend` for instance.

## install
`npm i --save hoc-react-loader`

## use
You have to wrap your component, and give a `load` props to that resulted component.

You can also add an optional configuration object as second parameter.

Parameter | Needed | Default value | Description
----------|--------|---------------|-------------
`Loader` | no | `null` | A component that will be display depending on `prop` value.
`prop` | no | `loaded` | A prop name that determine when to display the `Loader` component. The prop value should be a Boolean.
`wait` | no | `true` | Set to `false` if you don't want to wait for the `prop` to be set.

### Simple example with `redux` :

**Component.js**
```(javascript)
import React from 'react'
export default ({ text }) => <div>{text}</div>
```

**Container.js**
```(javascript)
import { connect } from 'react-redux'
import reactLoader from 'hoc-react-loader'
import { fetchText } from '%%your_actions%%'
import Component from './Component'

const mapStateToProps = ({ text }) => {
  return {
    text,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    load: () => dispatch(fetchText()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(reactLoader(Component))
```

The `fetchText` may be an [redux-thunk](https://github.com/gaearon/redux-thunk) action that fetch a text to a `backend`, and update the state : `state.text`.

### Advanced example with `redux` :

**Component.js**
```(javascript)
import React from 'react'
export default ({ text }) => <div>{text}</div>
```

**Loader.js**
```(javascript)
import React from 'react'
export default () => <div>loading...</div>
```

**Container.js**
```(javascript)
import { connect } from 'react-redux'
import reactLoader from 'hoc-react-loader'
import { fetchText } from '%%your_actions%%'
import Component from './Component'
import Loader from './Loader'

const mapStateToProps = ({ text, isTextFetched }) => {
  return {
    text,
    fetched: isTextFetched,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    load: () => dispatch(fetchText()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(reactLoader(Component, {
  Loader,
  prop: 'fetched'
}))
```

The `Loader` component will displayed instead of `Component` as long as `prop` value is false.

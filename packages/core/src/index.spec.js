/* eslint-env jest */
/* eslint-disable
  react/jsx-filename-extension
*/
import React from 'react'
import { mount } from 'enzyme'
import loader from './index'

const Component = () => <div className="component">Component</div>
const Loader = () => <div className="loader">Loader</div>
const Error = () => <div className="error">Error</div>

describe('@hoc-react-loader/core', () => {
  describe('load parameter', () => {
    it('should be called at mount', () => {
      const load = jest.fn()
      const Wrapped = loader({ load })(Component)

      const mounted = mount(<Wrapped some="props" />)
      mounted.setProps({ some: 'other props' })

      expect(load).toHaveBeenCalledTimes(1)
    })

    it('should call the given prop name', () => {
      const load = jest.fn()
      const call = jest.fn()
      const Wrapped = loader({ load: 'call' })(Component)

      const mounted = mount(<Wrapped some="props" call={call} />)
      mounted.setProps({ some: 'other props' })

      expect(load).toHaveBeenCalledTimes(0)
      expect(call).toHaveBeenCalledTimes(1)
    })
  })

  describe('print parameter', () => {
    it('should print Component -empty parameters-', () => {
      const Wrapped = loader({ })(Component)

      const mounted = mount(<Wrapped some="props" />)

      expect(mounted.html()).toMatchSnapshot()
    })

    it('should print Component -undefined parameters-', () => {
      const Wrapped = loader()(Component)

      const mounted = mount(<Wrapped some="props" />)

      expect(mounted.html()).toMatchSnapshot()
    })

    it('should print Component -loaded props-', () => {
      const Wrapped = loader()(Component)

      const mounted = mount(<Wrapped loaded />)
      expect(mounted.html()).toMatchSnapshot()

      mounted.setProps({ loaded: 'value is truthy' })
      expect(mounted.html()).toMatchSnapshot()
    })

    it('should not print Component -loaded props-', () => {
      const Wrapped = loader()(Component)

      const mounted = mount(<Wrapped loaded={false} />)
      expect(mounted.html()).toMatchSnapshot()

      mounted.setProps({ loaded: 0 })
      expect(mounted.html()).toMatchSnapshot()
    })

    it('should print Component -print as an array-', () => {
      const print = ['first', 'second']
      const Wrapped = loader({ print })(Component)

      const mounted = mount(<Wrapped first second={false} />)
      expect(mounted.html()).toMatchSnapshot()

      mounted.setProps({ first: false, second: true })
      expect(mounted.html()).toMatchSnapshot()

      mounted.setProps({ first: 'truthy', second: 0 })
      expect(mounted.html()).toMatchSnapshot()

      mounted.setProps({ first: 'truthy', second: 1 })
      expect(mounted.html()).toMatchSnapshot()
    })

    it('should print Component -print as function-', () => {
      const print = jest.fn(() => true)

      const Wrapped = loader({ print })(Component)
      const mounted = mount(<Wrapped some="props" />)

      expect(mounted.html()).toMatchSnapshot()
      expect(print.mock.calls).toMatchSnapshot()
    })

    it('should not print Component -print as function-', () => {
      const print = jest.fn(() => false)

      const Wrapped = loader({ print })(Component)
      const mounted = mount(<Wrapped some="props" />)

      expect(mounted.html()).toMatchSnapshot()
      expect(print.mock.calls).toMatchSnapshot()
    })

    it('should print Component -print as a value-', () => {
      const Wrapped = loader({ print: 'truthy' })(Component)
      const mounted = mount(<Wrapped some="props" />)

      expect(mounted.html()).toMatchSnapshot()
    })

    it('should not print Component -print as a value-', () => {
      const Wrapped = loader({ print: 0 })(Component)
      const mounted = mount(<Wrapped some="props" />)

      expect(mounted.html()).toMatchSnapshot()
    })
  })

  describe('error parameter', () => {
    it('should print Component -error as a value-', () => {
      const error = false

      const Wrapped = loader({ error })(Component)
      const mounted = mount(<Wrapped some="props" />)

      expect(mounted.html()).toMatchSnapshot()
    })

    it('should print error Component -error as a value-', () => {
      const error = true

      const Wrapped = loader({ error })(Component)
      const mounted = mount(<Wrapped some="props" />)

      expect(mounted.html()).toMatchSnapshot()
    })

    it('should print Component -error as function-', () => {
      const error = jest.fn(() => false)

      const Wrapped = loader({ error })(Component)
      const mounted = mount(<Wrapped some="props" />)

      expect(mounted.html()).toMatchSnapshot()
      expect(error.mock.calls).toMatchSnapshot()
    })

    it('should print error Component -error as function-', () => {
      const error = jest.fn(() => true)

      const Wrapped = loader({ error })(Component)
      const mounted = mount(<Wrapped some="props" />)

      expect(mounted.html()).toMatchSnapshot()
      expect(error.mock.calls).toMatchSnapshot()
    })

    it('should print Component -error as an array-', () => {
      const error = ['first', 'second']
      const Wrapped = loader({ error })(Component)

      const mounted = mount(<Wrapped first={false} second={false} />)
      expect(mounted.html()).toMatchSnapshot()

      mounted.setProps({ first: 0, second: false })
      expect(mounted.html()).toMatchSnapshot()

      mounted.setProps({ first: false, second: '' })
      expect(mounted.html()).toMatchSnapshot()
    })

    it('should print error Component -error as an array-', () => {
      const error = ['first', 'second']
      const Wrapped = loader({ error })(Component)

      const mounted = mount(<Wrapped first second={false} />)
      expect(mounted.html()).toMatchSnapshot()

      mounted.setProps({ first: false, second: true })
      expect(mounted.html()).toMatchSnapshot()

      mounted.setProps({ first: false, second: 'An error has occured' })
      expect(mounted.html()).toMatchSnapshot()

      mounted.setProps({ first: 1, second: false })
      expect(mounted.html()).toMatchSnapshot()
    })
  })

  describe('delay parameter', () => {
    jest.useFakeTimers()

    it('should render nothing before delay and component not still loaded', () => {
      const Wrapped = loader({ delay: 10000 })(Component)

      const mounted = mount(<Wrapped loaded={false} />)
      expect(mounted.html()).toMatchSnapshot()
    })

    it('should render loading indicator after delay and component not still loaded', () => {
      const LoadingIndicator = () => <div>load</div>
      const Wrapped = loader({ delay: 10000, LoadingIndicator })(Component)

      const mounted = mount(<Wrapped loaded={false} />)
      jest.runAllTimers()
      expect(mounted.html()).toMatchSnapshot()
    })

    it('should render component when loaded when delay not past', () => {
      const Wrapped = loader({ delay: 10000 })(Component)

      const mounted = mount(<Wrapped some="props" />)
      expect(mounted.html()).toMatchSnapshot()
    })

    it('should render component when loaded when delay past', () => {
      const Wrapped = loader({ delay: 10000 })(Component)

      const mounted = mount(<Wrapped some="props" />)
      jest.runAllTimers()
      expect(mounted.html()).toMatchSnapshot()
    })

    it('should unregister the timer when component unmounted', () => {
      const Wrapped = loader({ delay: 10000 })(Component)

      const mounted = mount(<Wrapped some="props" />)
      mounted.unmount()
      expect(clearTimeout).toHaveBeenCalledTimes(1)
    })

    it('should unmount correctly when no delay defined', () => {
      const Wrapped = loader()(Component)

      const mounted = mount(<Wrapped some="props" />)
      mounted.unmount()
      expect(mounted.exists()).toBe(false)
    })
  })

  describe('Indicators parameters', () => {
    it('should print the given LoadingIndicator', () => {
      const Wrapped = loader({ LoadingIndicator: Loader })(Component)

      const mounted = mount(<Wrapped loaded={false} />)
      expect(mounted.html()).toMatchSnapshot()
    })

    it('should print the given ErrorIndicator', () => {
      const Wrapped = loader({ ErrorIndicator: Error })(Component)

      const mounted = mount(<Wrapped error />)
      expect(mounted.html()).toMatchSnapshot()
    })
  })
})

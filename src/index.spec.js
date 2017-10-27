/* eslint-env jest */
/* eslint-disable
  react/jsx-filename-extension,
  import/first
*/

jest.mock('./TailSpin', () => () => <div className="tailspin">TailSpin</div>)

import React from 'react'
import { mount } from 'enzyme'
import loader from './index'

const Component = () => <div className="component">Component</div>

describe('hoc-react-loader', () => {
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
  })
})

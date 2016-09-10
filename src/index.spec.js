import React from 'react'
import { mount } from 'enzyme'
import { expect, spy } from 'chai'

import loader from './index'
import Dots from './Dots'

const Component = () => <div />
const Loader = () => <div />
const getWrapped = (config, props) => {
  const Container = loader(Component, config)
  return mount(<Container {...props} />)
}

/* eslint-env mocha */
/* eslint-disable no-unused-expressions */

describe('react-loader', () => {
  describe('default behaviour', () => {
    it('should waits', () => {
      const loaded = getWrapped()
      expect(loaded.find(Component).node).to.be.undefined
    })

    it('should calls the load function once', () => {
      const load = spy(() => {})
      const loaded = getWrapped(undefined, { load })
      loaded.setProps({ loaded: true })
      load.should.have.been.called.once()
    })

    it('should shows a Dots component when waiting', () => {
      const loaded = getWrapped()
      loaded.find(Dots).node.should.exists
    })

    it('should shows the component when the Boolean(prop) is true', () => {
      const loaded = getWrapped()
      loaded.setProps({ loaded: true })
      loaded.find(Component).node.should.exists
    })

    it('should keeps props', () => {
      const loaded = getWrapped({ Loader }, { test: 'prop' })
      loaded.find(Loader).props().should.be.deep.equals({ test: 'prop' })
      loaded.setProps({ test: 'prop2', loaded: true })
      loaded.find(Component).props().should.be.deep.equals({ test: 'prop2', loaded: true })
    })
  })

  it('should shows the given component when waiting', () => {
    const loaded = getWrapped({ Loader })
    loaded.find(Loader).node.should.exists
  })

  it('shouldn\'t shows a Loader component when asking for', () => {
    const loaded = getWrapped({ Loader: null })
    expect(loaded.find(Loader).node).to.be.undefined
  })

  it('should shows the component when Boolean("define prop") is true', () => {
    const loaded = getWrapped({ Loader, prop: 'test' })
    loaded.setProps({ loaded: true })
    loaded.find(Loader).node.should.exists
    loaded.setProps({ test: [] })
    expect(loaded.find(Loader).node).to.be.undefined
  })
})

/* eslint-enable no-unused-expressions */

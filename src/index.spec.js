/* eslint-env mocha */
/* eslint-disable
  no-unused-expressions,
  react/jsx-filename-extension,
  import/no-extraneous-dependencies
*/

import React from 'react'
import { mount } from 'enzyme'
import { expect, spy } from 'chai'
import blanket from 'blanket' // eslint-disable-line
import loader from './index'
import Dots from './Dots'


const Component = () => <div />
const Loader = () => <div />
const getWrapped = (config, props) => {
  const Container = loader(Component, config)
  return mount(<Container {...props} />)
}


describe('react-loader', () => {
  it('should wait for a `data` props [readme]', () => {
    // Mount
    const load = spy(() => {})
    const loaded = getWrapped({ wait: ['data'] }, { load })

    // Load function is called
    // Graphic component isn't called
    // Loader should be Dots
    load.should.have.been.called.once()
    expect(loaded.find(Component).node).to.be.undefined
    loaded.find(Dots).node.should.exists

    // Change `data` value
    loaded.setProps({ data: true })

    // Load function is not called twice
    // Graphic component is called
    // Loader shouldn't be printed
    load.should.have.been.called.once()
    loaded.find(Component).node.should.exists
    expect(loaded.find(Dots).node).to.be.undefined
  })

  it('should wait for a `loaded` props [default]', () => {
    // Mount
    const load = spy(() => {})
    const loaded = getWrapped(undefined, { load })

    // Load function is called
    // Graphic component isn't called
    // Loader should be Dots
    load.should.have.been.called.once()
    expect(loaded.find(Component).node).to.be.undefined
    loaded.find(Dots).node.should.exists

    // Change `loaded` value
    loaded.setProps({ loaded: true })

    // Load function is not called twice
    // Graphic component is called
    // Loader shouldn't be printed
    load.should.have.been.called.once()
    loaded.find(Component).node.should.exists
    expect(loaded.find(Dots).node).to.be.undefined
  })

  it('should wait for an array of props', () => {
    // Mount
    const load = spy(() => {})
    const loaded = getWrapped({ wait: ['prop1', 'prop2'] }, { load })

    // Load function is called
    // Graphic component isn't called
    // Loader should be Dots
    load.should.have.been.called.once()
    expect(loaded.find(Component).node).to.be.undefined
    loaded.find(Dots).node.should.exists

    // Change `prop1` value
    loaded.setProps({ prop1: true })

    // Load function is not called twice
    // Graphic component isn't called
    // Loader should be Dots
    load.should.have.been.called.once()
    expect(loaded.find(Component).node).to.be.undefined
    loaded.find(Dots).node.should.exists

    // Change `prop3` value
    loaded.setProps({ prop3: true })

    // Load function is not called twice
    // Graphic component isn't called
    // Loader should be Dots
    load.should.have.been.called.once()
    expect(loaded.find(Component).node).to.be.undefined
    loaded.find(Dots).node.should.exists

    // Change `prop2` value
    loaded.setProps({ prop2: true })

    // Load function isn't called twice
    // Graphic component is printed
    // Loader shouldn't be printed
    load.should.have.been.called.once()
    loaded.find(Component).node.should.exists
    expect(loaded.find(Dots).node).to.be.undefined
  })

  it('should handle `wait` parameter to be a function', () => {
    // Mount (false case)
    const load = spy(() => {})
    let loaded = getWrapped({ wait: () => false }, { load })

    // Load function is called
    // Graphic component isn't printed
    // Loader should be Dots
    load.should.have.been.called.once()
    expect(loaded.find(Component).node).to.be.undefined
    loaded.find(Dots).node.should.exists

    // Mount (true case)
    loaded = getWrapped({ wait: () => true }, { load })

    // Load function is called
    // Graphic component is printed
    // Loader shouldn't be printed
    load.should.have.been.called.twice()
    loaded.find(Component).node.should.exists
    expect(loaded.find(Dots).node).to.be.undefined
  })

  it('should handle `wait` parameter to be a boolean', () => {
    // Mount (false case)
    const load = spy(() => {})
    let loaded = getWrapped({ wait: false }, { load })

    // Load function is called
    // Graphic component isn't called
    // Loader should be Dots
    load.should.have.been.called.once()
    expect(loaded.find(Component).node).to.be.undefined
    loaded.find(Dots).node.should.exists

    // Mount (true case)
    loaded = getWrapped({ wait: true }, { load })

    // Load function is called
    // Graphic is printed
    // Loader shouldn't be printed
    load.should.have.been.called.twice()
    loaded.find(Component).node.should.exists
    expect(loaded.find(Dots).node).to.be.undefined
  })

  it('should print a different Loader component', () => {
    // Mount
    const load = spy(() => {})
    const loaded = getWrapped({ Loader, wait: ['data'] }, { load })

    // Load function is called
    // Graphic component isn't called
    // Loader should `Loader` and not `Dots`
    load.should.have.been.called.once()
    expect(loaded.find(Component).node).to.be.undefined
    loaded.find(Loader).node.should.exists
    expect(loaded.find(Dots).node).to.be.undefined

    // Change `data` value
    loaded.setProps({ data: true })

    // Load function is not called twice
    // Graphic component is called
    // Loader shouldn't be printed
    load.should.have.been.called.once()
    loaded.find(Component).node.should.exists
    expect(loaded.find(Dots).node).to.be.undefined
    expect(loaded.find(Loader).node).to.be.undefined
  })

  it('should call the `load` function parameter if present', () => {
    // Mount
    const load = spy(() => {})
    const load2 = spy(() => {})
    const loaded = getWrapped({ load: load2 }, { load })

    // Load function is called
    // Graphic component isn't called
    // Loader should be Dots
    load.should.have.been.called.once()
    load2.should.have.been.called.once()
    expect(loaded.find(Component).node).to.be.undefined
    loaded.find(Dots).node.should.exists
  })

  it('should handle a `null` `load` props/parameter', () => {
    // Mount
    const loaded = getWrapped()

    // Graphic component isn't called
    // Dots should be printed
    expect(loaded.find(Component).node).to.be.undefined
    loaded.find(Dots).node.should.exists
  })
})

/* eslint-enable no-unused-expressions */

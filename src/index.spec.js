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

const isLoading = (load, loaded, CustomLoader = undefined) => {
  load.should.have.been.called.once
  expect(loaded.find(Component).node).to.be.undefined
  loaded.find(CustomLoader || Dots).node.should.exists
}

const isLoadingCustomLoader = (load, loaded, ) => {
  isLoading(Loader)
  expect(loaded.find(Dots).node).to.be.undefined
}

const isLoaded = (load, loaded, CustomLoader = undefined) => {
  load.should.have.been.called.once
  loaded.find(Component).node.should.exists
  expect(loaded.find(CustomLoader || Dots).node).to.be.undefined
}

const isLoadedCustomLoader = (load, loaded, ) => {
  isLoaded(Loader)
  expect(loaded.find(Dots).node).to.be.undefined
}

const isLoadedTwice = (load, loaded, CustomLoader = undefined) => {
  load.should.have.been.called.twice
  loaded.find(Component).node.should.exists
  expect(loaded.find(CustomLoader || Dots).node).to.be.undefined
}

describe('react-loader', () => {
  it('should wait for a `data` props [readme]', () => {
    // Mount
    const load = spy(() => {})
    const loaded = getWrapped({ wait: ['data'] }, { load })

    // Load function is called
    // Graphic component isn't called
    // Loader should be Dots
    isLoading(load, loaded)

    // Change `data` value
    loaded.setProps({ data: true })

    // Load function is not called twice
    // Graphic component is called
    // Loader shouldn't be printed
    isLoaded(load, loaded)
  })

  it('should wait for a `loaded` props [default]', () => {
    // Mount
    const load = spy(() => {})
    const loaded = getWrapped(undefined, { load })

    // Load function is called
    // Graphic component isn't called
    // Loader should be Dots
    isLoading(load, loaded)

    // Change `loaded` value
    loaded.setProps({ loaded: true })

    // Load function is not called twice
    // Graphic component is called
    // Loader shouldn't be printed
    isLoaded(load, loaded)
  })

  it('should wait for an array of props', () => {
    // Mount
    const load = spy(() => {})
    const loaded = getWrapped({ wait: ['prop1', 'prop2'] }, { load })

    // Load function is called
    // Graphic component isn't called
    // Loader should be Dots
    isLoading(load, loaded)

    // Change `prop1` value
    loaded.setProps({ prop1: true })

    // Load function is not called twice
    // Graphic component isn't called
    // Loader should be Dots
    isLoading(load, loaded)

    // Change `prop3` value
    loaded.setProps({ prop3: true })

    // Load function is not called twice
    // Graphic component isn't called
    // Loader should be Dots
    isLoading(load, loaded)

    // Change `prop2` value
    loaded.setProps({ prop2: true })

    // Load function isn't called twice
    // Graphic component is printed
    // Loader shouldn't be printed
    isLoaded(load, loaded)
  })

  it('should handle `wait` parameter to be a function', () => {
    // Mount (false case)
    const load = spy(() => {})
    let loaded = getWrapped({ wait: () => false }, { load })

    // Load function is called
    // Graphic component isn't printed
    // Loader should be Dots
    isLoading(load, loaded)

    // Mount (true case)
    loaded = getWrapped({ wait: () => true }, { load })

    // Load function is called
    // Graphic component is printed
    // Loader shouldn't be printed
    isLoadedTwice(load, loaded)
  })

  it('should handle `wait` parameter to be a boolean', () => {
    // Mount (false case)
    const load = spy(() => {})
    let loaded = getWrapped({ wait: false }, { load })

    // Load function is called
    // Graphic component isn't called
    // Loader should be Dots
    isLoading(load, loaded)

    // Mount (true case)
    loaded = getWrapped({ wait: true }, { load })

    // Load function is called
    // Graphic is printed
    // Loader shouldn't be printed
    isLoadedTwice(load, loaded)
  })

  it('should print a different Loader component', () => {
    // Mount
    const load = spy(() => {})
    const loaded = getWrapped({ Loader, wait: ['data'] }, { load })

    // Load function is called
    // Graphic component isn't called
    // Loader should `Loader` and not `Dots`
    isLoadingCustomLoader(load, loaded)

    // Change `data` value
    loaded.setProps({ data: true })

    // Load function is not called twice
    // Graphic component is called
    // Loader shouldn't be printed
    isLoadedCustomLoader(load, loaded)
  })

  it('should call the `load` function parameter if present', () => {
    // Mount
    const loadProp = spy(() => {})
    const loadParam = spy(() => {})
    const loaded = getWrapped({ load: loadParam }, { load: loadProp })

    // Load function is called
    // Graphic component isn't called
    // Loader should be Dots
    loadProp.should.have.been.called.once
    loadParam.should.have.been.called.once
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

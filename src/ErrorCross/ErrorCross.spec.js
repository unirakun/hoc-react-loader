/* eslint-env mocha */
/* eslint-disable
  no-unused-expressions,
  react/jsx-filename-extension,
  import/no-extraneous-dependencies
*/

import React from 'react'
import { mount } from 'enzyme'
import blanket from 'blanket' // eslint-disable-line
import ErrorCross from './ErrorCross'

const mountWithProps = (props = {}) => mount(<ErrorCross {...props} />)

const testColor = (component, color) => {
  component.find('path').prop('stroke').should.be.deep.equals(color)
}

describe('ErrorCross', () => {
  it('should have error message in title', () => {
    const errorMessage = 'fake-message'
    const mounted = mountWithProps({ message: errorMessage })
    const div = mounted.find('div')

    div.prop('title').should.equal(errorMessage)
  })

  it('should provide a default message', () => {
    const mounted = mountWithProps()
    const div = mounted.find('div')

    div.prop('title').should.have.length.above(0)
  })

  it('should use a default color when no background-color is found', () => {
    const mounted = mount(<ErrorCross />)
    testColor(mounted, '#cecece')
  })

  it('should use the first parent color when accessible (darken)', () => {
    const mounted = mount(
      <div style={{ backgroundColor: '#FFF9E5' }}>
        <ErrorCross />
      </div>
    )

    testColor(mounted, '#ffe17f')
  })

  it('should go to the first parent with a background color', () => {
    const mounted = mount(
      <div style={{ backgroundColor: '#2D2812' }}>
        <div style={{ color: 'red' }}>
          <ErrorCross />
        </div>
      </div>
    )

    testColor(mounted, '#76692f')
  })

  it('shouldnt print a warning', () => {
    mount(
      <div style={{ backgroundColor: '#2D2812' }}>
        <ErrorCross dispatch="a dispatch" />
      </div>
    )
  })
})

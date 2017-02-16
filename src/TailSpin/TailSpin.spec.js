/* eslint-env mocha */
/* eslint-disable
  no-unused-expressions,
  react/jsx-filename-extension,
  import/no-extraneous-dependencies
*/

import React from 'react'
import { mount } from 'enzyme'
import blanket from 'blanket' // eslint-disable-line
import TailSpin from './TailSpin'

const testColor = (component, color) => {
  component.find('circle').props().fill.should.be.deep.equals(color)
}

describe('TailSpin', () => {
  it('should use a default color when no background-color is found', () => {
    const mounted = mount(<TailSpin />)
    testColor(mounted, '#cecece')
  })

  it('should use the first parent color when accessible (darken)', () => {
    const mounted = mount(
      <div style={{ backgroundColor: '#FFF9E5' }}>
        <TailSpin />
      </div>
    )

    testColor(mounted, '#ffe17f')
  })

  it('should use the first parent color when accessible (ligthen)', () => {
    const mounted = mount(
      <div style={{ backgroundColor: '#2D2812' }}>
        <TailSpin />
      </div>
    )

    testColor(mounted, '#76692f')
  })

  it('should go to the first parent with a background color', () => {
    const mounted = mount(
      <div style={{ backgroundColor: '#2D2812' }}>
        <div style={{ color: 'red' }}>
          <TailSpin />
        </div>
      </div>
    )

    testColor(mounted, '#76692f')
  })

  it('shouldnt print a warning', () => {
    mount(
      <div style={{ backgroundColor: '#2D2812' }}>
        <TailSpin dispatch="a dispatch" />
      </div>
    )
  })
})

/* eslint-enable no-unused-expressions */

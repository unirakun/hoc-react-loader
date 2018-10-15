/* eslint-env jest */
/* eslint-disable
  react/jsx-filename-extension,
*/
import React from 'react'
import { mount } from 'enzyme'
import loader from './index'
import ErrorCross from './ErrorCross'
import TailSpin from './TailSpin'

const Component = () => <div className="component">Component</div>

describe('@hoc-react-loader/full', () => {
  it('should print TailSpin (default LoadingIndicator)', () => {
    const Wrapped = loader()(Component)

    const mounted = mount(<Wrapped loaded={false} />)
    expect(mounted.find(TailSpin)).toHaveLength(1)
    expect(mounted.find(ErrorCross)).toHaveLength(0)
    expect(mounted.find(Component)).toHaveLength(0)
  })

  it('should print ErrorCross (default ErrorIndicator)', () => {
    const Wrapped = loader()(Component)

    const mounted = mount(<Wrapped error />)
    expect(mounted.find(TailSpin)).toHaveLength(0)
    expect(mounted.find(ErrorCross)).toHaveLength(1)
    expect(mounted.find(Component)).toHaveLength(0)
  })

  it('should print the Component wrapped', () => {
    const Wrapped = loader()(Component)

    const mounted = mount(<Wrapped />)
    expect(mounted.find(TailSpin)).toHaveLength(0)
    expect(mounted.find(ErrorCross)).toHaveLength(0)
    expect(mounted.find(Component)).toHaveLength(1)
  })
})

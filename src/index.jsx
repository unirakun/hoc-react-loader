import React from 'react'
import core from './core'
import TailSpin from './TailSpin'

export default (
  ComposedComponent,
  {
    renderLoadingIndicator = (() => <TailSpin />),
    ...rest
  } = {},
) => core(ComposedComponent, { ...rest, renderLoadingIndicator })

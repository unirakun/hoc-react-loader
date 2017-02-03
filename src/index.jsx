import React from 'react'
import core from './core'
import TailSpin from './TailSpin'

const defaultLoadingIndicator = ({ className, style }) =>
  <TailSpin className={className} style={style} />

export default (
  ComposedComponent,
  {
    renderLoadingIndicator = defaultLoadingIndicator,
    ...rest
  } = {},
) => core(ComposedComponent, { ...rest, renderLoadingIndicator })

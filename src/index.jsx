import core from './core'
import TailSpin from './TailSpin'

export default (
  ComposedComponent,
  {
    LoadingIndicator = TailSpin,
    ...rest,
  } = {},
) => core(ComposedComponent, { ...rest, LoadingIndicator })

import core from './core'
import TailSpin from './TailSpin'

export default (
  ComposedComponent,
  {
    Loader = TailSpin,
    ...rest,
  } = {},
) => core(ComposedComponent, { ...rest, Loader })

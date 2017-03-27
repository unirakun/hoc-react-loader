import core from './core'
import TailSpin from './TailSpin'
import ErrorCross from './ErrorCross'

export default (
  ComposedComponent,
  {
    LoadingIndicator = TailSpin,
    ErrorIndicator = ErrorCross,
    ...rest,
  } = {},
) => core(ComposedComponent, { ...rest, ErrorIndicator, LoadingIndicator })

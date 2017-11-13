import core from './core'
import TailSpin from './TailSpin'
import ErrorCross from './ErrorCross'

export default (
  {
    LoadingIndicator = TailSpin,
    ErrorIndicator = ErrorCross,
    ...rest
  } = {},
) => core({ ...rest, LoadingIndicator, ErrorIndicator })

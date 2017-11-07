import core from './core'
import TailSpin from './TailSpin'

export default (
  {
    LoadingIndicator = TailSpin,
    ...rest
  } = {},
) => core({ ...rest, LoadingIndicator })

import core from './core'
import Dots from './Dots'

export default (
  ComposedComponent,
  {
    Loader = Dots,
    ...rest,
  } = {},
) => core(ComposedComponent, { ...rest, Loader })

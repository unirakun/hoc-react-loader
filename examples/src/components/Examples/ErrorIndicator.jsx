import React from 'react'
import loader from 'hoc-react-loader'

const EmptyComponent = () => <div /> // this will never be display

const ErrorIndicator = (props) => <div {...props}>An error occured !</div>

export default loader(EmptyComponent, { ErrorIndicator })

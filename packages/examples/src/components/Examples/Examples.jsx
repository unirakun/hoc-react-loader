import React from 'react'
import { PropTypes } from 'prop-types'
import Example from '../Example'
import Base from './Base'
import OneParam from './OneParam'
import TwoParams from './TwoParams'
import DontWait from './DontWait'
import LoadingIndicator from './LoadingIndicator'
import ErrorIndicator from './ErrorIndicator'
import './Examples.scss'

const Examples = ({ style, className }) => (
  <div style={style} className={`examples ${className}`}>
    <Example
      className="example"
      link="Base"
      code="export&nbsp;default loader()(Base)"
      buttons={{ 0: true }}
      example={<Base />}
    >
      <div className="doc">
        <h3>Base: `this.props.loaded` is defined</h3>
        <p className="description">
          In this example, the loader wraps a Component with &nbsp;
          <pre>this.props.loaded</pre>
          &nbsp;defined. It means that the loader calls
          <pre>this.props.load</pre>
          &nbsp;if presents, then waits for
          <pre>this.props.loaded</pre>
          &nbsp;to be truthy, and finally displays the wrapped components. While waiting for
          <pre>this.props.loaded</pre>
          &nbsp;to be truthy, hoc-react-loader takes care of displaying a spinner based on the background color.
        </p>
      </div>
    </Example>

    <Example
      className="example"
      link="OneParam"
      code="export&nbsp;default loader({ print: ['prop'] })(OneParam)"
      buttons={{ 1: true }}
      example={<OneParam />}
    >
      <div className="doc">
        <h3>OneParam: waiting for a given param</h3>
        <p className="description">
          Like in the previous example, the default loading indicator is used (the spinner) and &nbsp;
          <pre>this.props.load</pre>
          is called. But this time, the
          <pre>HOC</pre>
          waits for &nbsp;
          <pre>this.props.prop</pre>
          as specified in the
          <pre>print</pre>
          param.
        </p>
      </div>
    </Example>

    <Example
      className="example"
      link="TwoParams"
      code="export&nbsp;default loader({ print: ['prop', 'prop2'] })(TwoParams)"
      buttons={{ 1: true, 2: true }}
      example={<TwoParams />}
    >
      <div className="doc">
        <h3>TwoParams: wait for multiple props</h3>
        <p className="description">
          If the
          <pre>print</pre>
          parameter is given an array of props instead of just one prop, &nbsp;
          <pre>hoc-react-loader</pre>
          will wait for all of the specified props to be truthy. In this example, these are
          <pre>prop</pre>
          and
          <pre>prop2</pre>
          .
        </p>
      </div>
    </Example>

    <Example
      className="example"
      link="DontWait"
      code="export&nbsp;default loader({ print: true })(DontWait)"
      buttons={{ 0: true }}
      example={<DontWait />}
    >
      <div className="doc">
        <h3>DontWait: don't show the placeholder</h3>
        <p className="description">
          If the
          <pre>print</pre>
          param is set to
          <pre>true</pre>
          the
          <pre>hoc-react-loader</pre>
          &nbsp;will not display the loading indicator (default or custom). But
          <pre>this.props.load</pre>
          is still called if presents!
        </p>
      </div>
    </Example>

    <Example
      className="example"
      link="LoadingIndicator"
      code="export&nbsp;default loader({ LoadingIndicator: CustomLoadingIndicator })(LoadingIndicator)" // eslint-disable-line
      buttons={{ 0: true }}
      example={<LoadingIndicator />}
    >
      <div className="doc">
        <h3>LoadingIndicator: change the default loading indicator</h3>
        <p className="description">
          In this example, the default loading indicator is replaced with a custom one.
          The component waits for the default prop (
          <pre>this.props.loaded</pre>
          ).
        </p>
      </div>
    </Example>
    <Example
      className="example"
      link="ErrorIndicator"
      code="export&nbsp;default loader()(Base)"
      buttons={{ 3: true }}
      example={<Base />}
    >
      <div className="doc">
        <h3>Error: defaults parameters</h3>
        <p className="description">
          In this example, the loader wraps a Component with its default parameters.
          The loader will wait fo
          <pre>this.props.error</pre>
          to bre truthy &nbsp;and will then display the default error component.
        </p>
      </div>
    </Example>
    <Example
      className="example"
      link="ErrorCustomIndicator"
      code="export&nbsp;default loader({ ErrorIndicator: CustomErrorIndicator })(ErrorIndicator)" // eslint-disable-line
      buttons={{ 3: true }}
      example={<ErrorIndicator />}
    >
      <div className="doc">
        <h3>ErrorIndicator: change the default error indicator</h3>
        <p className="description">
          In this example, the default error indicator is replaced with a custom one.
          The component waits for the default prop (
          <pre>this.props.error</pre>
          ) &nbsp;before displaying it.
        </p>
      </div>
    </Example>
  </div>
)

Examples.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
}

Examples.defaultProps = {
  style: {},
  className: undefined,
}

export default Examples

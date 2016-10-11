import React, { PropTypes } from 'react'

/* eslint-disable import/no-extraneous-dependencies */
import Example from 'Example'
/* eslint-enable import/no-extraneous-dependencies */

import styles from './Examples.scss'

import Base from './Base'
import OneParam from './OneParam'
import TwoParams from './TwoParams'

const Examples = ({ style, className }) => (
  <div style={style} className={`${styles.examples} ${className}`}>
    <Example
      className={styles.example}
      link="Base"
      code="export&nbsp;default loader(Base)"
      buttons={{ 0: true }}
      example={<Base />}
    >
      <div className={styles.doc}>
        <h3>Base: defaults parameters</h3>
        <p className={styles.description}>
          In this example, the loader wraps a Component with its default parameters.
          It means that the loader calls <pre>this.props.load</pre>
          &nbsp;if presents, then waits for <pre>this.props.loaded</pre>
          &nbsp;to be truthy, and finally prints the wrapped components.
          While waiting for <pre>this.props.loaded</pre>&nbsp;
          to be truthy, hoc-react-loader takes care of printing
          a loading spin based on the background color.
        </p>
      </div>
    </Example>

    <Example
      className={styles.example}
      link="OneParam"
      code="export&nbsp;default loader(OneParam, { wait: ['prop'] })"
      buttons={{ 1: true }}
      example={<OneParam />}
    >
      <div className={styles.doc}>
        <h3>OneParam: Waiting for a given param</h3>
        <p className={styles.description}>
          Like previous example, the default loader is used (Loading spin) and
          &nbsp;<pre>this.props.load</pre> is called. But this time, the <pre>HOC</pre> waits for
          &nbsp;<pre>this.props.prop</pre> as specified in the <pre>wait</pre> param.
        </p>
      </div>
    </Example>

    <Example
      className={styles.example}
      link="TwoParams"
      code="export&nbsp;default loader(TwoParams, { wait: ['prop', 'prop2'] })"
      buttons={{ 1: true, 2: true }}
      example={<TwoParams />}
    >
      <div className={styles.doc}>
        <h3>TwoParams: Wait for multiple props</h3>
        <p className={styles.description}>
          Waiting for multiple props is easy, just give an array in the <pre>wait</pre> param.
          Here, <pre>hoc-react-loader</pre> waits for <pre>prop</pre> and <pre>prop2</pre>
          &nbsp;to be truthy!
        </p>
      </div>
    </Example>
  </div>
)

Examples.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
}

export default Examples

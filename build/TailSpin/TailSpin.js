'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// from https://github.com/SamHerbert/SVG-Loaders
var TailSpin = function (_Component) {
  _inherits(TailSpin, _Component);

  function TailSpin(props) {
    _classCallCheck(this, TailSpin);

    var _this = _possibleConstructorReturn(this, (TailSpin.__proto__ || Object.getPrototypeOf(TailSpin)).call(this, props));

    _this.attach = function (svg) {
      var newColor = (0, _utils.findCorrectColor)(svg);
      if (_this.state.color !== newColor) {
        _this.setState({ color: newColor });
      }
    };

    _this.state = {
      color: _utils.INITIAL_COLOR
    };
    return _this;
  }

  _createClass(TailSpin, [{
    key: 'render',
    value: function render() {
      var color = this.state.color;
      var _props = this.props,
          style = _props.style,
          className = _props.className;


      return _react2.default.createElement(
        'svg',
        {
          ref: this.attach,
          width: '38', height: '38',
          viewBox: '0 0 38 38',
          xmlns: 'http://www.w3.org/2000/svg',
          style: style,
          className: className
        },
        _react2.default.createElement(
          'defs',
          null,
          _react2.default.createElement(
            'linearGradient',
            { x1: '8.042%', y1: '0%', x2: '65.682%', y2: '23.865%', id: 'a' },
            _react2.default.createElement('stop', { stopColor: color, stopOpacity: '.2', offset: '0%' }),
            _react2.default.createElement('stop', { stopColor: color, stopOpacity: '.631', offset: '63.146%' }),
            _react2.default.createElement('stop', { stopColor: color, stopOpacity: '.8', offset: '100%' })
          )
        ),
        _react2.default.createElement(
          'g',
          { fill: 'none', fillRule: 'evenodd' },
          _react2.default.createElement(
            'g',
            { transform: 'translate(1 1)' },
            _react2.default.createElement(
              'path',
              { d: 'M36 18c0-9.94-8.06-18-18-18', id: 'Oval-2', stroke: 'url(#a)', strokeWidth: '2' },
              _react2.default.createElement('animateTransform', {
                attributeName: 'transform',
                type: 'rotate',
                from: '0 18 18',
                to: '360 18 18',
                dur: '0.9s',
                repeatCount: 'indefinite'
              })
            ),
            _react2.default.createElement(
              'circle',
              { fill: color, cx: '36', cy: '18', r: '1' },
              _react2.default.createElement('animateTransform', {
                attributeName: 'transform',
                type: 'rotate',
                from: '0 18 18',
                to: '360 18 18',
                dur: '0.9s',
                repeatCount: 'indefinite'
              })
            )
          )
        )
      );
    }
  }]);

  return TailSpin;
}(_react.Component);

TailSpin.propTypes = {
  className: _propTypes2.default.string,
  style: _propTypes2.default.object
};

TailSpin.defaultProps = {
  className: '',
  style: undefined
};

exports.default = TailSpin;
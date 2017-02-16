'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _tinycolor = require('tinycolor2');

var _tinycolor2 = _interopRequireDefault(_tinycolor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* global window */
var getBackgroundColor = function getBackgroundColor(node) {
  return window.getComputedStyle(node, null).getPropertyValue('background-color');
};

// from https://github.com/SamHerbert/SVG-Loaders

var TailSpin = function (_Component) {
  _inherits(TailSpin, _Component);

  function TailSpin(props) {
    _classCallCheck(this, TailSpin);

    var _this = _possibleConstructorReturn(this, (TailSpin.__proto__ || Object.getPrototypeOf(TailSpin)).call(this, props));

    _this.setColor = function () {
      var parent = _this.svg && _this.svg.parentNode;
      var parentColor = parent ? getBackgroundColor(parent) : undefined;

      while (parent && !parentColor) {
        parent = parent.parentNode;
        if (parent) parentColor = getBackgroundColor(parent);
      }

      if (parentColor) {
        var tinyC = (0, _tinycolor2.default)(parentColor);
        var color = tinyC.isDark() ? tinyC.lighten(20) : tinyC.darken(20);

        _this.setState({
          color: color.toHexString()
        });
      }
    };

    _this.state = {
      color: '#cecece'
    };
    return _this;
  }

  _createClass(TailSpin, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setColor();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var color = this.state.color;
      var _props = this.props,
          style = _props.style,
          className = _props.className;


      return _react2.default.createElement(
        'svg',
        {
          ref: function ref(c) {
            _this2.svg = c;
          },
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
  className: _react.PropTypes.string,
  style: _react.PropTypes.object
};

exports.default = TailSpin;
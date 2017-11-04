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

var Cross = function (_Component) {
  _inherits(Cross, _Component);

  function Cross(props) {
    _classCallCheck(this, Cross);

    var _this = _possibleConstructorReturn(this, (Cross.__proto__ || Object.getPrototypeOf(Cross)).call(this, props));

    _this.state = {
      color: _utils.initialColor
    };
    return _this;
  }

  _createClass(Cross, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var newColor = (0, _utils.findCorrectColor)(this.div);
      if (this.state.color !== newColor) {
        this.setState({ color: newColor });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var color = this.state.color;
      var _props = this.props,
          style = _props.style,
          className = _props.className,
          message = _props.message;


      return _react2.default.createElement(
        'div',
        {
          title: message,
          ref: function ref(c) {
            _this2.div = c;
          }
        },
        _react2.default.createElement(
          'svg',
          {
            height: '38',
            width: '38',
            viewBox: '0 0 38 38',
            className: className,
            style: style,
            xmlns: 'http://www.w3.org/2000/svg'
          },
          _react2.default.createElement('path', {
            stroke: color,
            strokeWidth: '3.03754568',
            strokeLinecap: 'round',
            id: 'path3728',
            d: 'M 1.5341128,1.5341128 36.465887,36.465887 m 0,-34.9317742 L 1.5341128,36.465887'
          })
        )
      );
    }
  }]);

  return Cross;
}(_react.Component);

var string = _propTypes2.default.string,
    object = _propTypes2.default.object;

Cross.propTypes = {
  message: string,
  className: string,
  style: object
};

Cross.defaultProps = {
  message: 'An error occured',
  className: '',
  style: {}
};

exports.default = Cross;
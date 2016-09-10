'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Dot = function Dot(_ref) {
  var style = _ref.style;
  var className = _ref.className;
  var children = _ref.children;
  var opacity = _ref.opacity;
  return _react2.default.createElement(
    'div',
    { style: (0, _style2.default)(style, opacity), className: className },
    children || ' '
  );
};

Dot.propTypes = {
  style: _react.PropTypes.object,
  className: _react.PropTypes.string,
  children: _react.PropTypes.node,
  opacity: _react.PropTypes.number.isRequired
};

exports.default = Dot;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _core = require('./core');

var _core2 = _interopRequireDefault(_core);

var _TailSpin = require('./TailSpin');

var _TailSpin2 = _interopRequireDefault(_TailSpin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

exports.default = function (ComposedComponent) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var _ref$LoadingIndicator = _ref.LoadingIndicator,
      LoadingIndicator = _ref$LoadingIndicator === undefined ? _TailSpin2.default : _ref$LoadingIndicator,
      rest = _objectWithoutProperties(_ref, ['LoadingIndicator']);

  return (0, _core2.default)(ComposedComponent, _extends({}, rest, { LoadingIndicator: LoadingIndicator }));
};
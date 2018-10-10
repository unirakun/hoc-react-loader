"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _core = _interopRequireDefault(require("./core"));

var _TailSpin = _interopRequireDefault(require("./TailSpin"));

var _ErrorCross = _interopRequireDefault(require("./ErrorCross"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var _default = function _default() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$LoadingIndicator = _ref.LoadingIndicator,
      LoadingIndicator = _ref$LoadingIndicator === void 0 ? _TailSpin.default : _ref$LoadingIndicator,
      _ref$ErrorIndicator = _ref.ErrorIndicator,
      ErrorIndicator = _ref$ErrorIndicator === void 0 ? _ErrorCross.default : _ref$ErrorIndicator,
      rest = _objectWithoutProperties(_ref, ["LoadingIndicator", "ErrorIndicator"]);

  return (0, _core.default)(_objectSpread({}, rest, {
    LoadingIndicator: LoadingIndicator,
    ErrorIndicator: ErrorIndicator
  }));
};

exports.default = _default;
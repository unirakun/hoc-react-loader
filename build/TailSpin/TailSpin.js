"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// from https://github.com/SamHerbert/SVG-Loaders
var TailSpin =
/*#__PURE__*/
function (_Component) {
  _inherits(TailSpin, _Component);

  function TailSpin(props) {
    var _this;

    _classCallCheck(this, TailSpin);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TailSpin).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "attach", function (svg) {
      var color = _this.state.color;
      var newColor = (0, _utils.findCorrectColor)(svg);

      if (color !== newColor) {
        _this.setState({
          color: newColor
        });
      }
    });

    _this.state = {
      color: _utils.INITIAL_COLOR
    };
    return _this;
  }

  _createClass(TailSpin, [{
    key: "render",
    value: function render() {
      var color = this.state.color;
      var _this$props = this.props,
          style = _this$props.style,
          className = _this$props.className;
      return _react.default.createElement("svg", {
        ref: this.attach,
        width: "38",
        height: "38",
        viewBox: "0 0 38 38",
        xmlns: "http://www.w3.org/2000/svg",
        style: style,
        className: className
      }, _react.default.createElement("defs", null, _react.default.createElement("linearGradient", {
        x1: "8.042%",
        y1: "0%",
        x2: "65.682%",
        y2: "23.865%",
        id: "a"
      }, _react.default.createElement("stop", {
        stopColor: color,
        stopOpacity: ".2",
        offset: "0%"
      }), _react.default.createElement("stop", {
        stopColor: color,
        stopOpacity: ".631",
        offset: "63.146%"
      }), _react.default.createElement("stop", {
        stopColor: color,
        stopOpacity: ".8",
        offset: "100%"
      }))), _react.default.createElement("g", {
        fill: "none",
        fillRule: "evenodd"
      }, _react.default.createElement("g", {
        transform: "translate(1 1)"
      }, _react.default.createElement("path", {
        d: "M36 18c0-9.94-8.06-18-18-18",
        id: "Oval-2",
        stroke: "url(#a)",
        strokeWidth: "2"
      }, _react.default.createElement("animateTransform", {
        attributeName: "transform",
        type: "rotate",
        from: "0 18 18",
        to: "360 18 18",
        dur: "0.9s",
        repeatCount: "indefinite"
      })), _react.default.createElement("circle", {
        fill: color,
        cx: "36",
        cy: "18",
        r: "1"
      }, _react.default.createElement("animateTransform", {
        attributeName: "transform",
        type: "rotate",
        from: "0 18 18",
        to: "360 18 18",
        dur: "0.9s",
        repeatCount: "indefinite"
      })))));
    }
  }]);

  return TailSpin;
}(_react.Component);

TailSpin.propTypes = {
  className: _propTypes.default.string,
  style: _propTypes.default.object
};
TailSpin.defaultProps = {
  className: '',
  style: undefined
};
var _default = TailSpin;
exports.default = _default;
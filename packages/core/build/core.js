"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// eslint-disable-line import/no-extraneous-dependencies
var getTypeOf = function getTypeOf(something) {
  var getType = {};
  return something && getType.toString.call(something);
}; // http://stackoverflow.com/a/7356528


var isFunction = function isFunction(functionToCheck) {
  var type = getTypeOf(functionToCheck);
  return type && type === '[object Function]';
};

var isString = function isString(stringToCheck) {
  var type = getTypeOf(stringToCheck);
  return type && type === '[object String]';
};

var hasStatus = function hasStatus(prop, propProcessor, defaultProp, defaultValue) {
  return function (props, state, context) {
    if (prop === undefined) {
      var status = props[defaultProp];
      return status === undefined ? defaultValue : !!status;
    }

    if (Array.isArray(prop)) {
      var boolProps = prop.map(function (p) {
        return !!props[p];
      });
      return propProcessor(boolProps);
    }

    if (isFunction(prop)) {
      return !!prop(props, context);
    }

    return !!prop;
  };
};

var getDisplayName = function getDisplayName(c) {
  return c.displayName || c.name || 'Component';
};

var _default = function _default() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      LoadingIndicator = _ref.LoadingIndicator,
      ErrorIndicator = _ref.ErrorIndicator,
      print = _ref.print,
      load = _ref.load,
      error = _ref.error,
      delay = _ref.delay;

  var loadFunctionName = isString(load) ? load : 'load';
  var isLoadFunction = isFunction(load);
  var isLoaded = hasStatus(print, function (bs) {
    return !bs.includes(false);
  }, 'loaded', true);
  var isInError = hasStatus(error, function (bs) {
    return bs.includes(true);
  }, 'error', false);
  return function (ComposedComponent) {
    var _class, _temp;

    var displayName = "Loader(".concat(getDisplayName(ComposedComponent), ")");
    return _temp = _class =
    /*#__PURE__*/
    function (_Component) {
      _inherits(_class, _Component);

      function _class(_props, context) {
        var _this;

        _classCallCheck(this, _class);

        _this = _possibleConstructorReturn(this, _getPrototypeOf(_class).call(this, _props, context));

        _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "omitLoadInProps", function (props) {
          var isLoadAFunction = isFunction(props[loadFunctionName]);

          if (isLoadAFunction) {
            _this.setState({
              props: _objectSpread({}, props, _defineProperty({}, loadFunctionName, undefined))
            });
          } else {
            _this.setState({
              props: props
            });
          }

          return isLoadAFunction;
        });

        _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "componentWillReceiveProps", function (nextProps) {
          _this.omitLoadInProps(nextProps);
        });

        _this.state = {
          props: {},
          print: true
        };
        return _this;
      }

      _createClass(_class, [{
        key: "componentWillMount",
        value: function componentWillMount() {
          var _this2 = this;

          // Load from hoc argument
          if (isLoadFunction) {
            load(this.props, this.context);
          } // Load from props


          if (this.omitLoadInProps(this.props)) {
            // eslint-disable-next-line react/destructuring-assignment
            this.props[loadFunctionName](this.props, this.context);
          } // set delay


          if (delay) {
            this.setState(function (state) {
              return _objectSpread({}, state, {
                print: false
              });
            });
            this.timer = setTimeout(function () {
              return _this2.setState(function (state) {
                return _objectSpread({}, state, {
                  print: true
                });
              });
            }, delay);
          }
        }
      }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
          if (this.timer) {
            clearTimeout(this.timer);
          }
        }
      }, {
        key: "render",
        value: function render() {
          var props = this.state.props;

          if (isInError(this.props, this.state, this.context)) {
            return _react.default.createElement(ErrorIndicator, props);
          }

          if (isLoaded(this.props, this.state, this.context)) {
            return _react.default.createElement(ComposedComponent, props);
          }

          if (!this.state.print) {
            // eslint-disable-line react/destructuring-assignment
            return null;
          }

          return _react.default.createElement(LoadingIndicator, props);
        }
      }]);

      return _class;
    }(_react.Component), _defineProperty(_class, "displayName", displayName), _temp;
  };
};

exports.default = _default;
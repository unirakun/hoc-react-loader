'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /* eslint react/prop-types: 0 */


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var getTypeOf = function getTypeOf(something) {
  var getType = {};
  return something && getType.toString.call(something);
};

// http://stackoverflow.com/a/7356528
var isFunction = function isFunction(functionToCheck) {
  var type = getTypeOf(functionToCheck);
  return type && type === '[object Function]';
};

var isString = function isString(stringToCheck) {
  var type = getTypeOf(stringToCheck);
  return type && type === '[object String]';
};

// https://github.com/then/is-promise/blob/master/index.js
var isPromise = function isPromise(promise) {
  return !!promise && ((typeof promise === 'undefined' ? 'undefined' : _typeof(promise)) === 'object' || typeof promise === 'function') && typeof promise.then === 'function';
};

var getDisplayName = function getDisplayName(c) {
  return c.displayName || c.name || 'Component';
};

exports.default = function () {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      LoadingIndicator = _ref.LoadingIndicator,
      print = _ref.print,
      load = _ref.load;

  var loadFunctionName = isString(load) ? load : 'load';
  var isPrintArray = Array.isArray(print);
  var isPrintFunction = isFunction(print);
  var isPrintPromise = isPromise(print);
  var isLoadFunction = isFunction(load);

  var isLoaded = function isLoaded(props, state, context) {
    // Print is undefined,
    // we rely on 'props.loaded' if present
    // if not, we directly print the component
    if (print === undefined) {
      var loaded = props.loaded;

      return loaded === undefined ? true : !!loaded;
    }

    // Print is an array
    // Implicitly meaning that this is an array of props
    if (isPrintArray) {
      return print.map(function (p) {
        return Boolean(props[p]);
      }).reduce(function (allProps, currentProp) {
        return allProps && currentProp;
      });
    }

    // Print is a function
    if (isPrintFunction) {
      return !!print(props, context);
    }

    if (isPrintPromise) {
      return state.promiseLoaded;
    }

    // Anything else
    return !!print;
  };

  return function (ComposedComponent) {
    var _class, _temp2;

    var displayName = 'Loader(' + getDisplayName(ComposedComponent) + ')';

    return _temp2 = _class = function (_Component) {
      _inherits(_class, _Component);

      function _class() {
        var _ref2;

        var _temp, _this, _ret;

        _classCallCheck(this, _class);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref2 = _class.__proto__ || Object.getPrototypeOf(_class)).call.apply(_ref2, [this].concat(args))), _this), _this.state = {
          props: {},
          promiseLoaded: false
        }, _this.promiseResolved = function () {
          _this.setState({ promiseLoaded: true });
        }, _this.omitLoadInProps = function (props) {
          var isLoadAFunction = isFunction(props[loadFunctionName]);

          if (isLoadAFunction) {
            _this.setState({
              props: _extends({}, props, _defineProperty({}, loadFunctionName, undefined))
            });
          } else {
            _this.setState({ props: props });
          }

          return isLoadAFunction;
        }, _this.componentWillReceiveProps = function (nextProps) {
          _this.omitLoadInProps(nextProps);
        }, _temp), _possibleConstructorReturn(_this, _ret);
      }

      _createClass(_class, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
          var _this2 = this;

          // Load from hoc argument
          if (isLoadFunction) {
            load(this.props, this.context);
          }

          if (isPrintPromise) {
            print.then(function (value) {
              _this2.promiseResolved();
              return value;
            }).catch(function (error) {
              _this2.promiseResolved();
              throw error;
            });
          }

          // Load from props
          if (this.omitLoadInProps(this.props)) {
            this.props[loadFunctionName](this.props, this.context);
          }
        }
      }, {
        key: 'render',
        value: function render() {
          if (!isLoaded(this.props, this.state, this.context)) {
            return _react2.default.createElement(LoadingIndicator, this.state.props);
          }
          return _react2.default.createElement(ComposedComponent, this.state.props);
        }
      }]);

      return _class;
    }(_react.Component), _class.displayName = displayName, _temp2;
  };
};
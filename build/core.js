'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint react/prop-types: 0 */


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

var getDisplayName = function getDisplayName(c) {
  return c.displayName || c.name || 'Component';
};

exports.default = function (ComposedComponent) {
  var _class, _temp2;

  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      LoadingIndicator = _ref.LoadingIndicator,
      ErrorIndicator = _ref.ErrorIndicator,
      print = _ref.print,
      load = _ref.load,
      error = _ref.error;

  var loadFunctionName = isString(load) ? load : 'load';

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
        props: {}
      }, _this.isInState = function (prop, propProcessor, substitutionProp, defaultValue) {
        // Print is undefined,
        // we rely on 'props[substitutionProp' if present
        // if not, we directly print the component
        if (prop === undefined) {
          var inState = _this.props[substitutionProp];
          return inState === undefined ? defaultValue : !!inState;
        }

        // prop is an array
        // Implicitly meaning that this is an array of props
        if (Array.isArray(prop)) {
          var boolProps = prop.map(function (p) {
            return Boolean(_this.props[p]);
          });
          return propProcessor(boolProps);
        }

        // Prop is a function
        if (isFunction(prop)) {
          return !!prop(_this.props, _this.context);
        }

        // Anything else
        return !!prop;
      }, _this.isPrinted = function () {
        return _this.isInState(print, function (boolProps) {
          return boolProps.every(function (p) {
            return !!p;
          });
        }, 'loaded', true);
      }, _this.isInError = function () {
        return _this.isInState(error, function (boolProps) {
          return boolProps.includes(true);
        }, 'error', false);
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
        // Load from hoc argument
        if (isFunction(load)) {
          load(this.props, this.context);
        }

        // Load from props
        if (this.omitLoadInProps(this.props)) {
          this.props[loadFunctionName](this.props, this.context);
        }
      }
    }, {
      key: 'render',
      value: function render() {
        if (this.isInError()) {
          return _react2.default.createElement(ErrorIndicator, this.state.props);
        } else if (this.isPrinted()) {
          return _react2.default.createElement(ComposedComponent, this.state.props);
        }

        return _react2.default.createElement(LoadingIndicator, this.state.props);
      }
    }]);

    return _class;
  }(_react.Component), _class.displayName = 'Loader(' + getDisplayName(ComposedComponent) + ')', _temp2;
};
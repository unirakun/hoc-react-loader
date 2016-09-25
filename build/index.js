'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Dots = require('./Dots');

var _Dots2 = _interopRequireDefault(_Dots);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// http://stackoverflow.com/a/7356528
var isFunction = function isFunction(functionToCheck) {
  var getType = {};
  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
};

var getDisplayName = function getDisplayName(c) {
  return c.displayName || c.name || 'Component';
};

exports.default = function (ComposedComponent) {
  var _class, _temp2;

  var _ref = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  var _ref$Loader = _ref.Loader;
  var Loader = _ref$Loader === undefined ? _Dots2.default : _ref$Loader;
  var _ref$wait = _ref.wait;
  var wait = _ref$wait === undefined ? ['loaded'] : _ref$wait;
  var _ref$load = _ref.load;
  var load = _ref$load === undefined ? undefined : _ref$load;

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
      }, _this.isLoaded = function () {
        // Wait is an array
        // Implicitly meaning that this is an array of props
        if (Array.isArray(wait)) {
          return wait.map(function (w) {
            return Boolean(_this.props[w]);
          }).reduce(function (f, s) {
            return f && s;
          });
        }

        // Wait is a function
        if (isFunction(wait)) {
          return wait(_this.props, _this.context);
        }

        // Anything else
        return Boolean(wait);
      }, _this.isLoadAFunction = function () {
        return isFunction(_this.props.load);
      }, _this.omitLoadInProps = function (props) {
        var isLoadAFunction = _this.isLoadAFunction();

        if (isLoadAFunction) {
          _this.setState({
            props: _extends({}, props, {
              load: undefined
            })
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
        // Load from props
        if (this.omitLoadInProps(this.props)) {
          this.props.load();
        }

        // Load from hoc argument
        if (isFunction(load)) {
          load();
        }
      }
    }, {
      key: 'render',
      value: function render() {
        if (!this.isLoaded()) {
          return _react2.default.createElement(Loader, this.state.props);
        }

        return _react2.default.createElement(ComposedComponent, this.state.props);
      }
    }]);

    return _class;
  }(_react.Component), _class.displayName = 'Loader(' + getDisplayName(ComposedComponent) + ')', _class.propTypes = {
    load: _react.PropTypes.func
  }, _temp2;
};
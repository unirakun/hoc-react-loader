'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Dot = require('./Dot');

var _Dot2 = _interopRequireDefault(_Dot);

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MAX_DOTS = 3;
var MAX_OPACITY = 0.6;
var MIN_OPACITY = 0.1;
var TIMEOUT = 1000;

var Dots = function (_Component) {
  _inherits(Dots, _Component);

  function Dots(props, context) {
    _classCallCheck(this, Dots);

    var _this = _possibleConstructorReturn(this, (Dots.__proto__ || Object.getPrototypeOf(Dots)).call(this, props, context));

    _this.computeOpacity = function (index) {
      _this.intervals.push(setInterval(function () {
        var opacities = _this.state.opacities;


        var newOpacities = [].concat(_toConsumableArray(opacities));
        newOpacities[index] = newOpacities[index] === MIN_OPACITY ? MAX_OPACITY : MIN_OPACITY;

        _this.setState({
          opacities: newOpacities
        });
      }, TIMEOUT));
    };

    _this.runDot = function (index) {
      return _this.computeOpacity(index);
    };

    _this.state = {
      opacities: Array.from(Array(MAX_DOTS)).map(function () {
        return MIN_OPACITY;
      })
    };

    _this.intervals = [];
    _this.timeouts = [];
    return _this;
  }

  _createClass(Dots, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var _loop = function _loop(i) {
        _this2.timeouts.push(setTimeout(function () {
          return _this2.runDot(i);
        }, TIMEOUT / MAX_DOTS * i));
      };

      for (var i = 0; i < MAX_DOTS; ++i) {
        _loop(i);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.timeouts[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var timeout = _step.value;

          clearTimeout(timeout);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.intervals[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var interval = _step2.value;

          clearInterval(interval);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var style = _props.style;
      var className = _props.className;
      var opacities = this.state.opacities;


      return _react2.default.createElement(
        'div',
        { style: (0, _style2.default)(style), className: className },
        opacities.map(function (i, index) {
          return _react2.default.createElement(_Dot2.default, { key: index, opacity: opacities[index] });
        })
      );
    }
  }]);

  return Dots;
}(_react.Component);

Dots.propTypes = {
  style: _react.PropTypes.object,
  className: _react.PropTypes.string
};

exports.default = Dots;
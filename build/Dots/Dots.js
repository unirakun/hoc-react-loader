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

var maxDots = 3;
var maxOpacity = 0.6;
var minOpacity = 0.1;
var timeout = 1000;

var Dots = function (_Component) {
  _inherits(Dots, _Component);

  function Dots(props, context) {
    _classCallCheck(this, Dots);

    // FIXME : google help me to initialize this
    var _this = _possibleConstructorReturn(this, (Dots.__proto__ || Object.getPrototypeOf(Dots)).call(this, props, context));

    _initialiseProps.call(_this);

    var opacities = [];
    for (var i = 0; i < maxDots; ++i) {
      opacities.push(minOpacity);
    }_this.state = {
      opacities: opacities
    };

    _this.intervals = [];
    return _this;
  }

  _createClass(Dots, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var _loop = function _loop(i) {
        setTimeout(function () {
          return _this2.runDot(i);
        }, timeout / maxDots * i);
      };

      for (var i = 0; i < maxDots; ++i) {
        _loop(i);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.intervals) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = this.intervals[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var interval = _step.value;

            clearInterval(interval);
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

var _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.computeOpacity = function (index) {
    _this3.intervals.push(setInterval(function () {
      var opacities = _this3.state.opacities;


      var newOpacities = [].concat(_toConsumableArray(opacities));
      newOpacities[index] = newOpacities[index] === minOpacity ? maxOpacity : minOpacity;

      _this3.setState({
        opacities: newOpacities
      });
    }, timeout));
  };

  this.runDot = function (index) {
    return _this3.computeOpacity(index);
  };
};

Dots.propTypes = {
  style: _react.PropTypes.object,
  className: _react.PropTypes.string
};

exports.default = Dots;
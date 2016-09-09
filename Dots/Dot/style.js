'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = function (style, opacity) {
  return _extends({
    backgroundColor: 'rgba(120, 120, 120, ' + opacity + ')',
    borderRadius: '20px',
    width: '20px',
    height: '20px',
    margin: '2px',
    display: 'inline-block',
    transition: 'background-color 800ms'
  }, style);
};
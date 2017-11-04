'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findCorrectColor = exports.initialColor = undefined;

var _tinycolor = require('tinycolor2');

var _tinycolor2 = _interopRequireDefault(_tinycolor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global window */
var getBackgroundColor = function getBackgroundColor(node) {
  return window.getComputedStyle(node, null).getPropertyValue('background-color');
};

var initialColor = exports.initialColor = '#cecece';

var findCorrectColor = exports.findCorrectColor = function findCorrectColor(svg) {
  var parent = svg && svg.parentNode;
  var parentColor = parent ? getBackgroundColor(parent) : undefined;

  while (parent && !parentColor) {
    parent = parent.parentNode;
    if (parent) parentColor = getBackgroundColor(parent);
  }

  if (parentColor) {
    var tinyC = (0, _tinycolor2.default)(parentColor);
    var color = tinyC.isDark() ? tinyC.lighten(20) : tinyC.darken(20);

    return color.toHexString();
  }

  return initialColor;
};
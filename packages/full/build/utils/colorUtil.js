"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findCorrectColor = exports.INITIAL_COLOR = void 0;

var _tinycolor = _interopRequireDefault(require("tinycolor2"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global window */
var getBackgroundColor = function getBackgroundColor(node) {
  return window.getComputedStyle(node, null).getPropertyValue('background-color');
};

var INITIAL_COLOR = '#cecece';
exports.INITIAL_COLOR = INITIAL_COLOR;

var findCorrectColor = function findCorrectColor(svg) {
  var parent = svg && svg.parentNode;
  var parentColor = parent ? getBackgroundColor(parent) : undefined;

  while (parent && !parentColor) {
    parent = parent.parentNode;
    if (parent) parentColor = getBackgroundColor(parent);
  }

  if (parentColor) {
    var tinyC = (0, _tinycolor.default)(parentColor);
    var color = tinyC.isDark() ? tinyC.lighten(20) : tinyC.darken(20);
    return color.toHexString();
  }

  return INITIAL_COLOR;
};

exports.findCorrectColor = findCorrectColor;
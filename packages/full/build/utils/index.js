"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _colorUtil = require("./colorUtil");

Object.keys(_colorUtil).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _colorUtil[key];
    }
  });
});
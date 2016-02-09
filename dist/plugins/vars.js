'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = {
  name: 'vars',
  type: 'namespace',
  placement: 'before',
  dep: [],

  simple: function simple(req, res, next) {
    this.vars = {};
    return next();
  }
};
module.exports = exports['default'];
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = {
  name: 'adoptions:aarcs',
  plugins: {
    vars: 'simple'
  },
  paths: [{
    path: '/find/arf/dogs',
    method: 'get',
    handlers: require('./handlers'),
    docs: require('./docs')
  }]
};
module.exports = exports['default'];
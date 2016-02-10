'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var PuppyCrate = require('./modules/puppyCrate');
var bunyan = require('bunyan');
var Yo = require('./modules/yo');

exports['default'] = {
  modules: [{
    name: 'puppyCrate',
    module: new PuppyCrate()
  }, {
    name: 'log',
    module: bunyan.createLogger({ name: 'saPuppies' })
  }, {
    name: 'yo',
    module: new Yo()
  }],
  plugins: [require('./plugins/vars')],
  routes: [require('./routes/aarcs'), require('./routes/arf')]
};
module.exports = exports['default'];
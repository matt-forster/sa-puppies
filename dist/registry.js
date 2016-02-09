'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _modulesPuppyCrate = require('./modules/puppyCrate');

var _modulesPuppyCrate2 = _interopRequireDefault(_modulesPuppyCrate);

var _bunyan = require('bunyan');

var _bunyan2 = _interopRequireDefault(_bunyan);

var _modulesYo = require('./modules/yo');

var _modulesYo2 = _interopRequireDefault(_modulesYo);

exports['default'] = {
  modules: [{
    name: 'puppyCrate',
    module: new _modulesPuppyCrate2['default']()
  }, {
    name: 'log',
    module: _bunyan2['default'].createLogger({ name: 'saPuppies' })
  }, {
    name: 'yo',
    module: new _modulesYo2['default']()
  }],
  plugins: [require('./plugins/vars')],
  routes: [require('./routes/aarcs')]
};
module.exports = exports['default'];
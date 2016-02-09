'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _autovanceApiCore = require('@autovance/api-core');

var _autovanceApiCore2 = _interopRequireDefault(_autovanceApiCore);

var _registry = require('./registry');

var _registry2 = _interopRequireDefault(_registry);

var spacePuppies = new _autovanceApiCore2['default']({});

spacePuppies.launch(_registry2['default']);
spacePuppies.orbit();
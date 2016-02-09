'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

_dotenv2['default'].load({ silent: true });
var self = process.env.SELF_URL;

(0, _request2['default'])(self + '/find/aarcs/puppies', function (err, reply) {
  console.log(reply.body);
});
/* eslint no-loop-func:0 no-underscore-dangle:0*/
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _when = require('when');

var _when2 = _interopRequireDefault(_when);

var _whenPoll = require('when/poll');

var _whenPoll2 = _interopRequireDefault(_whenPoll);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _bunyan = require('bunyan');

var _bunyan2 = _interopRequireDefault(_bunyan);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var TIMEOUT = 60000;

var Yo = (function () {
  function Yo() {
    _classCallCheck(this, Yo);

    _dotenv2['default'].load({ silent: true });
    this.log = _bunyan2['default'].createLogger({ name: 'puppyYo' });
    this.yo_url = process.env.YO_API;
    this.yo_key = process.env.YO_API_KEY;
  }

  _createClass(Yo, [{
    key: 'all',
    value: function all(links) {
      if (!links.length) return _when2['default'].resolve(false);
      if (_lodash2['default'].isArray(links)) return this._process(links);
      return this._process([links]);
    }
  }, {
    key: '_process',
    value: function _process(links) {
      var _this = this;

      this.log.info('starting yo broadcast of ' + links.length + ' links.');

      var finished = (0, _whenPoll2['default'])(function () {
        var link = links.pop();
        _this.log.info('Sending: ' + link);
        (0, _request2['default'])({
          uri: _this.yo_url + '/yoall/',
          method: 'post',
          json: true,
          body: {
            api_token: _this.yo_key,
            link: link
          }
        }, function (err, reply) {
          _this.log.info('Got code: ' + reply.statusCode);
          return _when2['default'].resolve(reply);
        });
      }, TIMEOUT, function () {
        return !links.length;
      }, false);

      return (0, _when2['default'])(finished).then(function () {
        _this.log.info('broadcast complete');
        _this.sending = false;
        return true;
      });
    }
  }]);

  return Yo;
})();

exports['default'] = Yo;
module.exports = exports['default'];
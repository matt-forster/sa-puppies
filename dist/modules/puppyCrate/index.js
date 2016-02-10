'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _redis = require('redis');

var _redis2 = _interopRequireDefault(_redis);

var _when = require('when');

var _when2 = _interopRequireDefault(_when);

var _bunyan = require('bunyan');

var _bunyan2 = _interopRequireDefault(_bunyan);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var puppyCrate = (function () {
  function puppyCrate() {
    var _this = this;

    _classCallCheck(this, puppyCrate);

    _dotenv2['default'].load({ silent: true });

    var redisClient = undefined;
    if (process.env.NODE_ENV === 'production') {
      redisClient = _redis2['default'].createClient(process.env.REDIS_URL);
    } else {
      redisClient = _redis2['default'].createClient();
    }

    this.redis = redisClient;
    this.log = _bunyan2['default'].createLogger({ name: 'puppyCrate' });

    this.redis.on('error', function (err) {
      return _this.log.error('Error: ' + err);
    });
    this.redis.on('ready', function () {
      return _this.log.info('Connected!');
    });
  }

  //gatherPuppies

  _createClass(puppyCrate, [{
    key: 'gatherPuppies',
    value: function gatherPuppies(key) {
      var _this2 = this;

      if (!key) key = 'puppies';
      var deferred = _when2['default'].defer();

      this.redis.get(key, function (err, reply) {
        if (!reply) deferred.resolve([]);
        _this2.log.info('Sent the puppies to play!');
        deferred.resolve(JSON.parse(reply));
      });

      return deferred.promise;
    }

    // addNew
  }, {
    key: 'addNew',
    value: function addNew(key, puppies) {
      var _this3 = this;

      if (_lodash2['default'].isArray(key)) {
        puppies = key;
        key = 'puppies';
      }
      if (!key) key = 'puppies';
      var deferred = _when2['default'].defer();

      this.redis.set(key, JSON.stringify(puppies), function (err, reply) {
        if (err) deferred.reject(err);
        _this3.log.info('Gathered the puppies and put them in the crate!');
        deferred.resolve(reply);
      });

      return deferred.promise;
    }
  }]);

  return puppyCrate;
})();

exports['default'] = puppyCrate;
module.exports = exports['default'];
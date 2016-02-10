import redis from 'redis';
import when from 'when';
import bunyan from 'bunyan';
import dotenv from 'dotenv';
import _ from 'lodash';

export default class puppyCrate {

  constructor() {
    dotenv.load({silent: true});

    let redisClient;
    if (process.env.NODE_ENV === 'production') {
      redisClient = redis.createClient(process.env.REDIS_URL);
    } else {
      redisClient = redis.createClient();
    }

    this.redis = redisClient;
    this.log = bunyan.createLogger({name: 'puppyCrate'});

    this.redis.on('error', (err) => this.log.error('Error: ' + err));
    this.redis.on('ready', () => this.log.info('Connected!'));
  }

  //gatherPuppies
  gatherPuppies(key) {
    if (!key) key = 'puppies';
    let deferred = when.defer();

    this.redis.get(key, (err, reply) => {
      if (!reply) deferred.resolve([]);
      this.log.info(`Sent the ${key} puppies to play!`);
      deferred.resolve(JSON.parse(reply));
    });

    return deferred.promise;
  }

  // addNew
  addNew(key, puppies) {
    if (_.isArray(key)) {
      puppies = key;
      key = 'puppies';
    }
    if (!key) key = 'puppies';
    let deferred = when.defer();

    this.redis.set(key, JSON.stringify(puppies), (err, reply) => {
      if (err) deferred.reject(err);
      this.log.info(`Gathered the ${key} puppies and put them in the crate!`);
      deferred.resolve(reply);
    });

    return deferred.promise;
  }
}

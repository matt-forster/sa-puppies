import redis from 'redis';
import when from 'when';
import bunyan from 'bunyan';
import dotenv from 'dotenv';


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
    this.redis.on('idle', () => this.log.info('Idle!'));
  }

  //gatherPuppies
  gatherPuppies() {
    let deferred = when.defer();

    this.redis.get('puppies', (err, reply) => {
      if (!reply) deferred.resolve([]);
      this.log.info('Sent the puppies to play!');
      deferred.resolve(JSON.parse(reply));
    });

    return deferred.promise;
  }

  // addNew
  addNew(puppies) {
    let deferred = when.defer();

    this.redis.set('puppies', JSON.stringify(puppies), (err, reply) => {
      if (err) deferred.reject(err);
      this.log.info('Gathered the puppies and put them in the crate!');
      deferred.resolve(reply);
    });

    return deferred.promise;
  }
}

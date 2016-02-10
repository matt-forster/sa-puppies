/* eslint no-loop-func:0 no-underscore-dangle:0*/
import request from 'request';
import when from 'when';
import poll from 'when/poll';
import dotenv from 'dotenv';
import bunyan from 'bunyan';
import _ from 'lodash';

const TIMEOUT = 60000;

export default class Yo {

  constructor() {
    dotenv.load({silent: true});
    this.log = bunyan.createLogger({name: 'puppyYo'});
    this.yo_url = process.env.YO_API;
    this.yo_key = process.env.YO_API_KEY;
  }

  all(links) {
    if (!links.length) return when.resolve(false);
    if (_.isArray(links)) return this._process(links);
    return this._process([links]);
  }

  _process(links) {
    this.log.info('starting yo broadcast of ' + links.length + ' links.');

    var finished = poll(() => {
      let link = links.pop();
      this.log.info('Sending: ' + link);
      request({
        uri: this.yo_url + '/yoall/',
        method: 'post',
        json: true,
        body: {
          api_token: this.yo_key,
          link: link
        }
      }, (err, reply) => {
        this.log.info('Got code: ' + reply.statusCode);
        return when.resolve(reply);
      });
    }, TIMEOUT, () => !links.length, false);

    return when(finished).then(() => {
      this.log.info('broadcast complete');
      this.sending = false;
      return true;
    });
  }


}

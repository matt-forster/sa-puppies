/* eslint no-unused-expressions:0 */

import PuppyCrate from '../../lib/modules/puppyCrate';
import sinon from 'sinon';
import {expect} from 'chai';
import 'sinon-as-promised';
import redis from 'redis';

describe('puppyCrate @module', () => {
  let sandbox;
  let redisStub;
  let crate;

  before(() => {
    sandbox = sinon.sandbox.create();

    redisStub = {
      on: () => false,
      get: (key, cb) => cb(null, '[]'),
      set: (key, value, cb) => cb(null, 'OK')
    };

    sandbox.spy(redisStub, 'get');
    sandbox.spy(redisStub, 'set');
    sandbox.stub(redis, 'createClient').returns(redisStub);
  });

  after(() => {
    sandbox.restore();
  });

  // this test is infinitely useful :dog:
  it('should add redis', () => {
    crate = new PuppyCrate();

    expect(crate.redis).to.equal(redisStub);
  });

  // so is this one
  it('should use the url in prod', () => {
    process.env.NODE_ENV = 'production';
    process.env.REDIS_URL = 'localhost';
    crate = new PuppyCrate();
    crate.log.level(100);
    expect(crate.redis).to.equal(redisStub);
    expect(redis.createClient.calledWith('localhost')).to.be.true;
  });

  it('should gather the puppies', (done) => {
    crate.gatherPuppies().then((reply) => {
      expect(reply).to.be.an('array');
      expect(redisStub.get.calledWith('puppies')).to.be.true;
      done();
    });

  });

  it('should gather specific puppies', (done) => {
    crate.gatherPuppies('aarcs').then((reply) => {
      expect(reply).to.be.an('array');
      expect(redisStub.get.calledWith('aarcs')).to.be.true;
      done();
    });

  });

  it('should set the puppies', (done) => {
    crate.addNew([]).then((reply) => {
      expect(reply).to.equal('OK');
      expect(redisStub.set.calledWith('puppies')).to.be.true;
      done();
    });
  });

  it('should default the key', (done) => {
    crate.addNew().then((reply) => {
      expect(reply).to.equal('OK');
      expect(redisStub.set.calledWith('puppies')).to.be.true;
      done();
    });
  });

  it('should set specific puppies', (done) => {
    crate.addNew('aarcs', []).then((reply) => {
      expect(reply).to.equal('OK');
      expect(redisStub.set.calledWith('aarcs')).to.be.true;
      done();
    });
  });
});

/* eslint no-unused-expressions:0 no-underscore-dangle:0 */

import Yo from '../../lib/modules/yo';
import sinon from 'sinon';
import {expect} from 'chai';
import 'sinon-as-promised';

describe('yo @module', () => {
  let sandbox;
  let yo;
  let requestStub;

  before(() => {
    requestStub = (options, cb) => cb(null, options);

    sandbox = sinon.sandbox.create();
  });

  after(() => {
    sandbox.restore();
  });

  it('should load the keys', (done) => {
    process.env.YO_API = 'http://localhost';
    process.env.YO_API_KEY = 'key';

    yo = new Yo();
    yo.request = requestStub;
    sinon.spy(yo, 'request');
    yo.log.level(100);
    expect(yo.yo_url).to.equal('http://localhost');
    expect(yo.yo_key).to.equal('key');
    done();
  });

  describe('yo, all', () => {
    it('should offer yoall', (done) => {
      yo.all([]).then((reply) => {
        expect(reply).to.be.not.ok;
        done();
      });
    });

    it('should process a link passed', (done) => {
      sandbox.stub(yo, '_process').resolves(true);

      yo.all('link').then((reply) => {
        expect(yo._process.calledWith(['link']));
        expect(reply).to.be.ok;
        sandbox.restore();
        done();
      });
    });

    it('should process links passed', (done) => {
      sandbox.stub(yo, '_process').resolves(true);

      yo.all(['link', 'link']).then((reply) => {
        expect(yo._process.calledWith(['link', 'link']));
        expect(reply).to.be.ok;
        sandbox.restore();
        done();
      });
    });
  });

  describe('_process', () => {

    it('should poll', function (done) {
      yo.TIMEOUT = 10;

      yo._process(['link1', 'link2'])
      .then(() => {
        expect(yo.request.callCount).to.equal(2);
        done();
      });
    });

    it('should reject properly', function (done) {
      yo.request = (options, cb) => cb('fail');

      yo._process(['link1', 'link2'])
      .catch((reply) => {
        expect(reply).to.equal('fail');
        done();
      });
    });
  });
});

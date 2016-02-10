/* eslint no-unused-expressions:0 */
import vars from '../../lib/plugins/vars';
import {expect} from 'chai';

describe('vars @plugin', () => {

  it('adds the vars object', (done) => {
    let req = {};
    let res = {};
    let bound = {};

    let next = () => {
      expect(bound.vars).to.exist;
      done();
    };

    vars.simple = vars.simple.bind(bound);
    vars.simple(req, res, next);
  });


});

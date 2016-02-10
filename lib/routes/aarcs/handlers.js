import request from 'request';
import _ from 'lodash';

export default [

  function findPuppyList(req, res, next) {

    // retrieve the cuteness
    request('http://aarcs.ca/adoptable-dogs/',
      (err, response, body) => {
        if (err) {
          res.send(400, err);
          res.end();
        }

        this.vars.puppies = body.match(/(http:\/\/aarcs.ca\/portfolio-item\/a(?:\d*)\/)/ig);
        return next();
      }
    );
  },

  function findNewPuppies(req, res, next) {

    // store the cuteness
    let getKnownPups = this.modules.puppyCrate.gatherPuppies('aarcs');

    let savePups = getKnownPups.then((knownPups) => {

      this.vars.newPuppies = _.compact(this.vars.puppies.map(puppy => {
        if (!_.includes(knownPups, puppy)) {
          this.modules.log.info('Found new pup! ' + puppy);
          return puppy;
        }
      }));

      return this.modules.puppyCrate.addNew('aarcs', this.vars.puppies);
    });

    savePups.then(() => {
      res.send(this.vars.newPuppies);
      res.end();
      return next();
    });
  },

  function yoNewPuppies(req, res, next) {
    // beam the cuteness
    // this.modules.yo.all(this.vars.newPuppies).then(() => next());
    return next();
  }
];

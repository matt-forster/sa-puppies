import request from 'request';
import _ from 'lodash';

export default [

  function findPuppyList(req, res, next) {

    // retrieve the cuteness
    request('http://arf.ab.ca/animals/dogs/',
      (err, response, body) => {
        if (err) {
          res.send(400, err);
          res.end();
        }

        this.vars.puppies = body.match(/(http:\/\/arf.ab.ca\/animal\/(?:\d*)[a-z]?(-(?:[a-z]*))*\/)/ig);

        let temp = [];
        for (let i in this.vars.puppies) {
          let puppy = this.vars.puppies[i];
          if (!_.includes(temp, puppy)) temp.push(puppy);
        }

        this.vars.puppies = temp;
        return next();
      }
    );
  },

  function findNewPuppies(req, res, next) {

    // store the cuteness
    let getKnownPups = this.modules.puppyCrate.gatherPuppies('arf');

    let savePups = getKnownPups.then((knownPups) => {

      this.vars.newPuppies = _.compact(this.vars.puppies.map(puppy => {
        if (!_.includes(knownPups, puppy)) {
          this.modules.log.info('Found new pup! ' + puppy);
          return puppy;
        }
      }));

      return this.modules.puppyCrate.addNew('arf', this.vars.puppies);
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

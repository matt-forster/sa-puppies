'use strict';

var request = require('request');
var dotenv = require('dotenv');

dotenv.load({ silent: true });
var self = process.env.SELF_URL;

request(self + '/find/aarcs/puppies', function (err, reply) {
  console.log(reply.body);
});

request(self + '/find/arf/dogs', function (err, reply) {
  console.log(reply.body);
});
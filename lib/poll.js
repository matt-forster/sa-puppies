import request from 'request';
import dotenv from 'dotenv';

dotenv.load({silent: true});
let self = process.env.SELF_URL;

request(self + '/find/aarcs/puppies', (err, reply) => {
  console.log(reply.body);
});

request(self + '/find/arf/dogs', (err, reply) => {
  console.log(reply.body);
});

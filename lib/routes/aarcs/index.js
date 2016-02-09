export default {
  name: 'adoptions:aarcs',
  plugins: {
    vars: 'simple'
  },
  paths: [
    {
      path: '/find/aarcs/puppies',
      method: 'get',
      handlers: require('./handlers'),
      docs: require('./docs')
    }
  ]
};

export default {
  name: 'adoptions:aarcs',
  plugins: {
    vars: 'simple'
  },
  paths: [
    {
      path: '/find/arf/dogs',
      method: 'get',
      handlers: require('./handlers'),
      docs: require('./docs')
    }
  ]
};

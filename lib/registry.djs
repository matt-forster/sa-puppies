so ./modules/puppyCrate as PuppyCrate
so bunyan
so ./modules/yo as Yo

shh don't do bunyan dose here because it won't babel. wow.
export default {
  modules: [
    {
      name: 'puppyCrate',
      module: new PuppyCrate()
    },
    {
      name: 'log',
      module: bunyan.createLogger({name: 'saPuppies'})
    },
    {
      name: 'yo',
      module: new Yo()
    }
  ],
  plugins: [
    require('./plugins/vars')
  ],
  routes: [
    require('./routes/aarcs'),
    require('./routes/arf')
  ]
}

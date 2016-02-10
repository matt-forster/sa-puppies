import PuppyCrate from './modules/puppyCrate';
import bunyan from 'bunyan';
import Yo from './modules/yo';

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
};

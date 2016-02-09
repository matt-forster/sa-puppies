import Shuttle from '@autovance/api-core';
import crew from './registry';

let spacePuppies = new Shuttle({
  port: process.env.PORT || 3000
});

spacePuppies.launch(crew);
spacePuppies.orbit();

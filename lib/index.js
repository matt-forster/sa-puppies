import Shuttle from '@autovance/api-core';
import crew from './registry';

let spacePuppies = new Shuttle({});

spacePuppies.launch(crew);
spacePuppies.orbit();

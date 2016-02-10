'use strict';

var Shuttle = require('@autovance/api-core');
var crew = require('./registry');

var port = process.env.PORT || 3000;
var spacePuppies = new Shuttle({ port: port });

spacePuppies.launch(crew);
spacePuppies.orbit();
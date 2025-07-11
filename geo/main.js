'use strict';

const createRouter = require('@arangodb/foxx/router');
const fs = require('fs');
const path = require('path');

const router = createRouter();

// ROTAS BACKEND
require('./routes/near')(router);
require('./routes/within')(router);
require('./routes/contains')(router);
require('./routes/distance')(router);
require('./routes/buffer')(router);
require('./routes/join')(router);
require('./routes/simplify')(router);

// ROTA UI - SERVE O HTML ESTÁTICO DO LEAFLET
router.get('/ui', function (req, res) {
  res.send('FUNCIONOU!');
});


// ATIVA AS ROTAS
module.context.use('/', router);

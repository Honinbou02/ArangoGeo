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
  try {
    const filePath = path.resolve(module.context.basePath, 'ui', 'index.html');
    const content = fs.readFileSync(filePath, 'utf-8');
    res.set('Content-Type', 'text/html; charset=utf-8');
    res.send(content);
  } catch (err) {
    res.throw('not found', 'UI not found');
  }
});

// ATIVA AS ROTAS
module.context.use('/', router);

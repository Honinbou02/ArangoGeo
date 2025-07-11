'use strict';
const createRouter = require('@arangodb/foxx/router');
const router = createRouter();
module.context.use(router);

// Load routes

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

const fs = require('fs');

router.get('/ui', function (req, res) {
  res.set('Content-Type', 'text/html; charset=utf-8');
  res.body = fs.readFileSync(module.context.fileName('ui/index.html'), 'utf8');
});

router.get('/ui/*', function (req, res) {
  const file = req.suffix.join('/');
  try {
    res.sendFile(module.context.fileName('ui/' + file));
  } catch (e) {
    res.throw('not found', 'file not found');
  }
});
// ROTA UI - SERVE O HTML ESTÁTICO DO LEAFLET
router.get('/ui', function (req, res) {
  res.send('FUNCIONOU!');
});


// ATIVA AS ROTAS
module.context.use('/', router);
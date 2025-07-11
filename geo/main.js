'use strict';
const createRouter = require('@arangodb/foxx/router');
const router = createRouter();

const fs = require('fs');

require('./routes/near')(router);
require('./routes/within')(router);
require('./routes/contains')(router);
require('./routes/distance')(router);
require('./routes/buffer')(router);
require('./routes/join')(router);
require('./routes/simplify')(router);

router.get('/ui', function (req, res) {
  res.set('Content-Type', 'text/html; charset=utf-8');
  res.body = fs.readFileSync(module.context.fileName('ui/index.html'), 'utf8');
});

// CORRIGIDO AQUI:
module.context.use('/', router);

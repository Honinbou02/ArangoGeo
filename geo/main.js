'use strict';
const createRouter = require('@arangodb/foxx/router');
const router = createRouter();
module.context.use(router);

// Load routes
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

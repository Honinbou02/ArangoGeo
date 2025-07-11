'use strict';
const db = require('@arangodb').db;
const aql = require('@arangodb').aql;
module.exports = function (router) {
  router.post('/join', function (req, res) {
    const {collection1, collection2} = req.body;
    if (!collection1 || !collection2) {
      res.throw('bad request', 'collection1 and collection2 required');
    }
    const results = db._query(aql`
      FOR a IN ${db._collection(collection1)}
        FOR b IN ${db._collection(collection2)}
          FILTER GEO_INTERSECTS(a.location, b.location)
          RETURN {a, b}
    `).toArray();
    res.send(results);
  }).body(['application/json']);
};

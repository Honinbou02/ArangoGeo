'use strict';
const db = require('@arangodb').db;
const aql = require('@arangodb').aql;
module.exports = function (router) {
  router.post('/within', function (req, res) {
    const polygon = req.body.polygon;
    const collection = req.body.collection;
    if (!polygon || !collection) {
      res.throw('bad request', 'polygon and collection required');
    }
    const docs = db._query(aql`
      FOR doc IN ${db._collection(collection)}
        FILTER GEO_CONTAINS(@poly, doc.location)
        RETURN doc
    `, {poly: polygon}).toArray();
    res.send(docs);
  })
  .body(['application/json']);
};

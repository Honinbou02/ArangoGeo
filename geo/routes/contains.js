'use strict';
const aql = require('@arangodb').aql;
const db = require('@arangodb').db;
module.exports = function (router) {
  router.post('/contains', function (req, res) {
    const {point, polygon} = req.body;
    if (!point || !polygon) {
      res.throw('bad request', 'point and polygon required');
    }
    const result = db._query(aql`RETURN GEO_CONTAINS(@poly, @pt)`, {poly: polygon, pt: point}).toArray()[0];
    res.send({contains: !!result});
  }).body(['application/json']);
};

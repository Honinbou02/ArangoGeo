'use strict';
const aql = require('@arangodb').aql;
const db = require('@arangodb').db;
module.exports = function (router) {
  router.post('/distance', function (req, res) {
    const {point1, point2} = req.body;
    if (!point1 || !point2) {
      res.throw('bad request', 'point1 and point2 required');
    }
    const d = db._query(aql`RETURN DISTANCE(@lat1, @lon1, @lat2, @lon2)`, {
      lat1: point1.coordinates[1],
      lon1: point1.coordinates[0],
      lat2: point2.coordinates[1],
      lon2: point2.coordinates[0]
    }).toArray()[0];
    res.send({distance: d});
  }).body(['application/json']);
};

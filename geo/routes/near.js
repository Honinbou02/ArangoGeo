'use strict';
const db = require('@arangodb').db;
const aql = require('@arangodb').aql;
module.exports = function (router) {
  router.get('/near', function (req, res) {
    const lat = parseFloat(req.queryParams.lat);
    const lon = parseFloat(req.queryParams.lon);
    const radius = parseFloat(req.queryParams.radius || '1000');
    const collection = req.queryParams.collection;
    if (!collection) {
      res.throw('bad request', 'collection is required');
    }
    const docs = db._query(aql`
      FOR doc IN ${db._collection(collection)}
        FILTER DISTANCE(${lat}, ${lon}, doc.location.coordinates[1], doc.location.coordinates[0]) <= ${radius}
        RETURN doc
    `).toArray();
    res.send(docs);
  })
  .queryParam('lat')
  .queryParam('lon')
  .queryParam('radius')
  .queryParam('collection');
};

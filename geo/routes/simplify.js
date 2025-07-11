'use strict';
const turf = require('../lib/turf.min');
module.exports = function (router) {
  router.post('/simplify', function (req, res) {
    const {polygon, tolerance} = req.body;
    if (!polygon || tolerance === undefined) {
      res.throw('bad request', 'polygon and tolerance required');
    }
    const simplified = turf.simplify(polygon, {tolerance: parseFloat(tolerance), highQuality: false});
    res.send({polygon: simplified});
  }).body(['application/json']);
};

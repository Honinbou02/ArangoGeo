'use strict';
const turf = require('../lib/turf.min');
module.exports = function (router) {
  router.post('/buffer', function (req, res) {
    const {point, radius} = req.body;
    if (!point || !radius) {
      res.throw('bad request', 'point and radius required');
    }
    const buffered = turf.buffer(point, radius, {units: 'meters'});
    res.send({buffer: buffered});
  }).body(['application/json']);
};

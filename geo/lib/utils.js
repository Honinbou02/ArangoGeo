'use strict';
const db = require('@arangodb').db;

module.exports.queryCollection = (collectionName, query) => {
  const coll = db._collection(collectionName);
  if (!coll) throw new Error('collection not found');
  return db._query(query).toArray();
};

module.exports.getCollection = (name) => {
  const coll = db._collection(name);
  if (!coll) throw new Error('collection not found');
  return coll;
};

require("dotenv").config();
const faunadb = require("faunadb");
const q = faunadb.query;
const client = new faunadb.Client({ secret: process.env.FAUNADB_SECRET });

module.exports = function(data, collection) {
  return new Promise(async function(resolve, reject) {
    try {
      const response = await client.query(
        q.Create(q.Collection(collection), { data })
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

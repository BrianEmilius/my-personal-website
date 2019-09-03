const faunadb = require("faunadb");

exports.handler = function(event, context, callback) {
  console.log(JSON.parse(event.body));
  callback(null, {
    statusCode: 200,
    body: "analytics, yo"
  });
};

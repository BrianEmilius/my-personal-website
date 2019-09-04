require("dotenv").config();
const faunadb = require("faunadb");
const q = faunadb.query;
const client = new faunadb.Client({ secret: process.env.FAUNADB_SECRET });
const uid = require("uid");

exports.handler = function(event, context, callback) {
  if (event.httpMethod !== "POST" || !event.body) {
    return callback(null, {
      statusCode: 405,
      headers: {
        allow: "POST"
      },
      body: ""
    });
  }

  const payload = JSON.parse(event.body);
  const log = JSON.parse(payload.log);
  const session = {};

  session.createdAt = new Date().toString();
  session.sessionId = log.startedAt + uid(4);
  session.startedAt = log.startedAt;
  session.timezone = log.timezone;
  session.agent = log.agent;
  session.language = log.language;
  session.ref = log.ref;
  session.latency = log.latency;
  session.pageLoad = log.pageLoad;

  const events = log.events;
  events.push(payload.lastEvent);

  client
    .query(
      q.Create(q.Collection("Session"), {
        data: session
      })
    )
    .then(response => console.log("Session created:", response));

  events.forEach((event, index) => {
    let length = 0;
    if (events[index + 1]) {
      length = events[index + 1].timestamp - event.timestamp;
    }

    client
      .query(
        q.Create(q.Collection("Event"), {
          data: {
            sessionId: session.sessionId,
            timestamp: event.timestamp,
            label: event.label,
            event: event.event,
            length
          }
        })
      )
      .then(response => console.log("Event created:", response));
  });

  callback(null, {
    statusCode: 202,
    body: ""
  });
};

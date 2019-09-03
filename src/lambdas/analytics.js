const faunadb = require("faunadb");
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
  const session = {};

  session.createdAt = new Date();
  session.sessionId = payload.startedAt + uid(4);
  session.startedAt = payload.startedAt;
  session.timezone = payload.timezone;
  session.agent = payload.agent;
  session.language = payload.language;
  session.ref = payload.ref;
  session.latency = payload.latency;
  session.pageLoad = payload.pageLoad;

  payload.events.forEach((event, index) => {
    let length = 0;
    if (payload.events[index + 1]) {
      length = payload.events[index + 1].timestamp - event.timestamp;
    }
    console.log({
      sessionId: session.sessionId,
      timestamp: event.timestamp,
      label: event.label,
      event: event.event,
      length
    });
  });

  console.log(session);
  callback(null, {
    statusCode: 202,
    body: ""
  });
};

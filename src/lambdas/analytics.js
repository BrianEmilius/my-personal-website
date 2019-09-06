const digestSession = require("../scripts/digestSession");
const digestEvents = require("../scripts/digestEvents");
const saveData = require("../scripts/saveData");

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

  try {
    saveData(digestSession(log), "Session").then(function(session) {
      console.log("Session created:", session);

      const events = digestEvents(
        log.events,
        payload.lastEvent,
        session.data.sessionId
      );
      return events.forEach(function(event) {
        saveData(event, "Event").then(function(result, i) {
          console.log("Event created:", result);

          if (events.length - 1 === i) {
            return callback(null, {
              statusCode: 202,
              body: ""
            });
          }
        });
      });
    });
  } catch (error) {
    return callback(error);
  }
};

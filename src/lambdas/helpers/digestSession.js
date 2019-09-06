const uid = require("uid");

module.exports = function(session) {
  const digest = {};

  digest.createdAt = new Date().toString();
  digest.sessionId = session.startedAt + uid(4);
  digest.startedAt = session.startedAt;
  digest.timezone = session.timezone;
  digest.agent = session.agent;
  digest.language = session.language;
  digest.ref = session.ref;
  digest.latency = session.latency;
  digest.pageLoad = session.pageLoad;

  return digest;
};

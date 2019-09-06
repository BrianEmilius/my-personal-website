module.exports = function(events, lastEvent, sessionId) {
  const digest = events;
  digest.push(lastEvent);
  return digest.map(function(event, index) {
    event.sessionId = sessionId;
    if (digest[index + 1]) {
      event.length = digest[index + 1].timestamp - event.timestamp;
    } else {
      event.length = 0;
    }
    return event;
  });
};

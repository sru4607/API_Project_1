// For Get Requests
const sendJSON = (request, response, status, content) => {
  const messageToSend = JSON.stringify(content);
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(messageToSend);
  response.end();
};
// For Head Requests
const sendJSONMeta = (request, response, status) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.end();
};

module.exports = {
  sendJSON,
  sendJSONMeta,
};

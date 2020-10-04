const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const deckHandler = require('./deckSavingResponses.js');
const cardHandler = require('./cardSearchResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;
// The functions relating to the different url paths
const urlStruct = {
  GET: {
    '/': htmlHandler.getIndex,
    '/style.css': htmlHandler.getCSS,
    '/getCard': cardHandler.getCard,
    '/getDeck': deckHandler.getDeck,
    notFound: deckHandler.notFound,
  },
  HEAD: {
    '/getCard': cardHandler.getCardMeta,
    '/getDeck': deckHandler.getDeckMeta,
    notFound: deckHandler.notFoundMeta,
  },
};
// Handles all post requests
const handlePost = (request, response, parsedURL) => {
  const body = [];
  if (parsedURL.pathname === '/saveDeck') {
    // Error with data recieving
    request.on('error', (err) => {
      console.dir(err);
      response.statusCode = 400;
      response.end();
    });
    // Data recieved
    request.on('data', (chunk) => {
      body.push(chunk);
    });
    // All data recieved
    request.on('end', () => {
      const bodyString = Buffer.concat(body).toString();
      const bodyParams = query.parse(bodyString);
      deckHandler.saveDeck(request, response, bodyParams);
    });
  }
};
// On request parse the url and the accepted types and if the url exists
// in URL struct use that function otherwise use the notfound function
const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);

  console.dir(parsedUrl.pathname);
  console.dir(request.method);

  if (request.method === 'POST') {
    return handlePost(request, response, parsedUrl);
  } if (urlStruct[request.method][parsedUrl.pathname]) {
    const params = query.parse(parsedUrl.query);
    return urlStruct[request.method][parsedUrl.pathname](request, response, params);
  }
  return urlStruct[request.method].notFound(request, response);
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);

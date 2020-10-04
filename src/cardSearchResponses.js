const https = require('https');
const baseResponse = require('./baseResponseFunctions.js');

// Get card requests
const getCard = (request, response, params) => {
  // Get search parameter
  const searchString = params.q;
  // create url
  const url = `https://api.scryfall.com/cards/search?q=${searchString}`;
  // Create response callback
  const responseRecieved = (res) => {
    let data = '';
    // Add data
    res.on('data', (d) => {
      data += d;
    });
    // Use completed data and return it
    res.on('end', () => {
      const returnedItems = JSON.parse(data);

      let toSend = {};
      // If there was any data returned
      if (returnedItems.data) {
        const test = returnedItems.data[0];
        toSend.card = test;
        return baseResponse.sendJSON(request, response, 200, toSend);
      }
      // if No data was returned
      toSend = {
        message: 'No card found',
        id: 'emptySearchResults',
      };
      return baseResponse.sendJSON(request, response, 404, toSend);
    });
  };
  // Start request
  https.get(url, responseRecieved).end();
};
// Head request for get card
const getCardMeta = (request, response) => baseResponse.sendJSONMeta(request, response, 200);

module.exports = {
  getCard,
  getCardMeta,
};
